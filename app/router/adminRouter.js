const express= require("express");
const adminController = require("../controller/adminController");
const router = express.Router();

router.get('/patients', adminController.getAllPatients);

router.get('/patients/:id',adminController.getOnePatients);

router.put('/patients/:id',adminController.updateOnePatients);

router.delete('/patients/:id',adminController.deleteOnePatients);

module.exports =  router;