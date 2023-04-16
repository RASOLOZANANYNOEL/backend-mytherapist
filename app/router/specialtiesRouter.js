const express = require("express");
const specialtiesController = require("../controller/specialtiesController");
const router = express.Router();


router.get('/', specialtiesController.getAll);
router.get('/:id', specialtiesController.getById);



module.exports = router;