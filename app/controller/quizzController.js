const quizzDatamapper = require('../model/quizz');
const { getById } = require('./patientsController');
const APIError = require("../service/error/APIError");
const debug = require("debug")("controller");


const quizzController = {
    /** 
     * Récupérer tous les quizz
     * @param {*} _ requête Express
     * @param {*} res réponse Express
     * @returns {JSON} liste des quizz
     */
    async getAll(_,res){
        try {
        const allQuizz = await quizzDatamapper.findAll();
        res.json(allQuizz)
        } catch {
            next(new APIError("Erreur lors de la récupération des quizz", 500));
        }
    },
    /**
     * Récupérer un quizz par son id
     * @param {*} req requête Express
     * @param {*} res réponse Express
     * @returns {JSON} un quizz
     */
    async getById(req,res){
        const id = req.params.id
        try {
        const oneQuizzById= await quizzDatamapper.findByPk(id);
        res.json(oneQuizzById)
        } catch {
            next(new APIError("Erreur lors de la récupération du quizz", 500));
        }
    },

    
};

module.exports = quizzController;
