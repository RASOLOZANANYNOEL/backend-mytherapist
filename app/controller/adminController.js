const specialtiesDatamapper = require('../model/specialties')
const therapistsDatamapper = require('../model/therapists')
const patientsDatamapper = require('../model/patients')
const appointmentsDatamapper = require('../model/appointments')
const APIError = require("../service/error/APIError");
const debug = require("debug")("controller");

const adminController = {
    /**
     * Récupérer tous les spécialités
     * @param {*} _ requête express
     * @param {*} res réponse express
     * @returns {JSON} liste des spécialités
     */
    async getAllSpecialties(_,res) {
        try {
        const allSpecialties = await specialtiesDatamapper.findAll();
        res.json(allSpecialties)
        } catch {
            next(new APIError("Erreur lors de la récupération des spécialités", 500))
        };

    },
    /**
     * Récupérer tous les thérapeutes
     * @param {*} _ requête express
     * @param {*} res réponse express
     * @returns {JSON} liste des thérapeutes
     */
    async getAllTherapists(_,res) {
        try{
        const allTherapists = await therapistsDatamapper.findAll();
        res.json(allTherapists)
        } catch {
            next(new APIError("Erreur lors de la récupération des thérapeutes", 500))
        }
    },
    /**
     * Récupérer tous les rendez-vous
     * @param {*} _ requête express
     * @param {*} res réponse express
     * @returns {JSON} liste des rendez-vous
     */
    async getAllAppointments(_,res) {
        try {
        const allAppointments = await appointmentsDatamapper.getAllAppointments();
        res.json(allAppointments)
        } catch {
            next(new APIError("Erreur lors de la récupération des rendez-vous", 500))
        }
    },
    /**
     * Récupérer une spécialité
     * @param {*} req requête express
     * @param {*} res réponse express
     * @returns {JSON} spécialité
     */
    async getOneSpecialties(req,res) {
        const id = req.params.id
        try {
        const getOneSpecialties = await specialtiesDatamapper.findByPk(id);
        res.json(getOneSpecialties)
        } catch {
            next(new APIError("Erreur lors de la récupération de la spécialité", 500))
        }
    },
    /**
     * Récupérer un thérapeute
     * @param {*} req requête express
     * @param {*} res réponse express
     * @returns {JSON} une thérapeute
     */
    async getOneTherapists(req,res) {
        const id = req.params.id
        try {
        const getOneTherapists = await therapistsDatamapper.findByPk(id);
        res.json(getOneTherapists)
        } catch {
            next(new APIError("Erreur lors de la récupération du thérapeute", 500))
        }
    },
    /**
     * Récupérer un rendez-vous
     * @param {*} req requête express
     * @param {*} res réponse express
     * @returns {JSON} un rendez-vous
     */
    async getOneAppointments(req,res) {
        const id = req.params.id
        try {
        const getOneAppointments = await appointmentsDatamapper.getAllAppointmentOfATherapist(id);
        res.json(getOneAppointments)
        } catch {
            next(new APIError("Erreur lors de la récupération du rendez-vous", 500))
        }
    },
    /**
     * Récupérer tous les patients
     * @param {*} _ requête express
     * @param {*} res réponse express
     * @returns {JSON} liste des patients
     */
    async getAllPatients(_,res){
        try {
        const allPatients= await patientsDatamapper.findAll();
        res.json(allPatients);
    } catch {
        next(new APIError("Erreur lors de la récupération des patients", 500))
    }
    },
    /**
     * Récupérer un patient
     * @param {*} req requête express
     * @param {*} res réponse express
     * @returns {JSON} un patient
     */
    async getOnePatients(req,res){
       
         const id = req.params.id
        try {
        const getonePatients = await patientsDatamapper.findByPk(id);
        res.json(getonePatients)
        } catch {
            next(new APIError("Erreur lors de la récupération d'un patient", 500))
        }
    },
    /**
     * 
     * @param {*} req requête express
     * @param {*} res réponse express
     * @return {JSON} un patient
     */
    async updateOnePatients(req,res){
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
        try {
        const updateOnePatients = await patientsDatamapper.update({id},patientsInfo);
        res.json(updateOnePatients);
        } catch {
            next(new APIError("Erreur lors de la récupération de la mise a jours des informations d'un patient", 500))
        }
    },

    async deleteOnePatients(req,res){
        const id = req.params.id
        try {
        const deleteOnePatients = await patientsDatamapper.delete(id);
        res.json(deleteOnePatients);
        } catch {
            next(new APIError("Erreur lors de la récupération de la suppresion d'un patient", 500))
        }
    }


}



module.exports = adminController;
