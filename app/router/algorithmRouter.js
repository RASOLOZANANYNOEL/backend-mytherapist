const express = require("express");
const algorithmController = require("../controller/algorithmController");
const router = express.Router();

// Route de l'algo -> donne tout les information des psy dans une spécialité.

/**CREATE appointment between one therapist and one patient
 * @swagger
 * /algorithm/patient/{patientId}:
 *   get:
 *      summary: Get the list of therapist based on the answer given in the quizz
 *      parameters:
 *       - in: path
 *         name: patientId
 *         description: the id of the patient
 *         required: true
 *      tags : 
 *       - patients - algorithm
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: 
 *                 example: [{"id": 1,
 *            		"lastname": "Cousin",
 *            		"firstname": "Cyrille",
 *                  "label": "Psychologue du travail",
 *                  "gender": "Homme",
 *                   "profilpicture": "public/images/Therapists profile picture/Therapists mens/1.jpeg",
 *                   "videosession": false,
 *                   "chatsession": false,
 *                   "sessionatoffice": false,
 *                   "audiosession": true,
 *                   "adelinumber": "903322548",
 *                   "streetname": "PONT NEUF 1",
 *                   "city": "Paris",
 *                   "phonenumber": "0680256985",
 *                   "profilpresentation": "Sunt quos porro.",
 *                   "complement": "Cupiditate est ullam impedit. Ipsa labore a beatae rem accusantium autem neque. Nulla perferendis esse et aliquam consequatur aliquam explicabo nesciunt dolor. Nesciunt suscipit vitae quisquam consectetur voluptas. Accusamus autem deserunt.\nImpedit quam quaerat error neque molestiae voluptate voluptatem saepe quisquam. Deserunt voluptatibus voluptatibus voluptates id aut voluptatem quo ipsum cum. Perferendis ratione quia perferendis corrupti consectetur autem itaque veniam asperiores. Id provident totam deleniti. Fugit a nam pariatur qui fugit.\nVelit amet odio labore voluptatibus. Quis qui deleniti molestiae. Molestias et unde officia provident quis quo quia magnam. Nesciunt explicabo eaque illum repudiandae nobis atque tempora beatae. Cum consequuntur adipisci corporis.",
 *                   "zipcode": "75101"},{
 *                   "id": 2,
 *                   "lastname": "Vincent",
 *                   "firstname": "Évariste",
 *                   "label": "Psychologue du travail",
 *                   "gender": "Homme",
 *                   "profilpicture": "public/images/Therapists profile picture/Therapists mens/10.jpeg",
 *                   "videosession": false,
 *                   "chatsession": false,
 *                   "sessionatoffice": false,
 *                   "audiosession": false,
 *                   "adelinumber": "378490170",
 *                   "streetname": "PONT NEUF 2",
 *                   "city": "Paris",
 *                   "phonenumber": "0613821887",
 *                   "profilpresentation": "Quis velit possimus vero reiciendis fugiat libero aut deserunt. Odio nihil laborum officiis. Nostrum maxime dolorum reiciendis nam error. Optio maiores dolor vel laudantium. Perspiciatis exercitationem cum necessitatibus eveniet.\nRepellendus qui placeat enim ratione. Veniam voluptates error vel earum quos sunt delectus nostrum deserunt. Perferendis recusandae dolor magnam incidunt. Ad accusamus consequuntur ipsum. Ipsam quaerat a harum esse veniam.\nNam nostrum distinctio dignissimos accusamus labore illo quo eos. Dolores earum corporis. Dolore et occaecati omnis soluta vero officiis sint atque. Quia dicta architecto ipsum minima perferendis nulla blanditiis corporis architecto. In itaque necessitatibus eos quas itaque commodi sed.",
 *                   "complement": "Commodi beatae excepturi pariatur saepe cum eos saepe corporis quas. Aliquid reprehenderit ad sequi eum corrupti provident at corrupti cum. Tempore ab quidem iure blanditiis amet distinctio asperiores nobis dolor.",
 *                   "zipcode": "75101"}]
 */
router.get('/patient/:id',algorithmController.getTherapistBySurvey);

module.exports = router;