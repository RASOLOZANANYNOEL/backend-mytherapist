const express = require("express");
const patientsController = require('../controller/patientsController');
const router = express.Router();
const { authMiddleware } = require('../middlewares');
const { isPatientMiddleware } = require('../middlewares')


/**schéma patients
 * @swagger
 * components:
 *   schemas:
 *     patients:
 *       tags :
 *        - patients
 *       Form:
 *       type: object
 *       properties:
 *               id:
 *                 type: integer
 *                 example: 
 *               email:
 *                 type: string
 *                 example: "john@gmail.com"
 *               lastname:
 *                 type: string
 *                 example: "James"
 *               firstname:
 *                 type: string
 *                 example: "John"
 *               password:
 *                 type: string
 *                 example: "iuiyohjbnnkb4ou"
 *               phonenumber:
 *                 type: string
 *                 example: "0601020304"
 *               profilpicture:
 *                 type: string
 *                 nullable: true
 *               streetname:
 *                 type: string
 *                 example: ""
 *               zipcode:
 *                 type: string
 *                 example: "75012"
 *               city:
 *                 type: string
 *                 example: ""
 *               complement:
 *                 type: string
 *                 nullable: true
 *               role:
 *                 type: string
 *                 nullable: true
 *               updated_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-04-18T14:52:20.939Z"
 *               quizz_id:
 *                 type: integer
 *                 example: 54
 */

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
router.get('/',patientsController.getAll);

/**Create patient
 * @swagger
 * /patients:
 *   post:
 *     summary: Ajout d'un Patient
 *     tags : 
 *      - patients
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/patients'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/patients'
 */
router.post('/', patientsController.createPatients);


/** get One patients
 * @swagger
 * /patients/{id}:
 *   get:
 *     tags:
 *       - patients
 *     description: Returns One patients
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

/** get appointments for one patient
 * @swagger
 * /patients/{id}/appointments:
 *   get:
 *     tags:
 *       - patients
 *     description: Returns all appointments for one patient
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
 *         description: Patient et rendez-vous récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: object
 *                   items:
 *                     type: string
 *                   example: [{"id": 3,"email": "Gal16@yahoo.fr",
 *		            "lastname": "Dumont",
 *	                "firstname": "Albane",
 *                  "phonenumber": "0613589167",
 *	                "profilpicture": "NULL",
 *	                "streetname": "METRO BOURSE",
 *	                "zipcode": "75102",
 *	                "city": "Paris",
 *	                "complement": "ullam",
 *	                "appointmentid": 89,
 *	                "therapistid": 7,
 *	                "therapistfirstname": "Céline",
 *	                "therapistname": "Robert",
 *	                "appointmentbegin": "2023-04-19T13:00:00.000Z",
 *	                "appointmentend": "2023-04-19T14:00:00.000Z"
 *                  }]             
 */
router.get('/:id/appointments',patientsController.getOnePatientWithAllAppointments);

/** get quizz for one patient
 * @swagger
 * /patients/{id}/quizz:
 *   get:
 *     tags:
 *       - patients
 *     description: Returns quizz for one patient
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
 *         description: Patient et rendez-vous récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: object
 *                   items:
 *                     type: string
 *                   example: [{"id": 5,
 *		            "email": "Turold81@yahoo.fr",
 *		            "lastname": "Baron",
 *		            "firstname": "Aimé",
 *		            "phonenumber": "0642748109",
 *		            "profilpicture": "NULL",
 *		            "streetname": "METRO QUATRE SEPTEMBRE",
 *		            "zipcode": "75102",
 *		            "city": "Paris",
 *		            "complement": "aperiam",
 *		            "quizz_id": 5,
 *		            "quizz_1": "Vous-êtes un particulier ?",
 *		            "answer_1": false,
 *		            "quizz_2": "Souhaitez-vous faire intervenir un praticiens dans votre entreprise ?",
 *		            "answer_2": true,
 *	                "quizz_3": "Souhaitez-vous prendre rendez-vous pour vous ?",
 *		            "answer_3": false,
 *		            "quizz_4": "Souhaitez-vous prendre rendez-vous pour un de vos proches ?",
 *		            "answer_4": true,
 *		            "quizz_5": "Souhaitez-vous prendre rendez-vous pour un ou plusieurs de vos enfants ?",
 *		            "answer_5": true,
 *		            "quizz_6": "Avez-vous des problématiques à régler dans votre couple ?",
 * 		            "answer_6": false,
 *		            "quizz_7": "Sur quoi souhaitez-vous travailler, sur un Accident ?",
 *		            "answer_7": false,
 *		            "quizz_8": "Sur quoi souhaitez-vous travailler, sur une Agression ?",
 *		            "answer_8": false,
 *		            "quizz_9": "Sur quoi souhaitez-vous travailler, sur un Deuil ?",
 *		            "answer_9": true,
 *		            "quizz_10": "Sur quoi souhaitez-vous travailler, sur une Phobie ?",
 *		            "answer_10": false,
 *		            "quizz_11": "Sur quoi souhaitez-vous travailler, sur une Anxiété ?",
 *		            "answer_11": false,
 *		            "quizz_12": "Sur quoi souhaitez-vous travailler, sur une Depression ?",
 *		            "answer_12": true,
 *		            "quizz_13": "Sur quoi souhaitez-vous travailler, sur une Solitude ?",
 *		            "answer_13": true,
 *		            "quizz_14": "Sur quoi souhaitez-vous travailler, sur une Confiance/Estime de soi ?",
 *		            "answer_14": true,
 *		            "quizz_15": "'Sur quoi souhaitez-vous travailler, sur une Addictions ?",
 *		            "answer_15": false,
 *		            "quizz_16": "Sur quoi souhaitez-vous travailler, sur une Evalution/Bilan psychologique et/ou test psychométriques ?",
 *		            "answer_16": false,
 *		            "quizz_17": "Sur quoi souhaitez-vous travailler, sur une Vie profesionnel ?",
 *		            "answer_17": true,
 *		            "quizz_18": "Préférez-vous un praticien Femme ? ",
 *		            "answer_18": false
 *                  }]             
 */
router.get('/:id/quizz', patientsController.getOnePatientWithQuizz);

/** Get Reviews for one therapist 
 * @swagger
 * /patients/reviews/therapists/{id}:
 *   get:
 *     tags:
 *       - patients
 *     description: Returns reviews for one therapist
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID therapist
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
 *                   example: [{"patients_id": 1,
 *	                "patients_lastname": "Gauthier",
 *		            "patients_firstname": "Angélique",
 *		            "patients_profilpicture": "NULL",
 *		            "therapistid": 9,
 *		            "therapistfirstname": "Philémon",
 *		            "therapistname": "Lecomte",
 *		            "negatifreviews": 9,
 *		            "positifreviews": 6,
 *		            "messages": "La séance avec mon psychologue m'a aidé à trouver des moyens de gérer mes relations difficiles avec les membres de ma famille."
 *                  }]
 */
router.get('/reviews/therapists/:id',patientsController.getReviewsOneTherapists);

/**CREATE appointment patient->therapist
 * @swagger
 * /patients/{id}/appointment/therapists/{id}:
 *   post:
 *     summary: Crée un rendez-vous avec un practicien
 *     parameters:
 *       - in: path
 *         name: TherapistId
 *         description: The therapist ID
 *         required: true
 *       - in: path
 *         name : PatientId
 *         description: The patient ID
 *         required: true
 *       - in: path
 *         name : beginninghour
 *         description: When the appointement starts (date and hour)
 *         required: true
 *       - in: path
 *         name : endtime
 *         description: When the appointement finish (date and hour)
 *         required: true
 *       - in: path
 *         name : videosession
 *         description: type of appointement
 *         schema: 
 *           type:  boolean
 *       - in: path
 *         name : audiosession
 *         description: type of appointement
 *         schema: 
 *           type:  boolean
 *       - in: path
 *         name : chatsession
 *         description: type of appointement
 *         schema: 
 *           type:  boolean
 *       - in: path
 *         name : sessionatoffice
 *         description: type of appointement
 *         schema: 
 *           type:  boolean
 *     tags : 
 *      - patients
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: 
 *                example: [{
 *		            "id": 52,
 *		            "beginninghour": "2002-02-02T22:00:00.000Z",
 *		            "endtime": "2002-02-02T23:00:00.000Z",
 *		            "patients_id": 3,
 *		            "therapists_id": 2,
 *		            "videosession": true,
 *		            "audiosession": true,
 *		            "chatsession": true,
 *		            "sessionatoffice": true}]
 */
router.post('/:patientId/appointment/therapists/:therapistId', patientsController.createAppointmentOneTherapist);

/**CREATE reviews patient-therapist --*/
router.post('/:patientId/reviews/therapists/:therapistId',patientsController.createReviewsOneTherapist);

/**CREATE QUIZZ + RETURN Quizz_id
 * @swagger
 * /quizz:
 *   post:
 *     summary: Creat a quizz
 *     parameters:
 *       - in: path
 *         name : answer_1
 *         description: Answer to question 1
 *         schema: 
 *           type:  boolean
 *       - in: path
 *         name : answer_2
 *         description: Answer to question 2
 *         schema: 
 *           type:  boolean
 *       - in: path
 *         name : answer_3
 *         description: Answer to question 2
 *         schema: 
 *           type:  boolean
 *       - in: path
 *         name : answer_4
 *         description: Answer to question 2
 *         schema: 
 *           type:  boolean
 *     tags : 
 *      - patients
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: 
 *                example: [{
 *		"id": 56,
 *		"quizz_1": "Vous-êtes un particulier ?",
 *		"answer_1": false,
 *		"quizz_2": "Souhaitez-vous faire intervenir un praticiens dans votre entreprise ?",
 *		"answer_2": true,
 *		"quizz_3": "Souhaitez-vous prendre rendez-vous pour vous ?",
 *		"answer_3": false,
 *		"quizz_4": "Souhaitez-vous prendre rendez-vous pour un de vos proches ?",
 *		"answer_4": true,
 *		"quizz_5": "Souhaitez-vous prendre rendez-vous pour un ou plusieurs de vos enfants ?",
 *		"answer_5": false,
 *		"quizz_6": "Avez-vous des problématiques à régler dans votre couple ?",
 *		"answer_6": false,
 *		"quizz_7": "Sur quoi souhaitez-vous travailler, sur un Accident ?",
 *		"answer_7": false,
 *		"quizz_8": "Sur quoi souhaitez-vous travailler, sur une Agression ?",
 *		"answer_8": false,
 *		"quizz_9": "Sur quoi souhaitez-vous travailler, sur un Deuil ?",
 *		"answer_9": false,
 *		"quizz_10": "Sur quoi souhaitez-vous travailler, sur une Phobie ?",
 *		"answer_10": false,
 *		"quizz_11": "Sur quoi souhaitez-vous travailler, sur une Anxiété ?",
 *		"answer_11": false,
 *		"quizz_12": "Sur quoi souhaitez-vous travailler, sur une Depression ?",
 *		"answer_12": false,
 *		"quizz_13": "Sur quoi souhaitez-vous travailler, sur une Solitude ?",
 *		"answer_13": false,
 *		"quizz_14": "Sur quoi souhaitez-vous travailler, sur une Confiance/Estime de soi ?",
 *		"answer_14": false,
 *		"quizz_15": "Sur quoi souhaitez-vous travailler, sur une Addictions ?",
 *		"answer_15": false,
 *		"quizz_16": "Sur quoi souhaitez-vous travailler, sur une Evalution/Bilan psychologique et/ou test psychométriques ?",
 *		"answer_16": false,
 *		"quizz_17": "Sur quoi souhaitez-vous travailler, sur une Vie profesionnel ?",
 *		"answer_17": true,
 *		"quizz_18": "Préférez-vous un praticien Femme ou Homme ? ",
 *		"answer_18": false}]
 */
router.post('/quizz',patientsController.answerPatientsQuizz);

/**modify one patient
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: modify a patient
 *     parameters:
 *       - in: path
 *         name : patient ID
 *         description: The id of the patient that you want to modify
 *         schema: 
 *           type:  integer
 *           required: true
 *     tags : 
 *      - patients
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: 
 *                example: 
 */
router.put('/:id', patientsController.updatePatients); 

/**Delete one patient
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: delete a patient
 *     parameters:
 *       - in: path
 *         name : patient ID
 *         description: The id of the patient that you want to delete
 *         schema: 
 *           type:  integer
 *           required: true
 *     tags : 
 *      - patients
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: 
 *                example: 
 */
router.delete('/:id',patientsController.deletePatients);



module.exports = router;


 