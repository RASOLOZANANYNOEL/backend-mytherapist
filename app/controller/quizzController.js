const quizzDatamapper = require('../model/quizz');
const { getById } = require('./patientsController');

const quizzController = {
    async getAll(_,res){
        const allQuizz = await quizzDatamapper.findAll();
        res.json(allQuizz);
    },

    async getById(req,res){
        const id = req.params.id
        const oneQuizzById= await quizzDatamapper.findByPk(id);
        res.json(oneQuizzById);
    },

    
};

module.exports = quizzController;
