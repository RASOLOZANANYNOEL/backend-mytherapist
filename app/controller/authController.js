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
        gender
      } = req.body;
    


    // vérifier que les deux mdps sont similaires
    if (password !== confirmPassword) {
      res.status(400).json({
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
      gender
    }
    const createTherapist = await therapistsDatamapper.create(therapistInfo);
    res.status(201).json(createTherapist)
  },
  async registerPatient(req, res) {
    // TODO register comme therapist
    
  },
  async login(req, res) {
    const {
      email,
      password
    } = req.body;

    let user = await therapistsDatamapper.findByEmail(email);

    // TODO
    // Si pas de therapist trouvé, chercher dans la table patients
    if(!user) {
      user = await patientsDatamapper.findByEmail(email);
    }

    if(!user) {
      res.status(400).json({error: "L'email ou le mot de passe n'est pas correct."})
    }

    const passwordIsOk = await bcrypt.compare(password, user.password);

    if(!passwordIsOk) {
      res.status(400).json({error: "L'email ou le mot de passe n'est pas correct."});
    }

    delete user.password;

    const token = jwt.sign({
      data: user,
    }, 'therapist-secret', { expiresIn: '7h'});

    try {
      jwt.verify(token, 'therapist-secret')
    } catch(e) {
      res.status(400).json({error: "L'authentification a échoué"})
    }

    res.status(200).json({token});
  }
}


module.exports = authController;