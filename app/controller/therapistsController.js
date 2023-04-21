

const therapistsDatamapper = require('../model/therapists')
const APIError = require("../service/error/APIError");
const debug = require("debug")("controller")

const therapistsController = {
    async getAll(_,res,next) {
        try {
            const allTherapists = await therapistsDatamapper.findAll();
            res.json(allTherapists)
        } catch { 
            next(new APIError("Erreur lors de la récupération des therapists",500))
        }
    },
    async getById(req,res) {
        const id = req.params.id
        const getTherapistById = await therapistsDatamapper.findByPk(id);
        res.json(getTherapistById)
    },
    async creatTherapist (req,res) {
        const therapistInfo = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            adelinumber: req.body.adelinumber,
            phonenumber: req.body.phonenumber,
            streetname: req.body.streetname,
            zipcode: req.body.zipcode,
            email:req.body.email,
            city:req.body.city,
            gender:req.body.gender,
        }
        const creatTherapist = await therapistsDatamapper.create(therapistInfo);
        res.json(creatTherapist)
    },
    async updateTherapist (req,res) {
        const id = req.params.id
        const therapistInfo = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            adelinumber: req.body.adelinumber,
            phonenumber: req.body.phonenumber,
            streetname: req.body.streetname,
            zipcode: req.body.zipcode,
            email:req.body.email,
            city:req.body.city,
            gender:req.body.gender,
            role: req.body.role
        }
        
        const updateTherapist = await therapistsDatamapper.update({id},therapistInfo)
        res.json(updateTherapist)
    },

    async deleteTherapist (req,res) { 
        const id = req.params.id
        const deleteTherapist = await therapistsDatamapper.delete(id)
        res.json(deleteTherapist)
    },

    async findTherapistsWithSpecialties (req,res) {
        const id = req.params.id
        const findTherapistsWithSpecialties = await therapistsDatamapper.findTherapistsWithSpecialties(id);
        res.json(findTherapistsWithSpecialties)
    },
    
    async findAllTherapistsWithSpecialities (_,res) {
        const findAllTherapistsWithSpecialities = await therapistsDatamapper.AllTherapistsWithSpecialities();
        res.json(findAllTherapistsWithSpecialities)
    },

    async addSpecialtiesToTherapist (req,res) {
        const therapistId = req.params.therapistId
        const specialityId = req.params.specialityId
        const addSpecialtiesToTherapist = await therapistsDatamapper.addSpecialtiesToTherapist(therapistId, specialityId);
        res.json(addSpecialtiesToTherapist)
    },

    async removeSpecialtiesFromTherapist (req,res) {
        const therapistId = req.params.therapistId
        const specialityId = req.params.specialityId
        const removeSpecialtiesToTherapist = await therapistsDatamapper.removeSpecialtiesFromTherapist(therapistId, specialityId);
        res.json(removeSpecialtiesToTherapist)
    },

    async getAllTherapistsByGenderWithSpecialities (req,res) {
        const gender = req.params.gender
        const getAllTherapistsByGender = await therapistsDatamapper.getAllTherapistsByGenderWithSpecialities(gender);
        res.json(getAllTherapistsByGender)

    },

    async getAllTherapistsByGender (req,res) {
        const gender = req.params.gender
        const getAllTherapistsByGender = await therapistsDatamapper.getAllTherapistsByGender(gender);
        res.json(getAllTherapistsByGender)

    },
    async getAllAppointmentOfATherapist (req,res) {
        const id = req.params.id;
        const getAllAppointmentOfATherapist = await therapistsDatamapper.getAllAppointmentOfATherapist(id);
        res.json(getAllAppointmentOfATherapist)
    },

    async getOneAppointmentOfATherapist (req,res) {
        const therapistId = req.params.therapistId
        const appointmentId = req.params.appointmentId
        const getOneAppointmentOfATherapist = await therapistsDatamapper.getOneAppointmentOfATherapist(therapistId,appointmentId);
        res.json(getOneAppointmentOfATherapist)
    },

    async creatAppointmentWithOnePatient (req,res) {
        const therapistId = req.params.therapistId
        const patientId= req.params.patientId
        const appointment = {
            beginninghour: req.body.beginninghour,
            endtime: req.body.endtime,
            patients_id: patientId,
            therapists_id:therapistId,
            videosession: req.body.videosession,
            audiosession : req.body.audiosession,
            chatsession : req.body.chatsession,
            sessionatoffice : req.body.sessionatoffice,
        }
        
        const createAppointmentOneTherapist = await therapistsDatamapper.creatAppointmentWithOnePatient({therapistId,patientId},appointment);
        res.json(createAppointmentOneTherapist);
    },

    async viewOneTherapistReviews(req,res) {
        const id = req.params.id
        const viewOneTherapistReviews = await therapistsDatamapper.viewOneTherapistReviews(id)
        res.json(viewOneTherapistReviews)
    },

    async findAllTherapistBySpecialties (req,res) {
        const id = req.params.id
        findAllTherapistBySpecialties = await therapistsDatamapper.findAllTherapistBySpecialties(id)
        res.json(findAllTherapistBySpecialties)
    }
    
}

module.exports = therapistsController;