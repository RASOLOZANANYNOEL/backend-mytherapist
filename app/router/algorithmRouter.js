const express = require("express");
const algorithmController = require("../controller/algorithmController");
const router = express.Router();

router.get('/patient/:id',algorithmController.getTherapistBySurvey);

module.exports = router;