const patientsDatamapper = require('../model/patients');
const therapistsDatamapper = require('../model/therapists')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const APIError = require("../service/error/APIError");

const authController = {

  /**
   * registration of a therapist
   */
  async registerTherapist(req, res, next) {

    // retrieve body data
    const {
      email,
      lastname,
      firstname,
      password,
      confirmPassword,
      phonenumber,
      adelinumber,
      streetname,
      zipcode,
      city,
      gender,
    } = req.body;

    try {

      /**
       * Check that the two passwords are identical
       */
      if (password !== confirmPassword) {
        return res.status(400).json({
          error: "Les mots de passe ne sont pas identiques"
        });
      }
      /**
       * Make sure the adelinumber number is 9 digits
       */
      if (adelinumber.length !== 9) {
        return res.status(400).json({
          error: "Le numéro adeli doit être composé de 9 chiffres"
        });
      }
      /**
       * Check that the gender is well informed
       */
      if (!gender) {
        return res.status(400).json({
          error: "Merci de renseigner votre sexe"
        });
      }
      /**
       * Make sure the phone number is 10 digits
       */
      if (phonenumber.length !== 10) {
        return res.status(400).json({
          error: "Le numéro de téléphone doit être composé de 10 chiffres"
        });
      }
      /**
       * Check that all fields are filled in
       */
      if (!email || !lastname || !firstname || !phonenumber || !adelinumber || !streetname || !zipcode || !city || !gender || !confirmPassword || !password) {
        return res.status(400).json({
          error: "Veuillez renseigner tous les champs"
        });
      }

      /**
       * Check if the user exists with the email address
       */
      const existingUserWithSameEmail = await therapistsDatamapper.findByEmail(email);
      if (existingUserWithSameEmail) {
        return res.status(400).json({
          error: "Cet email est déjà utilisé"
        });
      }
      /**
       * Check if the user exists with the phone number
       */
      const existingUserWithSamePhoneNumber = await therapistsDatamapper.findByPhonenumber(phonenumber);
      if (existingUserWithSamePhoneNumber) {
        return res.status(400).json({
          error: "Cet numero de téléphone est déjà utilisé"
        });
      }

       /**
       * Check if the user exists with the adelinumber
       */
       const existingUserWithSameAdeliNumber = await therapistsDatamapper.findByAdelinumber(adelinumber);
       if (existingUserWithSameAdeliNumber) {
         return res.status(400).json({
           error: "Cet numero adeli est déjà utilisé"
         });
       }

      /**
       * Encrypt password
       */
      const passwordCrypted = await bcrypt.hash(password, 10);

      /**
       * add therapist in database
       */
      const therapistInfo = {
        email,
        lastname,
        firstname,
        password: passwordCrypted,
        phonenumber,
        profilpicture: 'public/images/profil-default.png', 
        adelinumber,
        streetname,
        zipcode,
        city,
        gender,
        role: 'therapist'
      }
      const createTherapist = await therapistsDatamapper.create(therapistInfo);
      return res.status(201).json(createTherapist)
    } catch (err) {
      next(new APIError("Erreur lors de la création d'un therapists", 500))
      console.error(err)
    }
  },

  /**
   * patient registration
   */
  async registerPatient(req, res, next) {

    /**
     * retrieve body data
     */
    const {
      email,
      lastname,
      firstname,
      password,
      confirmPassword,
      phonenumber,
      streetname,
      zipcode,
      city,
      quizz_id,
    } = req.body;

    try {

      /**
       * Check that the two passwords are identical
       */
      if (password !== confirmPassword) {
        return res.status(400).json({
          error: "Les mots de passe ne sont pas identiques"
        });
      }

      /**
       * Make sure the phone number is 10 digits
       */
      if (phonenumber.length !== 10) {
        return res.status(400).json({
          error: "Le numéro de téléphone doit être composé de 10 chiffres"
        });
      }
      /**
       * Check that all fields are filled in
       */
      if (!email || !lastname || !firstname || !phonenumber || !streetname || !zipcode || !city || !confirmPassword || !password) {
        return res.status(400).json({
          error: "Veuillez renseigner tous les champs"
        });
      }

      /**
       * Check if the user exists with the email address
       */
      const existingUserWithSameEmail = await patientsDatamapper.findByEmail(email);
      if (existingUserWithSameEmail) {
        return res.status(400).json({
          error: "Cet email est déjà utilisé"
        });
      }

      /**
       * Check that the two passwords are identical
       */
      if (password !== confirmPassword) {
        return res.status(400).json({
          error: "Les mots de passe ne sont pas identiques"
        });
      }

      /**
       * Encrypt password
       */
      const passwordCrypted = await bcrypt.hash(password, 10);
      /**
       * add the patient in db
       */
      const patientInfo = {
        email,
        lastname,
        firstname,
        password: passwordCrypted,
        phonenumber,
        profilpicture: 'public/images/profil-default.png', 
        streetname,
        zipcode,
        city,
        quizz_id,
        role: 'patient'
      }
      const createPatient = await patientsDatamapper.create(patientInfo);
      return res.status(201).json(createPatient)
    } catch(err) {
      next(new APIError("Erreur lors de la création d'un patients", 500, err))
    }
  },

  /**
   * Method for connection
   */
  async login(req, res) {
    const {
      email,
      password
    } = req.body;

    try {
      let user = await therapistsDatamapper.findByEmail(email);

      // Si on a pas trouvé de therapiste, on regarde dans les users
      if (!user) {
        user = await patientsDatamapper.findByEmail(email);
      }

      if (!user) {
        return res.status(400).json({
          error: "L'email ou le mot de passe n'est pas correct."
        })
      }

      const passwordIsOk = await bcrypt.compare(password, user.password);

      if (!passwordIsOk) {
        return res.status(400).json({
          error: "L'email ou le mot de passe n'est pas correct."
        });
      }

      delete user.password;
      // Generate a JWT token using user information and a secret key
      const token = jwt.sign({
        data: user,
      }, 'therapist-secret', {
        expiresIn: '7h'
      });
      console.log(token)
      // verify that the token is valid using the same secret key used to sign it. If the check fails, an error message is returned in response.
      try {
        jwt.verify(token, 'therapist-secret')
      } catch (e) {
        return res.status(400).json({
          error: "L'authentification a échoué"
        })
      }

      return res.status(200).json({
        token
      });
    } catch {
      return res.status(400).json({
        error: "Erreur lors de la connection"
      })
    }
  }
}


module.exports = authController;