const express = require("express");
const patientsController = require('../controller/patientsController');
const router = express.Router();


/** get all patients
 * @swagger
 * /patients/:
 *   get:
 *     tags:
 *       - patients
 *     description: Returns all patients
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Recherche effectuée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: object
 *                   items:
 *                     type: string
 *                   example: [{"id": 1,"email": "Florian62@gmail.com","lastname": "Gauthier",
 *		             "firstname": "Angélique",
 *		             "password": "dFqENenIFc8SFd0",
 *		             "phonenumber": "0626505595",
 *	                 "profilpicture": "NULL",
 *		             "streetname": "METRO BONNE NOUVELLE 7",
 *		             "zipcode": "75102",
 *		             "city": "Paris",
 *		             "complement": "Reprehenderit culpa nobis delectus blanditiis error iusto earum saepe. Voluptates deleniti repellendus deleniti sequi rerum. Alias temporibus ab alias voluptatibus. Fugiat voluptatem ea dolorum sint magni pariatur reiciendis.\nQuas temporibus voluptas labore odio odit. Ut molestias velit rerum eum praesentium illo dolor. Est facilis accusamus ea aliquam pariatur expedita reprehenderit minima.\nModi minima reprehenderit pariatur fugit vitae vel eius totam. Facilis odit deleniti eligendi aliquid. Rem ipsum recusandae nulla exercitationem magni suscipit placeat similique adipisci. Eum quae vel sed quibusdam nemo dignissimos sequi nihil veniam. Accusantium suscipit neque deleniti. Nulla officia magni vitae sed ipsam adipisci possimus perspiciatis rem.",
 *		             "role": "patient",
 *		             "updated_at": "2020-04-20T19:00:00.000Z",
 *		             "quizz_id": 1}]
 */
router.get('/', patientsController.getAll);

/** get One patients
 * @swagger
 * /patients/{id}:
 *   get:
 *     tags:
 *       - patients
 *     description: Returns all patients
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur 
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Recherche effectuée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                results:
 *                   type: object
 *                   items:
 *                     type: string
 *                   example: [{"id": 1,"email": "Florian62@gmail.com","lastname": "Gauthier",
 *		             "firstname": "Angélique",
 *		             "password": "dFqENenIFc8SFd0",
 *		             "phonenumber": "0626505595",
 *	                 "profilpicture": "NULL",
 *		             "streetname": "METRO BONNE NOUVELLE 7",
 *		             "zipcode": "75102",
 *		             "city": "Paris",
 *		             "complement": "Reprehenderit culpa nobis delectus blanditiis error iusto earum saepe. Voluptates deleniti repellendus deleniti sequi rerum. Alias temporibus ab alias voluptatibus. Fugiat voluptatem ea dolorum sint magni pariatur reiciendis.\nQuas temporibus voluptas labore odio odit. Ut molestias velit rerum eum praesentium illo dolor. Est facilis accusamus ea aliquam pariatur expedita reprehenderit minima.\nModi minima reprehenderit pariatur fugit vitae vel eius totam. Facilis odit deleniti eligendi aliquid. Rem ipsum recusandae nulla exercitationem magni suscipit placeat similique adipisci. Eum quae vel sed quibusdam nemo dignissimos sequi nihil veniam. Accusantium suscipit neque deleniti. Nulla officia magni vitae sed ipsam adipisci possimus perspiciatis rem.",
 *		             "role": "patient",
 *		             "updated_at": "2020-04-20T19:00:00.000Z",
 *		             "quizz_id": 1}]
 */
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

/*--CREATE QUIZZ + RETURN Quizz_id  --*/
router.post('/quizz',patientsController.answerPatientsQuizz);

/*--modify one patient--*/
router.put('/:id',patientsController.updatePatients); 

/*--Delete one patient--*/
router.delete('/:id',patientsController.deletePatients);



module.exports = router;


 