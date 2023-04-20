const express = require("express");
const quizzController = require("../controller/quizzController");
const router = express.Router();

/** get all quizz
 * @swagger
 * /quizz/:
 *   get:
 *     summary: Returns all quizz
 *     tags:
 *       - quizz
 *     description: Returns all quizz
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
 *                  results:
 *                   type: object
 *                   items:
 *                     type: string
 *                  example: [{"id": 56,
 *		        "quizz_1": "Vous-êtes un particulier ?",
 *		        "answer_1": false,
 *		        "quizz_2": "Souhaitez-vous faire intervenir un praticiens dans votre entreprise ?",
 *		        "answer_2": true,
 *		        "quizz_3": "Souhaitez-vous prendre rendez-vous pour vous ?",
 *		        "answer_3": false,
 *		        "quizz_4": "Souhaitez-vous prendre rendez-vous pour un de vos proches ?",
 *		        "answer_4": true,
 *		        "quizz_5": "Souhaitez-vous prendre rendez-vous pour un ou plusieurs de vos enfants ?",
 *		        "answer_5": false,
 *		        "quizz_6": "Avez-vous des problématiques à régler dans votre couple ?",
 *		        "answer_6": false,
 *		        "quizz_7": "Sur quoi souhaitez-vous travailler, sur un Accident ?",
 *		        "answer_7": false,
 *		        "quizz_8": "Sur quoi souhaitez-vous travailler, sur une Agression ?",
 *		        "answer_8": false,
 *		        "quizz_9": "Sur quoi souhaitez-vous travailler, sur un Deuil ?",
 *		        "answer_9": false,
 *		        "quizz_10": "Sur quoi souhaitez-vous travailler, sur une Phobie ?",
 *		        "answer_10": false,
 *		        "quizz_11": "Sur quoi souhaitez-vous travailler, sur une Anxiété ?",
 *		        "answer_11": false,
 *		        "quizz_12": "Sur quoi souhaitez-vous travailler, sur une Depression ?",
 *		        "answer_12": false,
 *		        "quizz_13": "Sur quoi souhaitez-vous travailler, sur une Solitude ?",
 *		        "answer_13": false,
 *		        "quizz_14": "Sur quoi souhaitez-vous travailler, sur une Confiance/Estime de soi ?",
 *		        "answer_14": false,
 *		        "quizz_15": "Sur quoi souhaitez-vous travailler, sur une Addictions ?",
 *		        "answer_15": false,
 *		        "quizz_16": "Sur quoi souhaitez-vous travailler, sur une Evalution/Bilan psychologique et/ou test psychométriques ?",
 *		        "answer_16": false,
 *		        "quizz_17": "Sur quoi souhaitez-vous travailler, sur une Vie profesionnel ?",
 *		        "answer_17": true,
 *		        "quizz_18": "Préférez-vous un praticien Femme ou Homme ? ",
 *		        "answer_18": false}]
 */
router.get('/',quizzController.getAll);

/** get get one quizz
 * @swagger
 * /quizz/{id}:
 *   get:
 *     summary: Returns One quizz
 *     tags:
 *       - quizz
 *     description: Returns One quizz
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID quizz
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
 *                  results:
 *                   type: object
 *                   items:
 *                     type: string
 *                  example: [{"id": 56,
 *		        "quizz_1": "Vous-êtes un particulier ?",
 *		        "answer_1": false,
 *		        "quizz_2": "Souhaitez-vous faire intervenir un praticiens dans votre entreprise ?",
 *		        "answer_2": true,
 *		        "quizz_3": "Souhaitez-vous prendre rendez-vous pour vous ?",
 *		        "answer_3": false,
 *		        "quizz_4": "Souhaitez-vous prendre rendez-vous pour un de vos proches ?",
 *		        "answer_4": true,
 *		        "quizz_5": "Souhaitez-vous prendre rendez-vous pour un ou plusieurs de vos enfants ?",
 *		        "answer_5": false,
 *		        "quizz_6": "Avez-vous des problématiques à régler dans votre couple ?",
 *		        "answer_6": false,
 *		        "quizz_7": "Sur quoi souhaitez-vous travailler, sur un Accident ?",
 *		        "answer_7": false,
 *		        "quizz_8": "Sur quoi souhaitez-vous travailler, sur une Agression ?",
 *		        "answer_8": false,
 *		        "quizz_9": "Sur quoi souhaitez-vous travailler, sur un Deuil ?",
 *		        "answer_9": false,
 *		        "quizz_10": "Sur quoi souhaitez-vous travailler, sur une Phobie ?",
 *		        "answer_10": false,
 *		        "quizz_11": "Sur quoi souhaitez-vous travailler, sur une Anxiété ?",
 *		        "answer_11": false,
 *		        "quizz_12": "Sur quoi souhaitez-vous travailler, sur une Depression ?",
 *		        "answer_12": false,
 *		        "quizz_13": "Sur quoi souhaitez-vous travailler, sur une Solitude ?",
 *		        "answer_13": false,
 *		        "quizz_14": "Sur quoi souhaitez-vous travailler, sur une Confiance/Estime de soi ?",
 *		        "answer_14": false,
 *		        "quizz_15": "Sur quoi souhaitez-vous travailler, sur une Addictions ?",
 *		        "answer_15": false,
 *		        "quizz_16": "Sur quoi souhaitez-vous travailler, sur une Evalution/Bilan psychologique et/ou test psychométriques ?",
 *		        "answer_16": false,
 *		        "quizz_17": "Sur quoi souhaitez-vous travailler, sur une Vie profesionnel ?",
 *		        "answer_17": true,
 *		        "quizz_18": "Préférez-vous un praticien Femme ou Homme ? ",
 *		        "answer_18": false}]
 */
router.get('/:id',quizzController.getById);

module.exports = router; 