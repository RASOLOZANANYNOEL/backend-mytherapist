const express = require("express");
const therapistsController = require("../controller/therapistsController");
const router = express.Router();

router.get('/',therapistsController.getAll);
router.get('/specialities', therapistsController.findAllTherapistsWithSpecialities);

router.post('/',therapistsController.creatTherapist);
router.get('/:id',therapistsController.getById);
router.put('/:id',therapistsController.updateTherapist);
router.delete('/:id',therapistsController.deleteTherapist);

router.get('/:id/specialities', therapistsController.findTherapistsWithSpecialities);
router.post('/:therapistId/specialities/:specialityId',therapistsController.addSpecialtiesToTherapist);
router.delete('/:therapistId/specialities/:specialityId',therapistsController.removeSpecialtiesFromTherapist);
router.get('/sexe/:gender/specialities', therapistsController.getAllTherapistsByGenderWithSpecialities);
router.get('/sexe/:gender', therapistsController.getAllTherapistsByGender);
router.get('/:id/appointments', therapistsController.getAllAppointmentOfATherapist);
router.get('/:therapistId/appointments/:appointmentId', therapistsController.getOneAppointmentOfATherapist);
router.post('/:therapistId/appointment/patients/:patientId', therapistsController.creatAppointmentWithOnePatient);


module.exports = router;