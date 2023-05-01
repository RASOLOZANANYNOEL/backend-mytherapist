const quizzDatamapper = require('../model/quizz');
const { getById } = require('./patientsController');
const APIError = require("../service/error/APIError");
const debug = require("debug")("controller");


const quizzController = {
    /** 
     * Get all quizz
     * @param {*} _ request Express
     * @param {*} res response Express
     * @returns {JSON} get all quizz
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
     * get one quizz by id
     * @param {*} req request Express
     * @param {*} res response Express
     * @returns {JSON} get one quizz by id
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
