const express = require("express");
const adminController = require("../controller/adminController");
const router = express.Router();


router.get('/specialties', adminController.getAllSpecialties);
router.get('/therapists', adminController.getAllTherapists);
router.get('/appointments', adminController.getAllAppointments);
router.get('/specialties/:id', adminController.getOneSpecialties);
router.get('/therapists/:id', adminController.getOneTherapists);
router.get('/appointments/therapist/:id', adminController.getOneAppointments);





module.exports = router;