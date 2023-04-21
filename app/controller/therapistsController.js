

const therapistsDatamapper = require('../model/therapists')
const APIError = require("../service/error/APIError");
const debug = require("debug")("controller:therapists");

const therapistsController = {
    /**
     * Récupération de tous les therapists
     * @param {*}_ requête Express
     * @param {*} res réponse Express
     * @returns {json} liste des therapists
     */
    async getAll(_,res,next) {
        try {
            const allTherapists = await therapistsDatamapper.findAll();
            res.json(allTherapists)
        } catch { 
            next(new APIError("Erreur lors de la récupération des therapists",500))
        }
    },
    /**
     * Récupération d'un therapist par son id
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} un therapist
     */
    async getById(req,res) {
        const id = req.params.id
        try {
        const getTherapistById = await therapistsDatamapper.findByPk(id);
        res.json(getTherapistById)
    } catch {
        next(new APIError("Erreur lors de la récupération d'un therapists",500))
    }
    },
    /**
     * Création d'un therapist
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} le therapist créé
     */
    async creatTherapist (req,res) {
        try {
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
    } catch {
        next(new APIError("Erreur lors de la création d'un therapists",500))
        }
    },
    /**
     * Mise à jour d'un therapist
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} le therapist mis à jour
     */
    async updateTherapist (req,res) {
        const id = req.params.id
        try {
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
        } catch {
            next(new APIError("Erreur lors de la mise à jour d'un therapists",500))
        }
    },
    /**
     * Suppression d'un therapists
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} le therapists supprimé
     */
    async deleteTherapist (req,res) { 
        const id = req.params.id
        try {
        const deleteTherapist = await therapistsDatamapper.delete(id)
        res.json(deleteTherapist)
        } catch {
            next(new APIError("Erreur lors de la suppression d'un therapists",500))
        }
    },
    /**
     * Récupération de tous les therapists avec leurs spécialités
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} liste des therapists avec leurs spécialités
     */
    async findTherapistsWithSpecialties (req,res) {
        const id = req.params.id
        try {
        const findTherapistsWithSpecialties = await therapistsDatamapper.findTherapistsWithSpecialties(id);
        res.json(findTherapistsWithSpecialties)
        } catch {
            next(new APIError("Erreur lors de la récupération des therapists avec leurs spécialités",500))
        }
    },
    /**
     * Récupération de tous les therapists avec leurs spécialités
     * @param {*}_ requête Express  
     * @param {*}res réponse Express
     * @returns {json} liste des therapists avec leurs spécialités
     */
    async findAllTherapistsWithSpecialities (_,res) {
        try {
        const findAllTherapistsWithSpecialities = await therapistsDatamapper.AllTherapistsWithSpecialities();
        res.json(findAllTherapistsWithSpecialities)
        } catch {
            next(new APIError("Erreur lors de la récupération des therapists avec leurs spécialités",500))
        }
    },
    /**
     * Ajouter une spécialité à un thérapist
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} Ajouter une spécialité à un thérapist
     */
    async addSpecialtiesToTherapist (req,res) {
        const therapistId = req.params.therapistId
        const specialityId = req.params.specialityId
        try {
        const addSpecialtiesToTherapist = await therapistsDatamapper.addSpecialtiesToTherapist(therapistId, specialityId);
        res.json(addSpecialtiesToTherapist)
        } catch {
            next(new APIError("Erreur lors de l'ajout d'une spécialité à un thérapeute",500))
        }
    },
    /**
     * Supprimer une spécialité à un thérapist
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} Supprimer une spécialité à un thérapist
     */
    async removeSpecialtiesFromTherapist (req,res) {
        const therapistId = req.params.therapistId
        const specialityId = req.params.specialityId
        try {
        const removeSpecialtiesToTherapist = await therapistsDatamapper.removeSpecialtiesFromTherapist(therapistId, specialityId);
        res.json(removeSpecialtiesToTherapist)
        } catch {
        next(new APIError("Erreur lors de la suppression d'une spécialité à un thérapeute",500))
        }
    },
    /**
     * Récupération de tous les therapists par leurs genres et avec leurs spécialités
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} liste des therapists avec leurs genres et leurs spécialités
     */
    async getAllTherapistsByGenderWithSpecialities (req,res) {
        const gender = req.params.gender
        try {
        const getAllTherapistsByGender = await therapistsDatamapper.getAllTherapistsByGenderWithSpecialities(gender);
        res.json(getAllTherapistsByGender)
        } catch {
            next(new APIError("Erreur lors de la récupération des therapists par leurs genres et avec leurs spécialités",500))
        }
    },
    /**
     * Récupération de tous les therapists par leurs genres
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} liste des therapists avec leurs genres
     */
    async getAllTherapistsByGender (req,res) {
        const gender = req.params.gender
        try {
        const getAllTherapistsByGender = await therapistsDatamapper.getAllTherapistsByGender(gender);
        res.json(getAllTherapistsByGender)
        } catch {
            next(new APIError("Erreur lors de la récupération des therapists par leurs genres",500))
        }
    },
    /**
     * Récupération de tous les rendez-vous d'un therapist
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} liste des rendez-vous d'un therapist
     */
    async getAllAppointmentOfATherapist (req,res) {
        const id = req.params.id;
        try {
        const getAllAppointmentOfATherapist = await therapistsDatamapper.getAllAppointmentOfATherapist(id);
        res.json(getAllAppointmentOfATherapist)
        } catch {
            next(new APIError("Erreur lors de la récupération des rendez-vous d'un therapist",500))
        }
    },
    /**
     * Récupération d'un rendez-vous d'un therapist
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} un rendez-vous d'un therapist
     */
    async getOneAppointmentOfATherapist (req,res) {
        const therapistId = req.params.therapistId
        const appointmentId = req.params.appointmentId
        try {
        const getOneAppointmentOfATherapist = await therapistsDatamapper.getOneAppointmentOfATherapist(therapistId,appointmentId);
        res.json(getOneAppointmentOfATherapist)
        } catch {
            next(new APIError("Erreur lors de la récupération d'un rendez-vous d'un therapist",500))
        }
    },
    /**
     * Créer rendez-vous d'un therapist avec un patient
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} création de rendez-vous d'un therapist avec un patient
     */
    async creatAppointmentWithOnePatient (req,res) {
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
        
        const createAppointmentOneTherapist = await therapistsDatamapper.creatAppointmentWithOnePatient({therapistId,patientId},appointment);
        res.json(createAppointmentOneTherapist);
        } catch {
        next(new APIError("Erreur lors de la création d'un rendez-vous d'un therapist avec un patient",500))
        }
    },
    /**
     * Récupérer d'un avis sur un therapist 
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} un avis sur un therapist
     */
    async viewOneTherapistReviews(req,res) {
        const id = req.params.id
        try {
        const viewOneTherapistReviews = await therapistsDatamapper.viewOneTherapistReviews(id)
        res.json(viewOneTherapistReviews)
        } catch {
            next(new APIError("Erreur lors de la récupération d'un avis sur un therapist",500))
        }
    },
    /**
     * Récupérer tous les therapists par leurs spécialités
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} tous les therapists par leurs spécialités
     */
    async findAllTherapistBySpecialties (req,res) {
        const id = req.params.id
        try {
        findAllTherapistBySpecialties = await therapistsDatamapper.findAllTherapistBySpecialties(id)
        res.json(findAllTherapistBySpecialties)
        } catch {
            next(new APIError("Erreur lors de la récupération de tous les therapists par leurs spécialités",500))
        }
    },
    
}

module.exports = therapistsController;