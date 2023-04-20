const express = require("express");
const patientsController = require('../controller/patientsController');
const router = express.Router();
const { authMiddleware } = require('../middlewares');
const { isPatientMiddleware } = require('../middlewares')

/*--get all patients--*/
router.get('/', authMiddleware, isPatientMiddleware,patientsController.getAll);
/*--get one patient --*/
router.get('/:id', patientsController.getById);
/*--get appointments for one patient--*/
router.get('/:id/appointments',authMiddleware,patientsController.getOnePatientWithAllAppointments);

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

/*--CREATE QUIZZ + RETURN Quizz_id  --*/
router.post('/quizz',patientsController.answerPatientsQuizz);

/*--modify one patient--*/
router.put('/:id',patientsController.updatePatients); 

/*--Delete one patient--*/
router.delete('/:id',patientsController.deletePatients);



module.exports = router;
