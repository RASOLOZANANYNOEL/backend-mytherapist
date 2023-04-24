
const patientsDatamapper= require('../model/patients');
const APIError = require("../service/error/APIError");
const debug = require("debug")("controller");

const patientsController = {
    /**
     * Récupération de tous les patients
     * @param {*}_ requête Express
     * @param {*} res réponse Express
     * @returns {json} liste des patients
     */
    async getAll(_,res,next) {
        try {
        const allPatients= await patientsDatamapper.findAll();
        res.json(allPatients)
        } catch {
            next(new APIError("Erreur lors de la récupération des patients", 500));
        }
    },
    /**
     * Récupération d'un patient par son id
     * @param {*}req requête Express
     * @param {*} res réponse Express
     * @returns {json} un patient
     */
    async getById(req,res,next) {
        const id = req.params.id
        try {
        const onePatientsById = await patientsDatamapper.findByPk(id);
        res.json(onePatientsById)
        } catch {
            next(new APIError("Erreur lors de la récupération du patient", 500));
        }
    },
    // dans le patientsInfo il y aura quizz_id
    //et le quizz id sera recupéré soit via le body ou params
    /**
     * Création d'un patient
     * @param {*} req requête Express
     * @param {*} res réponse Express
     * @returns {json} créer un patient 
     */
    async createPatients(req,res,next) {
        try {
        const patientsInfo = {
            email : req.body.email,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            password:req.body.password,
            phonenumber: req.body.phonenumber,
            streetname : req.body.streetname,
            zipcode : req.body.zipcode,
            city : req.body.city,
            quizz_id : req.body.quizz_id     
        }
        const createPatients = await patientsDatamapper.create(patientsInfo);
        res.json(createPatients)
        } catch {
        next(new APIError("Erreur lors de la création du patient", 500));
        }
    },
    /**
     * Mise à jour d'un patient
     * @param {*} req requête Express
     * @param {*} res réponse Express
     * @returns {json} mettre à jour un patient
     */
    async updatePatients(req,res,next){
        const id = req.params.id
        try {
        const patientsInfo = {
            email : req.body.email,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            password:req.body.password,
            phonenumber: req.body.phonenumber,
            streetname : req.body.streetname,
            zipcode : req.body.zipcode,
            city : req.body.city,
            role : req.body.role
        }
        const updatePatients = await patientsDatamapper.update({id},patientsInfo);
        res.json(updatePatients)
        } catch {
            next(new APIError("Erreur lors de la mise à jour du patient", 500));
        }
    },
    /**
     * Suppression d'un patient
     * @param {*} req requête Express
     * @param {*} res réponse Express
     * @returns {json} supprimer un patient
     */
    async deletePatients(req,res,next){
        const id = req.params.id
        try {
        const deletePatients = await patientsDatamapper.delete(id);
        res.json(deletePatients)
        } catch {
            next(new APIError("Erreur lors de la suppression du patient", 500));
        }
    },
    /**
     * Récupération d'un patient avec ses rendez-vous
     * @param {*} req requête Express
     * @param {*} res réponse Express
     * @returns {json} un patient avec ses rendez-vous
     */
    async getOnePatientWithAllAppointments (req,res,next) {
        const id = req.params.id
        try {
        const getOnePatientsWithAllAppointments = await patientsDatamapper.getOnePatientWithAllAppointments(id);
        res.json(getOnePatientsWithAllAppointments)
        } catch {
            next(new APIError("Erreur lors de la récupération du patient avec ses rendez-vous", 500));
        }
    },
    /**
     * Récupération d'un patient avec ses quizz
     * @param {*} req requête Express
     * @param {*} res réponse Express
     * @returns {json} un patient avec ses quizz
     */
    async getOnePatientWithQuizz (req,res,next) {
        const id= req.params.id
        try {
        const getOnePatientWithQuizz = await patientsDatamapper.getOnePatientWithQuizz(id);
        res.json(getOnePatientWithQuizz)
        } catch {
            next(new APIError("Erreur lors de la récupération du patient avec ses quizz", 500));
        }
    },
    /**
     * Récupération l'avis des patients sur un therapist
     * @param {*} req requête Express
     * @param {*} res réponse Express
     * @returns {json} avis des patients sur un therapist
     */
    async getReviewsOneTherapists (req,res,next){
        const id= req.params.id
        try {
        const getReviewsOneTherapists = await patientsDatamapper.getReviewsOneTherapists(id);
        res.json(getReviewsOneTherapists)
        } catch {
            next(new APIError("Erreur lors de la récupération des avis des patients sur un therapist", 500));
        }
    },
    /**
     * création d'un rendez-vous entre un patient et un therapist
     * @param {*} req requête Express
     * @param {*} res réponse Express
     * @returns {json} créer un rendez-vous entre un patient et un therapist
     */
    async createAppointmentOneTherapist (req,res,next) {
        
        const therapistId = req.params.therapistId
        const patientId= req.params.patientId
        try {
        
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
        res.json(createAppointmentOneTherapist)
        } catch {
            next(new APIError("Erreur lors de la création du rendez-vous entre un patient et un therapist", 500));
        }
    },
    /**
     * création d'un avis sur un therapist
     * @param {*} req requête Express
     * @param {*} res réponse Express
     * @returns {json} créer un avis sur un therapist
     */
    async createReviewsOneTherapist (req,res,next){
        const patientId= req.params.patientId
        const therapistId = req.params.therapistId
        try {
        
        const review = {
            messages: req.body.messages,
            negatifreviews:req.body.negatifreviews,
            positifreviews:req.body.positifreviews,
            patients_id:patientId,
            therapists_id:therapistId,
        }
        const createReviewsOneTherapist = await patientsDatamapper.createReviewsOneTherapist({patientId,therapistId},review);
        res.json(createReviewsOneTherapist)
        } catch {
            next(new APIError("Erreur lors de la création d'un avis sur un therapist", 500));
        }
    },  
    /**
     * Répondre au quizz pour récupérer le quizz_id
     * @param {*} req requête Express
     * @param {*} res réponse Express
     * @returns {json} répondre au quizz pour récupérer le quizz_id
     */
    async answerPatientsQuizz(req,res,next) {
        
        try {

        const answers = {
            answer_1 : req.body.answer_1,
            answer_2 : req.body.answer_2,
            answer_3 : req.body.answer_3,
            answer_4 : req.body.answer_4,
            answer_5 : req.body.answer_5,
            answer_6 : req.body.answer_6,
            answer_7 : req.body.answer_7,
            answer_8 : req.body.answer_8,
            answer_9 : req.body.answer_9,
            answer_10 : req.body.answer_10,
            answer_11 : req.body.answer_11,
            answer_12 : req.body.answer_12,
            answer_13 : req.body.answer_13,
            answer_14 : req.body.answer_14,
            answer_15 : req.body.answer_15,
            answer_16 : req.body.answer_16,
            answer_17 : req.body.answer_17,
            answer_18 : req.body.answer_18,

        }
        const answerPatientsQuizz = await patientsDatamapper.answerPatientsQuizz(answers);
        res.json(answerPatientsQuizz)
        } catch {
             next(new APIError("Erreur lors de la réponse au quizz", 500));
        
        }
    }
     

};


module.exports = patientsController;