const specialtiesDatamapper = require('../model/specialties')
const APIError = require("../service/error/APIError");
const debug = require("debug")("controller");


const specialtiesController = {
    /**
     * Get all specialties
     * @param {*} _ request express
     * @param {*} res response express
     * @returns {JSON} get all specialties
     */
    async getAll(_, res, next) {
        try {
            const allSpecialties = await specialtiesDatamapper.findAll();

            if (allSpecialties.length === 0) {
                next(new APIError("Aucune spécialité n'a été trouvée", 404))

            } else {
                res.json(allSpecialties)
            }
        } catch {
            next(new APIError("Erreur lors de la récupération des spécialités", 500))
        }
    },
    /**
     * Get one specialty by id
     * @param {*} req request express
     * @param {*} res response express
     * @returns {JSON} get one specialty by id
     */
    async getById(req, res, next) {
        const id = req.params.id

        if (!id) {
            next(new APIError("Paramètres manquants", 400))
        }
        try {
            const getSpecialtyById = await specialtiesDatamapper.findByPk(id);

            if (getSpecialtyById.length === 0) {
                next(new APIError("Aucune spécialité n'a été trouvée", 404))

            } else {
                res.json(getSpecialtyById)
            }
        } catch {
            next(new APIError("Erreur lors de la récupération de la spécialité", 500))
        }
    },

}

module.exports = specialtiesController;