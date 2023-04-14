const { getOnePatientWithQuizz, getReviewsOneTherapist, createAppointmentOneTherapist, createReviewsOneTherapist } = require('../model/patients');
const patientsDatamapper= require('../model/patients');

const patientsController = {
    async getAll(_,res) {
        const allPatients= await patientsDatamapper.findAll();
        res.json(allPatients);
    },

    async getById(req,res) {
        const id = req.params.id
        const onePatientsById = await patientsDatamapper.findByPk(id);
        res.json(onePatientsById);
    },
    
    async createPatients(req,res) {
        const patientsInfo = {
            email : req.body.email,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            password:req.body.password,
            phonenumber: req.body.phonenumber,
            streetname : req.body.streetname,
            zipcode : req.body.zipcode,
            city : req.body.city,
        
        }
        const createPatients = await patientsDatamapper.create(patientsInfo);
        res.json(createPatients)
    },

    async updatePatients(req,res){
        const id = req.params.id
        const patientsInfo = {
            email : req.body.email,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            password:req.body.password,
            phonenumber: req.body.phonenumber,
            streetname : req.body.streetname,
            zipcode : req.body.zipcode,
            city : req.body.city,
        }
        const updatePatients = await patientsDatamapper.update({id},patientsInfo);
        res.json(updatePatients);
    },

    async deletePatients(req,res){
        const id = req.params.id
        const deletePatients = await patientsDatamapper.delete(id);
        res.json(deletePatients);
    },

    async getOnePatientWithAllAppointments (req,res) {
        const id = req.params.id
        const getOnePatientsWithAllAppointments = await patientsDatamapper.getOnePatientWithAllAppointments(id);
        res.json(getOnePatientsWithAllAppointments);
    },

    async getOnePatientWithQuizz (req,res) {
        const id= req.params.id
        const getOnePatientWithQuizz = await patientsDatamapper.getOnePatientWithQuizz(id);
        res.json(getOnePatientWithQuizz);
    },

    async getReviewsOneTherapists (req,res){
        const id= req.params.id
        const getReviewsOneTherapists = await patientsDatamapper.getReviewsOneTherapists(id);
        res.json(getReviewsOneTherapists);
    },

    async createAppointmentOneTherapist (req,res) {
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
        
        const createAppointmentOneTherapist = await patientsDatamapper.createAppointmentOneTherapist({therapistId,patientId},appointment);
        res.json(createAppointmentOneTherapist);
    },

    async createReviewsOneTherapist (req,res){
        const patientId= req.params.patientId
        const therapistId = req.params.therapistId
        
        const review = {
            messages: req.body.messages,
            negatifreviews:req.body.negatifreviews,
            positifreviews:req.body.positifreviews,
            patients_id:patientId,
            therapists_id:therapistId,
        }
        const createReviewsOneTherapist = await patientsDatamapper.createReviewsOneTherapist({patientId,therapistId},review);
        res.json(createReviewsOneTherapist);
    }
     

};


module.exports = patientsController;