const express = require("express");
const quizzController = require("../controller/quizzController");
const router = express.Router();

/*--get all quizz--*/
router.get('/',quizzController.getAll);

/*--get one quizz --*/
router.get('/:id',quizzController.getById);

module.exports = router;