const express = require("express");
const patientsController = require('../controller/patientsController');
const router = express.Router();

/*--get all patients--*/
router.get('/', patientsController.getAll);
/*--get one patient --*/
router.get('/:id', patientsController.getById);
/*--get appointments for one patient--*/
router.get('/:id/appointments', patientsController.getOnePatientWithAllAppointments);

/*-- quizz for one patient--*/
router.get('/:id/quizz', patientsController.getOnePatientWithQuizz);

/*--Reviews for one therapist --*/
router.get('/reviews/therapists/:id',patientsController.getReviewsOneTherapists);

/*--Create patient--*/
router.post('/',patientsController.createPatients);

/*--CREATE appointment patient-therapist --*/
router.post('/:patientId/appointment/therapists/:therapistId', patientsController.createAppointmentOneTherapist);

/*--CREATE reviews patient-therapist --*/
router.post('/:patientId/reviews/therapists/:therapistId',patientsController.createReviewsOneTherapist);

/*--modify one patient--*/
router.put('/:id',patientsController.updatePatients); 

/*--Delete one patient--*/
router.delete('/:id',patientsController.deletePatients);



module.exports = router;
