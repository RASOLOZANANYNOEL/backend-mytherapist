const specialtiesDatamapper = require('../model/specialties')
const APIError = require("../service/error/APIError");
const debug = require("debug")("controller");


const specialtiesController = {
    /**
     * Récupérer toutes les spécialités
     * @param {*} _ requête express
     * @param {*} res réponse express
     * @returns {JSON} liste des spécialités
     */
    async getAll(_,res) {
        try {
        const allSpecialties = await specialtiesDatamapper.findAll();
        res.json(allSpecialties)
        } catch {
            next(new APIError("Erreur lors de la récupération des spécialités", 500))
        }
    },
    /**
     * Récupérer une spécialité par son id
     * @param {*} req requête express
     * @param {*} res réponse express
     * @returns {JSON} une spécialité
     */
    async getById(req,res) {
        const id = req.params.id
        try {
        const getSpecialtyById = await specialtiesDatamapper.findByPk(id);
        res.json(getSpecialtyById)
    } catch {
        next(new APIError("Erreur lors de la récupération de la spécialité", 500))
    }
    },

}

module.exports = specialtiesController;