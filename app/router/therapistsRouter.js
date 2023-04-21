const express = require("express");
const therapistsController = require("../controller/therapistsController");
const router = express.Router();
const { authMiddleware } = require('../middlewares');
const { isTherapistMiddleware } = require('../middlewares')

/**schéma therapists
 * @swagger
 * components:
 *   schemas:
 *     therapists:
 *       tags :
 *        - therapists
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
 *               adelinumber:
 *                  type: string
 *                  example: ""
 *               profilpicture:
 *                 type: string
 *                 nullable: true
 *               profilpresentation:
 *                  type: string
 *                  example: ""
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
 *               videosession:
 *                  type: boolean
 *                  example: true
 *               audiosession:
 *                  type: boolean
 *                  example: true
 *               chatsession:
 *                  type: boolean
 *                  example: true
 *               sessionatoffice:
 *                  type: boolean
 *                  example: true
 *               gender:
 *                  type: string
 *                  example: ""
 *               updated_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-04-18T14:52:20.939Z"
 *               role:
 *                 type: string
 *                 nullable: true
 */

/** get all therapists
 * @swagger
 * /therapists/:
 *   get:
 *     tags:
 *       - therapists
 *     description: Returns all therapists
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
 *                   example: [{"id": 1,"email": "Thophraste.Berger3@hotmail.fr",
 *		            "lastname": "Dupuy",
 *                  "firstname": "Monique",
 *		            "password": "X77o_X6f3fUYyK1",
 *		            "phonenumber": "0682068951",
 *		            "adelinumber": "381454987",
 *		            "profilpicture": "NULL",
 *		            "profilpresentation": "Maxime eveniet inventore blanditiis quis voluptas. Nesciunt magni earum ipsum eaque iure debitis dolor. Laboriosam expedita mollitia asperiores quis ex. A cupiditate rem ea eaque quae nesciunt odit aut quam. Eos quis unde ex repellat asperiores assumenda aliquam. Quae explicabo ut.",
 *		            "streetname": "PONT NEUF 1",
 *		            "zipcode": "75101",
 *		            "city": "Paris",
 *		            "complement": "Eos explicabo eos voluptate adipisci nisi optio.",
 *		            "videosession": false,
 *		            "audiosession": true,
 *		            "chatsession": false,
 *		            "sessionatoffice": true,
 *		            "gender": "Femme",
 *		            "updated_at": "2020-04-20T18:00:00.000Z",
 *		            "role": "therapist"
 *                  }]
 */
router.get('/',therapistsController.getAll);

/** get all therapists with specialties
 * @swagger
 * /therapists/specialties:
 *   get:
 *     tags:
 *       - therapists
 *     description: Returns all therapists with specialties
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
 *                   example: [{
 *	                "lastname": "Lopez",
 *		            "firstname": "Xavier",
 *		            "label": "Psychologue du développement de l'enfance et de l'adolescence",
 *		            "id": 3}]
 */
router.get('/specialties', therapistsController.findAllTherapistsWithSpecialities);

/**CREATE THERAPIST
 * @swagger
 * /therapists/:
 *     post:
 *      summary: Create therapist
 *      parameters:
 *          - in: path
 *            name : email
 *            description: email
 *            schema: 
 *              type: string
 *          - in: path
 *            name : lastname
 *            description: lastname
 *            schema: 
 *              type: string
 *          - in: path
 *            name : firstname
 *            description: firstname
 *            schema: 
 *              type: string
 *          - in: path
 *            name : password
 *            description: password
 *            schema: 
 *              type: string
 *          - in: path
 *            name : phonenumber
 *            description: phonenumber
 *            schema: 
 *              type: string
 *          - in: path
 *            name : adelinumber
 *            description: adelinumber
 *            schema: 
 *              type: integer
 *          - in: path
 *            name : profilpicture
 *            description: profilpicture
 *            schema: 
 *              type: null
 *          - in: path
 *            name : profilpresentation
 *            description: profilpresentation
 *            schema: 
 *              type: string
 *          - in: path
 *            name : streetname
 *            description: streetname
 *            schema: 
 *              type: string
 *          - in: path
 *            name : zipcode
 *            description: zipcode
 *            schema: 
 *              type:  integer
 *          - in: path
 *            name : city
 *            description: city
 *            schema: 
 *              type: string
 *          - in: path
 *            name : complement
 *            description: complement
 *            schema: 
 *              type: string
 *          - in: path
 *            name : videosession
 *            description: videosession
 *            schema: 
 *              type: boolean
 *          - in: path
 *            name : audiosession
 *            description: audiosession
 *            schema: 
 *              type: boolean
 *          - in: path
 *            name : chatsession
 *            description: chatsession
 *            schema: 
 *              type: boolean
 *          - in: path
 *            name : sessionatoffice
 *            description: sessionatoffice
 *            schema: 
 *              type: boolean
 *          - in: path
 *            name : gender
 *            description: Homme ou Femme
 *            schema:
 *              type: string
 *          - in: path
 *            name : updated_at
 *            description: Date de mise à jour
 *            schema:
 *              type: string
 *          - in: path
 *            name : role
 *            description: role
 *            schema:
 *              type: string
 *      tags : 
 *      - therapists
 *      produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: therapist created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: 
 *              example: [{"email": "Thophraste.Berger3@hotmail.fr",
 *		"lastname": "Dupuy",
 *		"firstname": "Monique",
 *		"password": "X77o_X6f3fUYyK1",
 *		"phonenumber": "0682068951",
 *		"adelinumber": "381454987",
 *		"profilpicture": "NULL",
 *		"profilpresentation": "Maxime eveniet inventore blanditiis quis voluptas. Nesciunt magni earum ipsum eaque iure debitis dolor. Laboriosam expedita mollitia asperiores quis ex. A cupiditate rem ea eaque quae nesciunt odit aut quam. Eos quis unde ex repellat asperiores assumenda aliquam. Quae explicabo ut.",
 *		"streetname": "PONT NEUF 1",
 *		"zipcode": "75101",
 *		"city": "Paris",
 *		"complement": "Eos explicabo eos voluptate adipisci nisi optio.",
 *		"videosession": false,
 *		"audiosession": true,
 *		"chatsession": false,
 *		"sessionatoffice": true,
 *		"gender": "Femme",
 *		"updated_at": "2020-04-20T18:00:00.000Z",
 *		"role": "therapist"}]
 */
router.post('/',therapistsController.creatTherapist);

/** get One therapists
 * @swagger
 * /therapists/{id}:
 *   get:
 *     tags:
 *       - therapists
 *     description: Returns One therapists
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
 *                   example: [{"id": 5,"email": "Flix.Lopez@gmail.com",
 *	                "lastname": "Cousin",
 *	                "firstname": "Philippe",
 *	                "password": "MYknB4McqbzeXSM",
 *	                "phonenumber": "0631933655",
 *	                "adelinumber": "402331811",
 *	                "profilpicture": "NULL",
 *	                "profilpresentation": "Adipisci consequuntur ipsum repudiandae tempore explicabo. Quidem saepe eum magni voluptate. Quisquam corrupti amet nostrum. Ut nesciunt corporis. Molestias sapiente fugit magni autem facilis. Doloremque ullam tempore pariatur sapiente nam reprehenderit occaecati aut.",
 *	                "streetname": "PORT DU LOUVRE",
 *	                "zipcode": "75101",
 *	                "city": "Paris",
 *	                "complement": "Sunt unde ipsum.",
 *	                "videosession": true,
 *	                "audiosession": true,
 *	                "chatsession": false,
 *	                "sessionatoffice": false,
 *	                "gender": "Homme",
 *	                "updated_at": "2020-04-20T18:00:00.000Z",
 *	                "role": "therapist"}]
 */
router.get('/:id',therapistsController.getById);

router.put('/:id',therapistsController.updateTherapist);

router.delete('/:id',therapistsController.deleteTherapist);

/** get One therapists with specialties
 * @swagger
 * /therapists/{id}/specialties:
 *   get:
 *     tags:
 *       - therapists
 *     description: Returns One therapists with specialties
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
 *                   example: [{"lastname": "Legrand",
 *		            "firstname": "Fabrice",
 *		            "label": "Psychologue-coaching",
 *		            "gender": "Femme"}]
 */
router.get('/:id/specialties', therapistsController.findTherapistsWithSpecialties);

/**CREATE One therapists with one specialty
 * @swagger
 * /therapists/therapistId/specialties/specialtyId:
 *     post:
 *      summary: Create One therapists with one specialty
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID therapist
 *          - in: path
 *            name : email
 *            description: email
 *            schema: 
 *              type: string
 *          - in: path
 *            name : lastname
 *            description: lastname
 *            schema: 
 *              type: string
 *          - in: path
 *            name : firstname
 *            description: firstname
 *            schema: 
 *              type: string
 *          - in: path
 *            name : password
 *            description: password
 *            schema: 
 *              type: string
 *          - in: path
 *            name : phonenumber
 *            description: phonenumber
 *            schema: 
 *              type: string
 *          - in: path
 *            name : adelinumber
 *            description: adelinumber
 *            schema: 
 *              type: integer
 *          - in: path
 *            name : profilpicture
 *            description: profilpicture
 *            schema: 
 *              type: null
 *          - in: path
 *            name : profilpresentation
 *            description: profilpresentation
 *            schema: 
 *              type: string
 *          - in: path
 *            name : streetname
 *            description: streetname
 *            schema: 
 *              type: string
 *          - in: path
 *            name : zipcode
 *            description: zipcode
 *            schema: 
 *              type:  integer
 *          - in: path
 *            name : city
 *            description: city
 *            schema: 
 *              type: string
 *          - in: path
 *            name : complement
 *            description: complement
 *            schema: 
 *              type: string
 *          - in: path
 *            name : videosession
 *            description: videosession
 *            schema: 
 *              type: boolean
 *          - in: path
 *            name : audiosession
 *            description: audiosession
 *            schema: 
 *              type: boolean
 *          - in: path
 *            name : chatsession
 *            description: chatsession
 *            schema: 
 *              type: boolean
 *          - in: path
 *            name : sessionatoffice
 *            description: sessionatoffice
 *            schema: 
 *              type: boolean
 *          - in: path
 *            name : gender
 *            description: Homme ou Femme
 *            schema:
 *              type: string
 *          - in: path
 *            name : updated_at
 *            description: Date de mise à jour
 *            schema:
 *              type: string
 *          - in: path
 *            name : role
 *            description: role
 *            schema:
 *              type: string
 *      tags : 
 *      - therapists
 *      produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: therapist created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: 
 *              example: [{"email": "Thophraste.Berger3@hotmail.fr",
 *		"lastname": "Dupuy",
 *		"firstname": "Monique",
 *		"password": "X77o_X6f3fUYyK1",
 *		"phonenumber": "0682068951",
 *		"adelinumber": "381454987",
 *		"profilpicture": "NULL",
 *		"profilpresentation": "Maxime eveniet inventore blanditiis quis voluptas. Nesciunt magni earum ipsum eaque iure debitis dolor. Laboriosam expedita mollitia asperiores quis ex. A cupiditate rem ea eaque quae nesciunt odit aut quam. Eos quis unde ex repellat asperiores assumenda aliquam. Quae explicabo ut.",
 *		"streetname": "PONT NEUF 1",
 *		"zipcode": "75101",
 *		"city": "Paris",
 *		"complement": "Eos explicabo eos voluptate adipisci nisi optio.",
 *		"videosession": false,
 *		"audiosession": true,
 *		"chatsession": false,
 *		"sessionatoffice": true,
 *		"gender": "Femme",
 *		"updated_at": "2020-04-20T18:00:00.000Z",
 *		"role": "therapist"}]
 */
router.post('/:therapistId/specialities/:specialityId',therapistsController.addSpecialtiesToTherapist);

router.delete('/:therapistId/specialities/:specialityId',therapistsController.removeSpecialtiesFromTherapist);

/** get all therapists with sexe with all specialties
 * @swagger
 * /therapists/sexe/{gender}/specialities:
 *   get:
 *     tags:
 *       - therapists
 *     description: Returns all therapists with gender and with all specialties
 *     parameters:
 *       - in: path
 *         name: sexe gender
 *         schema:
 *           type: string
 *         required: true
 *         description: genre Homme ou Femme 
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
 *                   example: [{"lastname": "Noel",
 *                     "firstname": "Marianne",
 *                     "label": "Psychologue spécialisé en traumatologie",
 *                      "id": 1,
 *                      "gender": "Homme"}]
 */
router.get('/sexe/:gender/specialities', therapistsController.getAllTherapistsByGenderWithSpecialities);

/** get all therapists with gender
 * @swagger
 * /therapists/sexe/{gender}:
 *   get:
 *     tags:
 *       - therapists
 *     description: Returns therapists with gender 
 *     parameters:
 *       - in: path
 *         name: sexe gender
 *         schema:
 *           type: string
 *         required: true
 *         description: genre Homme ou Femme 
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
 *                   example: [{"lastname": "Pierre",
 *                   "firstname": "Taurin",
 *             	     "id": 31,
 *		            "gender": "Homme",
 *		            "phonenumber": "0650888079",
 *		            "email": "Oriane_Guillot46@hotmail.fr",
 *		            "streetname": "PONT DES ARTS",
 *		            "city": "Paris",
 *		            "complement": "enim reprehenderit quia",
 *		            "profilpresentation": "veniam",
 *		            "audiosession": true,
 *		            "videosession": false,
 *		            "chatsession": true,
 *		            "sessionatoffice": true}]
 */
router.get('/sexe/:gender', therapistsController.getAllTherapistsByGender);

/** get One therapists with appointments
 * @swagger
 * /therapists/{id}/appointments:
 *   get:
 *     tags:
 *       - therapists
 *     description: Returns One therapists with appointments
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
 *                   example: [{"beginninghour": "2020-04-20T16:00:00.000Z",
 *		            "endtime": "2020-04-20T17:00:00.000Z",
 *		            "patients_id": 17,
 *		            "videosession": true,
 *		            "audiosession": false,
 *		            "chatsession": true,
 *		            "sessionatoffice": false,
 *		            "therapist_email": "Alpinien40@hotmail.fr",
 *		            "therapist_lastname": "Lopez",
 *		            "therapist_firstname": "Xavier",
 *		            "therapist_phonenumber": "0671945421",
 *		            "patient_profilepicture": "NULL",
 *		            "therapist_adress": "PORTE DU LOUVRE 1",
 *		            "therapist_zipcode": "75101",
 *		            "therapist_city": "Paris",
 *		            "therapist_adresscomplement": "id commodi voluptatibus",
 *		            "patient_email": "Germaine_Robert90@hotmail.fr",
 *		            "patient_phonenumber": "0601781224",
 *		            "patient_lastname": "Durand",
 *		            "patient_firstname": "Agapet",
 *		            "appointment_id": 96}]
 */
router.get('/:id/appointments', therapistsController.getAllAppointmentOfATherapist);

/** get One therapists with One appointments
 * @swagger
 * /therapists/{therapistId}/appointments/{appointmentId}:
 *   get:
 *     tags:
 *       - therapists
 *     description: Returns One therapists with One appointments
 *     parameters:
 *       - in: path
 *         name: therapistId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID  therapist 
 *       - in: path
 *         name: appointmentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID appointment
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
 *                   example: [{"beginninghour": "2020-04-20T16:00:00.000Z",
 *		            "endtime": "2020-04-20T17:00:00.000Z",
 *		            "patients_id": 17,
 *		            "videosession": true,
 *		            "audiosession": false,
 *		            "chatsession": true,
 *		            "sessionatoffice": false,
 *		            "therapist_email": "Alpinien40@hotmail.fr",
 *		            "therapist_lastname": "Lopez",
 *		            "therapist_firstname": "Xavier",
 *		            "therapist_phonenumber": "0671945421",
 *		            "patient_profilepicture": "NULL",
 *		            "therapist_adress": "PORTE DU LOUVRE 1",
 *		            "therapist_zipcode": "75101",
 *		            "therapist_city": "Paris",
 *		            "therapist_adresscomplement": "id commodi voluptatibus",
 *		            "patient_email": "Germaine_Robert90@hotmail.fr",
 *		            "patient_phonenumber": "0601781224",
 *		            "patient_lastname": "Durand",
 *		            "patient_firstname": "Agapet",
 *		            "appointment_id": 96}]
 */
router.get('/:therapistId/appointments/:appointmentId', therapistsController.getOneAppointmentOfATherapist);

router.post('/:therapistId/appointment/patients/:patientId', therapistsController.creatAppointmentWithOnePatient);

/** get One therapists with reviews
 * @swagger
 * /therapists/{id}/reviews:
 *   get:
 *     tags:
 *       - therapists
 *     description: Returns One therapists with reviews
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
 *                   example: [{"patient_messages": "Mon psychologue a été très attentif et compréhensif pendant la séance.",
 *		            "badscore": 3,
 *		            "godscore": 1,
 *		            "patient_firstname": "Agapet",
 *		            "patient_lastname": "Richard",
 *		            "patient_id": 20,
 *		            "patient_profilpicture": "NULL",
 *		            "therapist_lastname": "Robert",
 *		            "therapist_firstname": "Céline",
 *		            "appointment_id": 96}]
 */
router.get('/:id/reviews', therapistsController.viewOneTherapistReviews);

/** get therapists with One specialties
 * @swagger
 * /therapists/specialties/{id}:
 *   get:
 *     tags:
 *       - therapists
 *     description: Returns therapists with one specialties
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: specialties ID
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
 *                   example: [{"lastname": "Giraud",
 *	                "firstname": "Alexandrine",
 *		            "label": "Psychologue thérapie de couple",
 *		            "gender": "Homme"}]
 */
router.get('/specialties/:id', therapistsController.findAllTherapistBySpecialties);



module.exports = router;