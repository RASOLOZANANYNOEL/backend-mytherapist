const express = require("express");
const therapistsController = require("../controller/therapistsController");
const router = express.Router();

router.get('/',therapistsController.getAll);
router.get('/:id',therapistsController.getById);
router.post('/',therapistsController.creatTherapist);
router.put('/:id',therapistsController.updateTherapist);
router.delete('/:id',therapistsController.deleteTherapist);

router.get('/:id/specialities', therapistsController.findTherapistsWithSpecialities);
router.get('/specialities', therapistsController.findAllTherapistsWithSpecialities);

module.exports = router;