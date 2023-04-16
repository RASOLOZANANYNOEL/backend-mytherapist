const { getOnePatientWithQuizz, getReviewsOneTherapist, createAppointmentOneTherapist, createReviewsOneTherapist } = require('../model/patients');
const patientsDatamapper= require('../model/patients');

const patientsController = {
    async getAll(_,res) {
        const allPatients= await patientsDatamapper.findAll();
        res.json(allPatients);
    },

    async getById(req,res) {
        const id = req.params.id
        const onePatientsById = await patientsDatamapper.findByPk(id);
        res.json(onePatientsById);
    },
    // dans le patientsInfo il y aura quizz_id
    //et le quizz id sera recupéré soit via le body ou params
    async createPatients(req,res) {
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
        const createPatients = await patientsDatamapper.create(patientsInfo);
        res.json(createPatients)

    },

    async updatePatients(req,res){
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
        const updatePatients = await patientsDatamapper.update({id},patientsInfo);
        res.json(updatePatients);
    },

    async deletePatients(req,res){
        const id = req.params.id
        const deletePatients = await patientsDatamapper.delete(id);
        res.json(deletePatients);
    },

    async getOnePatientWithAllAppointments (req,res) {
        const id = req.params.id
        const getOnePatientsWithAllAppointments = await patientsDatamapper.getOnePatientWithAllAppointments(id);
        res.json(getOnePatientsWithAllAppointments);
    },

    async getOnePatientWithQuizz (req,res) {
        const id= req.params.id
        const getOnePatientWithQuizz = await patientsDatamapper.getOnePatientWithQuizz(id);
        res.json(getOnePatientWithQuizz);
    },

    async getReviewsOneTherapists (req,res){
        const id= req.params.id
        const getReviewsOneTherapists = await patientsDatamapper.getReviewsOneTherapists(id);
        res.json(getReviewsOneTherapists);
    },

    async createAppointmentOneTherapist (req,res) {
        const therapistId = req.params.therapistId
        const patientId= req.params.patientId
        
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
        res.json(createAppointmentOneTherapist);
    },

    async createReviewsOneTherapist (req,res){
        const patientId= req.params.patientId
        const therapistId = req.params.therapistId
        
        const review = {
            messages: req.body.messages,
            negatifreviews:req.body.negatifreviews,
            positifreviews:req.body.positifreviews,
            patients_id:patientId,
            therapists_id:therapistId,
        }
        const createReviewsOneTherapist = await patientsDatamapper.createReviewsOneTherapist({patientId,therapistId},review);
        res.json(createReviewsOneTherapist);
    },
    // TODO Il faut que quiz_id dans la table patients soit en NOT NULL AUTOGENERATE, suite a ca , il faut une route qui permet de trouver l'id du quiz enfonction du patient id 
    // 1. une fois profil patient crée on va chercher son tout ses information via son ID/ou quizz_id SELECT * FROM patients p JOIN quizz q ON q.id = quizz_id WHERE q.id = 10
    // 2. une fois quizz i_d trouver il faut mettre a jour les reponses via une route en PUT 

    // le bon raisonnement : 
    //en realité il faut que le quizz soit crée avant le patient ou en meme temps, sinon erreur , la route quon a crée retourne l'id du quizz, cette id sera stocké niveau front
    //cette id la sera nessesaire pour la création complet du profil du patient lors de l'inscription car pour associer le quizz a un patient il faut l'id
    // donc il faut modifié la route permetant de crée un patient de facon dynamique afin de recuperer l'id du quizz (req.params.quizzId) ou via req.body mais req.params semble le mieux (pour le moment)
    //quizz_id en not null 
    //voir controller createPatients pour la suite du raisonnement
    async answerPatientsQuizz(req,res) {
        
        const patientId= req.params.patientId

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
        const answerPatientsQuizz = await patientsDatamapper.answerPatientsQuizz({patientId}, answers);
        res.json(answerPatientsQuizz);
        console.log(answerPatientsQuizz);
    }
     

};


module.exports = patientsController;