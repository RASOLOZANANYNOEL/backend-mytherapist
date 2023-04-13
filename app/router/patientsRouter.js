const express = require("express");
const patientsController = require('../controller/patientsController');
const router = express.Router();


router.get('/', patientsController.getAll);
router.get('/:id', patientsController.getById);

router.post('/',patientsController.createPatients);

/*--modify patients--*/
router.put('/:id',patientsController.updatePatients); 

router.delete('/:id',patientsController.deletePatients);

module.exports = router;
