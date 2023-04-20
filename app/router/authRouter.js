const express = require("express");
const authController = require("../controller/authController");
const router = express.Router();

router.post('/register-therapist', authController.registerTherapist);
router.post('/register-patient', authController.registerPatient);
router.post('/login', authController.login);

module.exports = router;