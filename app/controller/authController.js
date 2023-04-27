const patientsDatamapper = require('../model/patients');
const therapistsDatamapper = require('../model/therapists')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const APIError = require("../service/error/APIError");

const authController = {

  async registerTherapist(req, res, next) {

    // récupérer les données du body
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
       * Vérifier que les deux mots de passe sont identiques
       */
      if (password !== confirmPassword) {
        return res.status(400).json({
          error: "Les mots de passe ne sont pas identiques"
        });
      }
      /**
       * Vérifier que le numéro adeli est composé de 9 chiffres
       */
      if (adelinumber.length !== 9) {
        return res.status(400).json({
          error: "Le numéro adeli doit être composé de 9 chiffres"
        });
      }
      /**
       * Vérifier que le genre est bien renseigné
       */
      if (!gender) {
        return res.status(400).json({
          error: "Merci de renseigner votre sexe"
        });
      }
      /**
       * Vérifier que le numéro de téléphone est composé de 10 chiffres
       */
      if (phonenumber.length !== 10) {
        return res.status(400).json({
          error: "Le numéro de téléphone doit être composé de 10 chiffres"
        });
      }
      /**
       * Vérifier que tous les champs sont remplis
       */
      if (!email || !lastname || !firstname || !phonenumber || !adelinumber || !streetname || !zipcode || !city || !gender || !confirmPassword || !password) {
        return res.status(400).json({
          error: "Veuillez renseigner tous les champs"
        });
      }

      /**
       * Vérifier si l'user existe avec l'adresse mail
       */
      const existingUserWithSameEmail = await therapistsDatamapper.findByEmail(email);
      if (existingUserWithSameEmail) {
        return res.status(400).json({
          error: "Cet email est déjà utilisé"
        });
      }
      /**
       * Vérifier si l'user existe avec le numero de téléphone
       */
      const existingUserWithSamePhoneNumber = await therapistsDatamapper.findByPhonenumber(phonenumber);
      if (existingUserWithSamePhoneNumber) {
        return res.status(400).json({
          error: "Cet numero de téléphone est déjà utilisé"
        });
      }

       /**
       * Vérifier si l'user existe avec le numero adeli
       */
       const existingUserWithSameAdeliNumber = await therapistsDatamapper.findByAdelinumber(adelinumber);
       if (existingUserWithSameAdeliNumber) {
         return res.status(400).json({
           error: "Cet numero adeli est déjà utilisé"
         });
       }

      /**
       * Crypter le mot de passe
       */
      const passwordCrypted = await bcrypt.hash(password, 10);

      /**
       * ajouter le therapist en bdd
       */
      const therapistInfo = {
        email,
        lastname,
        firstname,
        password: passwordCrypted,
        phonenumber,
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
  async registerPatient(req, res, next) {

    /**
     * récupérer les données du body
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
       * Vérifier que les deux mots de passe sont identiques
       */
      if (password !== confirmPassword) {
        return res.status(400).json({
          error: "Les mots de passe ne sont pas identiques"
        });
      }

      /**
       * Vérifier que le numéro de téléphone est composé de 10 chiffres
       */
      if (phonenumber.length !== 10) {
        return res.status(400).json({
          error: "Le numéro de téléphone doit être composé de 10 chiffres"
        });
      }
      /**
       * Vérifier que tous les champs sont remplis
       */
      if (!email || !lastname || !firstname || !phonenumber || !streetname || !zipcode || !city || !confirmPassword || !password) {
        return res.status(400).json({
          error: "Veuillez renseigner tous les champs"
        });
      }

      /**
       * Vérifier si l'user existe avec l'adresse mail
       */
      const existingUserWithSameEmail = await patientsDatamapper.findByEmail(email);
      if (existingUserWithSameEmail) {
        return res.status(400).json({
          error: "Cet email est déjà utilisé"
        });
      }

      /**
       * Vérifier que les deux mots de passe sont identiques
       */
      if (password !== confirmPassword) {
        return res.status(400).json({
          error: "Les mots de passe ne sont pas identiques"
        });
      }

      /**
       * Crypter le mot de passe
       */
      const passwordCrypted = await bcrypt.hash(password, 10);
      /**
       * ajouter le patient en bdd
       */
      const patientInfo = {
        email,
        lastname,
        firstname,
        password: passwordCrypted,
        phonenumber,
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

      const token = jwt.sign({
        data: user,
      }, 'therapist-secret', {
        expiresIn: '7h'
      });
      console.log(token)
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