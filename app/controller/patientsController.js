
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
                
            if (allPatients.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));
            } else {
                res.json(allPatients);  
            }
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
            
            if (onePatientsById.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));

            } else {
                res.json(onePatientsById)
            }
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

        if (!patientsInfo){
            next(new APIError("Paramètres manquants", 400));
        }
        try {
            const createPatients = await patientsDatamapper.create(patientsInfo);
            if (createPatients.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));
            } else {
                res.json(createPatients)
            }
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
        
        if (!id){
            next(new APIError("Paramètres manquants", 400));
        }

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
        
        if (!patientsInfo){
            next(new APIError("Paramètres manquants", 400));
        }
        
        try {
            const updatePatients = await patientsDatamapper.update({id},patientsInfo);
            
            if (updatePatients.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));
            } else {
                res.json(updatePatients)
            }
            } catch (err){
                next(new APIError("Erreur lors de la mise à jour du patient", 500));
                console.log(err)
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

        if (!id){
            next(new APIError("Paramètres manquants", 400));
            return;
        }
        try {
            const deletePatients = await patientsDatamapper.delete(id);
            
        if (deletePatients.length === 0) {
            next(new APIError("La route n'a pas été trouvé", 404));

        } else {
            res.json(deletePatients)
        }
        }catch {
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

        if (!id){
            next(new APIError("Paramètres manquants", 400));
            return;
        }

        try {
            const getOnePatientsWithAllAppointments = await patientsDatamapper.getOnePatientWithAllAppointments(id);
            
            if (getOnePatientsWithAllAppointments.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));

            } else {
                res.json(getOnePatientsWithAllAppointments)
            }
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

        if (!id){
            next(new APIError("Paramètres manquants", 400));
            return;
        }

        try {
            const getOnePatientWithQuizz = await patientsDatamapper.getOnePatientWithQuizz(id);
            
            if (getOnePatientWithQuizz.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));

            } else {
                res.json(getOnePatientWithQuizz)
            }
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

        if (!id){
            next(new APIError("Paramètres manquants", 400));
            return;
        }
        try {
            const getReviewsOneTherapists = await patientsDatamapper.getReviewsOneTherapists(id);
            
            if (getReviewsOneTherapists.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));

            }else {
                res.json(getReviewsOneTherapists)
            }
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
        
        if (!therapistId){
            next(new APIError("Paramètres manquants", 400));
            return;
        }
         if (!patientId){
            next(new APIError("Paramètres manquants", 400));
            return;
        }

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

        if (!appointment){
            next(new APIError("Paramètres manquants", 400));
            return;
        }
        try {
            const createAppointmentOneTherapist = await patientsDatamapper.createAppointmentOneTherapist({therapistId,patientId},appointment);
            
            if (createAppointmentOneTherapist.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));

            } else {
                res.json(createAppointmentOneTherapist)
            }
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
        
        if (!patientId){
            next(new APIError("Paramètres manquants", 400));
            return;
        }

        if (!therapistId){
            next(new APIError("Paramètres manquants", 400));
            return;
        }
        
        const review = {
            messages: req.body.messages,
            negatifreviews:req.body.negatifreviews,
            positifreviews:req.body.positifreviews,
            patients_id:patientId,
            therapists_id:therapistId,
        }

        if (!review){
            next(new APIError("Paramètres manquants", 400));
            return;
        }
        try {
            const createReviewsOneTherapist = await patientsDatamapper.createReviewsOneTherapist({patientId,therapistId},review);
            
            if (createReviewsOneTherapist.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));

            }else {
                res.json(createReviewsOneTherapist)
            }
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
        
            const answers = {
           
            answer_1 : req.body.answer_1,
            answer_2 : req.body.answer_2,
            answer_3 : req.body.answer_3,
            answer_4 : req.body.answer_4

        }

        if (!answers){
            next(new APIError("Paramètres manquants", 400));
            return;
        }

        // try {
            const answerPatientsQuizz = await patientsDatamapper.answerPatientsQuizz(answers);
            res.json(answerPatientsQuizz)
           /*  if (answerPatientsQuizz.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));
            }else {
                res.json(answerPatientsQuizz)
            }
            } catch {
                next(new APIError("Erreur lors de la réponse au quizz", 500));
            
            } */
    }
     

};


module.exports = patientsController;