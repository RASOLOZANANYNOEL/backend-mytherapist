const express = require("express");
const adminController = require("../controller/adminController");
const router = express.Router();


router.get('/specialties', adminController.getAllSpecialties);
router.get('/therapists', adminController.getAllTherapists);
router.get('/appointments', adminController.getAllAppointments);
router.get('/specialties/:id', adminController.getOneSpecialties);
router.get('/therapists/:id', adminController.getOneTherapists);
router.get('/appointments/therapist/:id', adminController.getOneAppointments);
router.get('/patients', adminController.getAllPatients);
router.get('/patients/:id',adminController.getOnePatients);
router.put('/patients/:id',adminController.updateOnePatients);
router.delete('/patients/:id',adminController.deleteOnePatients);





module.exports = router;
