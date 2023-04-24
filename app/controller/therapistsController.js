
const therapistsDatamapper = require('../model/therapists')
const APIError = require("../service/error/APIError");
const debug = require("debug")("controller");

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

            if (allTherapists.length === 0)  {
                next(new APIError("La route n'a pas été trouvé",404))

            } else {
                res.json(allTherapists) 
            }   
            } catch { 
            next(new APIError("Erreur lors de la récupération des therapists",500))
        }
    },
    /**
     * Récupération d'un therapist par son id
     * @param {therapists_id}req requête Express
     * @param {*}res réponse Express
     * @returns {json} un therapist
     */
    async getById(req,res,next) {
        const id = req.params.id

        if (!id) {
            next(new APIError("Paramètres manquants",400));
            return;
        }

        try {
            const getTherapistById = await therapistsDatamapper.findByPk(id);
        
            if (getTherapistById.length === 0) {
                next(new APIError("La route n'a pas été trouvé",404));
            } else {
                res.json(getTherapistById)  
            }

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
    async creatTherapist (req,res,next) {
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
        if (!therapistInfo) {
            next(new APIError("Paramètres manquants",400));
            return;
        }
        try {
            const creatTherapist = await therapistsDatamapper.create(therapistInfo);
        
            if (creatTherapist.length === 0) {
                next(new APIError("La route n'a pas été trouvé",404))
            } else {
                res.json(creatTherapist)
            }
            } catch {
                next(new APIError("Erreur lors de la création d'un therapists",500))
                }
    },
    /**
     * Mise à jour d'un therapist
     * @param {therapists_id}req requête Express
     * @param {*}res réponse Express
     * @returns {json} le therapist mis à jour
     */
    async updateTherapist (req,res,next) {
        const id = req.params.id

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

        if (!id) {
            next(new APIError("Paramètres manquants",400));
            return;
        }

        if (!therapistInfo) {
            next(new APIError("Paramètres manquants",400));
            return;
        }
        
        try {
            const updateTherapist = await therapistsDatamapper.update({id},therapistInfo)
        
            if (updateTherapist.length === 0) {
                next(new APIError("La route n'a pas été trouvé",404));

            } else {
                res.json(updateTherapist)
            }
            } catch {
            next(new APIError("Erreur lors de la récupération d'un therapists",500))
            }
        
    },
    /**
     * Suppression d'un therapists
     * @param {therapist_id}req requête Express
     * @param {*}res réponse Express
     * @returns {json} le therapists supprimé
     */
    async deleteTherapist (req,res,next) { 
        const id = req.params.id

        if (!id) {
            next(new APIError("Paramètres manquants",400));
            return;
        }

        try {
            const deleteTherapist = await therapistsDatamapper.delete(id)
        
            if (deleteTherapist.length === 0) {
                next(new APIError("La route n'a pas été trouvé",404))  

            } else {
                res.json(deleteTherapist)
            }
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
    async findTherapistsWithSpecialties (req,res,next) {
        const id = req.params.id

        if (!id) {
            next(new APIError("Paramètres manquants",400));
            return;
        }

        try {
            const findTherapistsWithSpecialties = await therapistsDatamapper.findTherapistsWithSpecialties(id);
        
            if (findTherapistsWithSpecialties.length === 0) {
                next(new APIError("La route n'a pas été trouvé",404))

            } else {
            res.json(findTherapistsWithSpecialties)
            }
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
    async findAllTherapistsWithSpecialities (_,res,next) {
        try {
            const findAllTherapistsWithSpecialities = await therapistsDatamapper.AllTherapistsWithSpecialities();
        
            if (findAllTherapistsWithSpecialities.length === 0) {
                next(new APIError("La route n'a pas été trouvé",404))
                
            } else {
                res.json(findAllTherapistsWithSpecialities)
            }
            } catch {
                next(new APIError("Erreur lors de la récupération de tout les therapists avec leurs spécialités",500))
            }
    },
    /**
     * Ajouter une spécialité à un thérapist
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} Ajouter une spécialité à un thérapist
     */
    async addSpecialtiesToTherapist (req,res,next) {
        const therapistId = req.params.therapistId
        const specialityId = req.params.specialityId
        
        if(!therapistId || !specialityId) {
            next(new APIError("Paramètres manquants",400));
            return;
        }

        try {
            const addSpecialtiesToTherapist = await therapistsDatamapper.addSpecialtiesToTherapist(therapistId, specialityId);
        
            if (addSpecialtiesToTherapist.length === 0) {
                next(new APIError("La route n'a pas été trouvé",404))
                
            } else {
                res.json(addSpecialtiesToTherapist)
            }
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
    async removeSpecialtiesFromTherapist (req,res,next) {
        const therapistId = req.params.therapistId
        const specialityId = req.params.specialityId

        if(!therapistId || !specialityId) {
            next(new APIError("Paramètres manquants",400));
            return;
        }

        try {
            const removeSpecialtiesToTherapist = await therapistsDatamapper.removeSpecialtiesFromTherapist(therapistId, specialityId);
        
            if (removeSpecialtiesToTherapist.length === 0) {
                next(new APIError("La route n'a pas été trouvé",404))

            } else {
                res.json(removeSpecialtiesToTherapist)
            }
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
    async getAllTherapistsByGenderWithSpecialities (req,res,next) {
        const gender = req.params.gender

        if (!gender) {
            next(new APIError("Paramètres manquants",400));
            return;
        }

        try {
            const getAllTherapistsByGenderWithSpe = await therapistsDatamapper.getAllTherapistsByGenderWithSpecialities(gender);
        
            if (getAllTherapistsByGenderWithSpe.length === 0) {
                next(new APIError("La route n'a pas été trouvé",404));
                
            }else {
                res.json(getAllTherapistsByGenderWithSpe)
            }
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
    async getAllTherapistsByGender (req,res,next) {
        const gender = req.params.gender

        if (!gender) {
            next(new APIError("Paramètres manquants",400));
            return;
        }

        try {
            const getAllTherapistsByGender = await therapistsDatamapper.getAllTherapistsByGender(gender);
        
            if (getAllTherapistsByGender.length === 0) {
                next(new APIError("La route n'a pas été trouvé",404));
                
            } else {
                res.json(getAllTherapistsByGender)
            }
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
    async getAllAppointmentOfATherapist (req,res,next) {
        const id = req.params.id;

        if (!id) {
            next(new APIError("Paramètres manquants",400));
            return;
        }

        try {
            const getAllAppointmentOfATherapist = await therapistsDatamapper.getAllAppointmentOfATherapist(id);
        
            if (getAllAppointmentOfATherapist.length === 0) {
                next(new APIError("La route n'a pas été trouvé",404));

            } else {
                res.json(getAllAppointmentOfATherapist)
                
            }
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
    async getOneAppointmentOfATherapist (req,res,next) {
        const therapistId = req.params.therapistId
        const appointmentId = req.params.appointmentId

        if (!therapistId || !appointmentId) {
            next(new APIError("Paramètres manquants",400));
            return;
        }

        try {
            const getOneAppointmentOfATherapist = await therapistsDatamapper.getOneAppointmentOfATherapist(therapistId,appointmentId);
        
            if (getOneAppointmentOfATherapist.length === 0) {
                next(new APIError("La route n'a pas été trouvé",404));

            }else{
                res.json(getOneAppointmentOfATherapist)

            }
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
    async creatAppointmentWithOnePatient (req,res,next) {
        const therapistId = req.params.therapistId
        const patientId= req.params.patientId

        if (!therapistId || !patientId) {
            next(new APIError("Paramètres manquants",400));
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
        
        if (!appointment) {
            next(new APIError("Paramètres manquants",400));
            return;
        }

        try {
            const createAppointmentOneTherapist = await therapistsDatamapper.creatAppointmentWithOnePatient({therapistId,patientId},appointment);
        
            if (createAppointmentOneTherapist.length === 0) {
                next(new APIError("La route n'a pas été trouvé",404))
                
            } else {
                res.json(createAppointmentOneTherapist);

            }
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
    async viewOneTherapistReviews(req,res,next) {
        const id = req.params.id

        if (!id) {
            next(new APIError("Paramètres manquants",400));
            return;
        }

        try {
            const viewOneTherapistReviews = await therapistsDatamapper.viewOneTherapistReviews(id)
        
            if (viewOneTherapistReviews.length === 0) {
                next(new APIError("La route n'a pas été trouvé",404))

            } else {
                res.json(viewOneTherapistReviews)
                
            }
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
    async findAllTherapistBySpecialties (req,res,next) {
        const id = req.params.id

        if (!id) {
            next(new APIError("Paramètres manquants",400));
            return;
        }
        try {
            const findAllTherapistBySpecialties = await therapistsDatamapper.findAllTherapistBySpecialties(id)
        
            if(findAllTherapistBySpecialties.length === 0) {
                next(new APIError("La route n'a pas été trouvé",404))
                
            }else {
                res.json(findAllTherapistBySpecialties)          
            }
            } catch {
                next(new APIError("Erreur lors de la récupération de tous les therapists par leurs spécialités",500))
            }
    },
    
}

module.exports = therapistsController;