const express = require("express");
const adminController = require("../controller/adminController");
const router = express.Router();
const { authMiddleware, isAdminMiddleware } = require('../middlewares');


router.get('/specialties',authMiddleware, isAdminMiddleware,adminController.getAllSpecialties);
router.get('/therapists',authMiddleware, isAdminMiddleware,adminController.getAllTherapists);
router.get('/appointments',authMiddleware, isAdminMiddleware,adminController.getAllAppointments);
router.get('/specialties/:id',authMiddleware, isAdminMiddleware,adminController.getOneSpecialties);
router.get('/therapists/:id',authMiddleware, isAdminMiddleware,adminController.getOneTherapists);
router.get('/appointments/therapist/:id',authMiddleware, isAdminMiddleware,adminController.getOneAppointments);
router.get('/patients',authMiddleware, isAdminMiddleware,adminController.getAllPatients);
router.get('/patients/:id',authMiddleware, isAdminMiddleware,adminController.getOnePatients);
router.put('/patients/:id',authMiddleware, isAdminMiddleware,adminController.updateOnePatients);
router.delete('/patients/:id',authMiddleware, isAdminMiddleware,adminController.deleteOnePatients);





module.exports = router;
