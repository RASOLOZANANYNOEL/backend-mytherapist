const express = require("express");
const patientsController = require('../controller/patientsController');
const router = express.Router();


router.get('/', patientsController.getAll);
router.get('/:id', patientsController.getById);

router.post('/',patientsController.creatPatients);

module.exports = router;
