const express = require("express");
const algorithmController = require("../controller/algorithmController");
const router = express.Router();

// Route de l'algo -> donne tout les information des psy dans une spécialité.
router.get('/patient/:id',algorithmController.getTherapistBySurvey);

module.exports = router;