const patientsDatamapper = require('../model/patients');
const therapistsDatamapper = require('../model/therapists')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
  async registerTherapist(req, res) {

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
    


    // vérifier que les deux mdps sont similaires
    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "Les mots de passe ne sont pas identiques"
      });
    }
    // crypter le mdp
    const passwordCrypted = await bcrypt.hash(password, 10);

    // ajouter le therapist en bdd
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
  },
  async registerPatient(req, res) {
    // TODO register comme therapist
    // récupérer les données du body
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

     // vérifier que les deux mdps sont similaires
     if (password !== confirmPassword) {
        return res.status(400).json({
          error: "Les mots de passe ne sont pas identiques"
        });
      }
    // crypter le mdp
    const passwordCrypted = await bcrypt.hash(password, 10);
    // ajouter le patient en bdd
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
  },
  async login(req, res) {
    const {
      email,
      password
    } = req.body;
    console.log(req.body)

    let user = await therapistsDatamapper.findByEmail(email);
   
    // Si on a pas trouvé de therapiste, on regarde dans les users
    if(!user) {
      user = await patientsDatamapper.findByEmail(email);
    }

    if(!user) {
      return res.status(400).json({error: "L'email ou le mot de passe n'est pas correct."})
    }

    const passwordIsOk = await bcrypt.compare(password, user.password);

    if(!passwordIsOk) {
      return res.status(400).json({error: "L'email ou le mot de passe n'est pas correct."});
    }

    delete user.password;

    const token = jwt.sign({
      data: user,
    }, 'therapist-secret', { expiresIn: '7h'});
    console.log(token)
    try {
      jwt.verify(token, 'therapist-secret')
    } catch(e) {
      return res.status(400).json({error: "L'authentification a échoué"})
    }

    return res.status(200).json({token});
  }
}


module.exports = authController;