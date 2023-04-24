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
    async getAll(_,res,next){
        try {
        const allQuizz = await quizzDatamapper.findAll();
        
        if (allQuizz.length === 0) {
            next(new APIError("Aucun quizz trouvé", 404));

        } else{
            res.json(allQuizz)
        }
        }catch {
                next(new APIError("Erreur lors de la récupération des quizz", 500));
        }
    },
    /**
     * Récupérer un quizz par son id
     * @param {*} req requête Express
     * @param {*} res réponse Express
     * @returns {JSON} un quizz
     */
    async getById(req,res,next){
        const id = req.params.id

        if (!id) {
            next(new APIError("Paramètres manquants", 400));
            return;
        }
        try {
            const oneQuizzById= await quizzDatamapper.findByPk(id);
            
            if (oneQuizzById.length === 0) {
                next(new APIError("Aucun quizz trouvé", 404));
            } else {
                res.json(oneQuizzById)
            }
            } catch {
                next(new APIError("Erreur lors de la récupération du quizz", 500));
            }
    },

    
};

module.exports = quizzController;
