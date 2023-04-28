const therapistsDatamapper = require('../model/therapists')
const APIError = require("../service/error/APIError");
const debug = require("debug")("controller");
const bcrypt = require('bcrypt');
const fs = require('fs')

const therapistsController = {
    /**
     * Récupération de tous les therapists
     * @param {*}_ requête Express
     * @param {*} res réponse Express
     * @returns {json} liste des therapists
     */
    async getAll(_, res, next) {

        try {
            const allTherapists = await therapistsDatamapper.findAll();

            if (allTherapists.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404))

            } else {
                res.json(allTherapists)
            }
        } catch {
            next(new APIError("Erreur lors de la récupération des therapists", 500))
        }
    },
    /**
     * Récupération d'un therapist par son id
     * @param {therapists_id}req requête Express
     * @param {*}res réponse Express
     * @returns {json} un therapist
     */
    async getById(req, res, next) {
        const id = req.params.id

        if (!id) {
            next(new APIError("Paramètres manquants", 400));
            return;
        }

        try {
            const getTherapistById = await therapistsDatamapper.findByPk(id);

            if (getTherapistById.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));
            } else {
                res.json(getTherapistById)
            }

        } catch {
            next(new APIError("Erreur lors de la récupération d'un therapists", 500))
        }
    },
    /**
     * Création d'un therapist
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} le therapist créé
     */
    async creatTherapist(req, res, next) {

        // récupérer les données du body
        const {
            email,
            lastname,
            firstname,
            password,
            phonenumber,
            adelinumber,
            streetname,
            zipcode,
            city,
            gender,
        } = req.body;

        try {
            /**
             * Vérifier que le numéro adeli est composé de 9 chiffres
             */
            if (adelinumber.length !== 9) {
                return res.status(400).json({
                    error: "Le numéro adeli doit être composé de 9 chiffres"
                });
            }
            /**
             * Vérifier que le genre est bien renseigné
             */
            if (!gender) {
                return res.status(400).json({
                    error: "Merci de renseigner votre sexe"
                });
            }
            /**
             * Vérifier que le numéro de téléphone est composé de 10 chiffres
             */
            if (phonenumber.length !== 10) {
                return res.status(400).json({
                    error: "Le numéro de téléphone doit être composé de 10 chiffres"
                });
            }
            /**
             * Vérifier que tous les champs sont remplis
             */
            if (!email || !lastname || !firstname || !phonenumber || !adelinumber || !streetname || !zipcode || !city || !gender || !password) {
                return res.status(400).json({
                    error: "Veuillez renseigner tous les champs"
                });
            }

            /**
             * Vérifier si l'user existe avec l'adresse mail
             */
            const existingUserWithSameEmail = await therapistsDatamapper.findByEmail(email);
            if (existingUserWithSameEmail) {
                return res.status(400).json({
                    error: "Cet email est déjà utilisé"
                });
            }
            /**
             * Vérifier si l'user existe avec le numero de téléphone
             */
            const existingUserWithSamePhoneNumber = await therapistsDatamapper.findByPhonenumber(phonenumber);
            if (existingUserWithSamePhoneNumber) {
                return res.status(400).json({
                    error: "Cet numero de téléphone est déjà utilisé"
                });
            }

            /**
             * Vérifier si l'user existe avec le numero adeli
             */
            const existingUserWithSameAdeliNumber = await therapistsDatamapper.findByAdelinumber(adelinumber);
            if (existingUserWithSameAdeliNumber) {
                return res.status(400).json({
                    error: "Cet numero adeli est déjà utilisé"
                });
            }

            /**
             * Crypter le mot de passe
             */
            const passwordCrypted = await bcrypt.hash(password, 10);

            /**
             * ajouter le therapist en bdd
             */
            const therapistInfo = {
                email,
                lastname,
                firstname,
                password: passwordCrypted,
                phonenumber,
                adelinumber,
                streetname,
                zipcode,
                city,
                gender,
                role: 'therapist'
            }
            const createTherapist = await therapistsDatamapper.create(therapistInfo);
            return res.status(201).json(createTherapist)
        } catch (err) {
            // next(new APIError("Erreur lors de la création d'un therapists", 500))
            res.status(500).send({
                message: "Erreur lors de la création d'un therapists",
                err
            })
        }
    },
    /**
     * Mise à jour d'un therapist
     * @param {therapists_id}req requête Express
     * @param {*}res réponse Express
     * @returns {json} le therapist mis à jour
     */
    async updateTherapist(req, res, next) {
        const id = req.params.id

        // update profilpicture
        let base64String = req.body.profilpicture;
        // Remove header
        let base64Image = base64String.split(';base64,');
        const fileType = base64Image[0].split('/').pop();

        const findPatient = await therapistsDatamapper.findByPk(id);
        //vérifier si l'image existe
        if (findPatient.profilpicture) {
            const imagePath = `public/images/therapists/${req.body.firstname}.${fileType}`
            //Supprimer l'ancienne image
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`L'image précédente a été supprimée ${imagePath}`)
                }
            })
        }

        const imagePath = `public/images/therapists/${req.body.firstname}.${fileType}`;
        fs.writeFile(imagePath, base64Image[1], {
            encoding: 'base64'
        }, function (err) {
            console.log('File created');
        });
        /**
         * Récupérer les données du body
         */
        const {
            email,
            lastname,
            firstname,
            password,
            confirmPassword,
            phonenumber,
            adelinumber,
            streetname,
            zipcode,
            city,
            gender,
          } = req.body;
         /**
             * Crypter le mot de passe
             */
         const passwordCrypted = await bcrypt.hash(password, 10);

        /**
        * ajouter le therapist en bdd
        */
        const therapistInfo = {
            firstname,
            lastname,
            password: passwordCrypted,
            adelinumber,
            phonenumber,
            profilpicture: imagePath,
            streetname,
            zipcode,
            email,
            city,
            gender
        
        }

        /**
         * Vérifier que le numéro adeli est composé de 9 chiffres
         */
        if (therapistInfo.adelinumber.length !== 9) {
            return res.status(400).json({
                error: "Le numéro adeli doit être composé de 9 chiffres"
            });
        }
        /**
         * Vérifier que le genre est bien renseigné
         */
        if (!therapistInfo.gender) {
            return res.status(400).json({
                error: "Merci de renseigner votre sexe"
            });
        }
        /**
         * Vérifier que tous les champs sont remplis
         */
        if (!therapistInfo.email || !therapistInfo.lastname || !therapistInfo.firstname || !therapistInfo.phonenumber || !therapistInfo.adelinumber || !therapistInfo.streetname || !therapistInfo.zipcode || !therapistInfo.city || !therapistInfo.gender || !therapistInfo.password) {
            return res.status(400).json({
                error: "Veuillez renseigner tous les champs"
            });
        }
        /**
         * Vérifier que le numéro de téléphone est composé de 10 chiffres
         */
        if (therapistInfo.phonenumber.length !== 10) {
            return res.status(400).json({
                error: "Le numéro de téléphone doit être composé de 10 chiffres"
            });
        }
        
        try {
            const updateTherapist = await therapistsDatamapper.update({
                id
            }, therapistInfo)

            if (updateTherapist.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));

            } else {
                res.json(updateTherapist)
            }
        } catch {
            next(new APIError("Erreur lors de la récupération d'un therapists", 500))
        }

    },
    /**
     * Suppression d'un therapists
     * @param {therapist_id}req requête Express
     * @param {*}res réponse Express
     * @returns {json} le therapists supprimé
     */
    async deleteTherapist(req, res, next) {
        const id = req.params.id

        if (!id) {
            next(new APIError("Paramètres manquants", 400));
            return;
        }

        try {
            const deleteTherapist = await therapistsDatamapper.delete(id)

            if (deleteTherapist.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404))

            } else {
                res.json(deleteTherapist)
            }
        } catch {
            next(new APIError("Erreur lors de la suppression d'un therapists", 500))
        }

    },
    /**
     * Récupération de tous les therapists avec leurs spécialités
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} liste des therapists avec leurs spécialités
     */
    async findTherapistsWithSpecialties(req, res, next) {
        const id = req.params.id

        if (!id) {
            next(new APIError("Paramètres manquants", 400));
            return;
        }

        try {
            const findTherapistsWithSpecialties = await therapistsDatamapper.findTherapistsWithSpecialties(id);

            if (findTherapistsWithSpecialties.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404))

            } else {
                res.json(findTherapistsWithSpecialties)
            }
        } catch {
            next(new APIError("Erreur lors de la récupération des therapists avec leurs spécialités", 500))
        }
    },
    /**
     * Récupération de tous les therapists avec leurs spécialités
     * @param {*}_ requête Express  
     * @param {*}res réponse Express
     * @returns {json} liste des therapists avec leurs spécialités
     */
    async findAllTherapistsWithSpecialities(_, res, next) {
        try {
            const findAllTherapistsWithSpecialities = await therapistsDatamapper.AllTherapistsWithSpecialities();

            if (findAllTherapistsWithSpecialities.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404))

            } else {
                res.json(findAllTherapistsWithSpecialities)
            }
        } catch {
            next(new APIError("Erreur lors de la récupération de tout les therapists avec leurs spécialités", 500))
        }
    },
    /**
     * Ajouter une spécialité à un thérapist
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} Ajouter une spécialité à un thérapist
     */
    async addSpecialtiesToTherapist(req, res, next) {
        const therapistId = req.params.therapistId
        const specialityId = req.params.specialityId

        if (!therapistId || !specialityId) {
            next(new APIError("Paramètres manquants", 400));
            return;
        }

        try {
            const addSpecialtiesToTherapist = await therapistsDatamapper.addSpecialtiesToTherapist(therapistId, specialityId);

            if (addSpecialtiesToTherapist.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404))

            } else {
                res.json(addSpecialtiesToTherapist)
            }
        } catch {
            next(new APIError("Erreur lors de l'ajout d'une spécialité à un thérapeute", 500))
        }
    },
    /**
     * Supprimer une spécialité à un thérapist
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} Supprimer une spécialité à un thérapist
     */
    async removeSpecialtiesFromTherapist(req, res, next) {
        const therapistId = req.params.therapistId
        const specialityId = req.params.specialityId

        if (!therapistId || !specialityId) {
            next(new APIError("Paramètres manquants", 400));
            return;
        }

        try {
            const removeSpecialtiesToTherapist = await therapistsDatamapper.removeSpecialtiesFromTherapist(therapistId, specialityId);

            if (removeSpecialtiesToTherapist.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404))

            } else {
                res.json(removeSpecialtiesToTherapist)
            }
        } catch {
            next(new APIError("Erreur lors de la suppression d'une spécialité à un thérapeute", 500))
        }
    },
    /**
     * Récupération de tous les therapists par leurs genres et avec leurs spécialités
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} liste des therapists avec leurs genres et leurs spécialités
     */
    async getAllTherapistsByGenderWithSpecialities(req, res, next) {
        const gender = req.params.gender

        if (!gender) {
            next(new APIError("Paramètres manquants", 400));
            return;
        }

        try {
            const getAllTherapistsByGenderWithSpe = await therapistsDatamapper.getAllTherapistsByGenderWithSpecialities(gender);

            if (getAllTherapistsByGenderWithSpe.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));

            } else {
                res.json(getAllTherapistsByGenderWithSpe)
            }
        } catch {
            next(new APIError("Erreur lors de la récupération des therapists par leurs genres et avec leurs spécialités", 500))
        }
    },
    /**
     * Récupération de tous les therapists par leurs genres
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} liste des therapists avec leurs genres
     */
    async getAllTherapistsByGender(req, res, next) {
        const gender = req.params.gender

        if (!gender) {
            next(new APIError("Paramètres manquants", 400));
            return;
        }

        try {
            const getAllTherapistsByGender = await therapistsDatamapper.getAllTherapistsByGender(gender);

            if (getAllTherapistsByGender.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));

            } else {
                res.json(getAllTherapistsByGender)
            }
        } catch {
            next(new APIError("Erreur lors de la récupération des therapists par leurs genres", 500))
        }
    },
    /**
     * Récupération de tous les rendez-vous d'un therapist
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} liste des rendez-vous d'un therapist
     */
    async getAllAppointmentOfATherapist(req, res, next) {
        const id = req.params.id;

        if (!id) {
            next(new APIError("Paramètres manquants", 400));
            return;
        }

        try {
            const getAllAppointmentOfATherapist = await therapistsDatamapper.getAllAppointmentOfATherapist(id);

            if (getAllAppointmentOfATherapist.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));

            } else {
                res.json(getAllAppointmentOfATherapist)

            }
        } catch {
            next(new APIError("Erreur lors de la récupération des rendez-vous d'un therapist", 500))
        }
    },
    /**
     * Récupération d'un rendez-vous d'un therapist
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} un rendez-vous d'un therapist
     */
    async getOneAppointmentOfATherapist(req, res, next) {
        const therapistId = req.params.therapistId
        const appointmentId = req.params.appointmentId

        if (!therapistId || !appointmentId) {
            next(new APIError("Paramètres manquants", 400));
            return;
        }

        try {
            const getOneAppointmentOfATherapist = await therapistsDatamapper.getOneAppointmentOfATherapist(therapistId, appointmentId);

            if (getOneAppointmentOfATherapist.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));

            } else {
                res.json(getOneAppointmentOfATherapist)

            }
        } catch {
            next(new APIError("Erreur lors de la récupération d'un rendez-vous d'un therapist", 500))
        }
    },
    /**
     * Créer rendez-vous d'un therapist avec un patient
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} création de rendez-vous d'un therapist avec un patient
     */
    async creatAppointmentWithOnePatient(req, res, next) {
        const therapistId = req.params.therapistId
        const patientId = req.params.patientId

        if (!therapistId || !patientId) {
            next(new APIError("Paramètres manquants", 400));
            return;
        }

        const appointment = {
            beginninghour: req.body.beginninghour,
            endtime: req.body.endtime,
            patients_id: patientId,
            therapists_id: therapistId,
            videosession: req.body.videosession,
            audiosession: req.body.audiosession,
            chatsession: req.body.chatsession,
            sessionatoffice: req.body.sessionatoffice,
        }
        
        try {
            const createAppointmentOneTherapist = await therapistsDatamapper.creatAppointmentWithOnePatient({
                therapistId,
                patientId
            }, appointment);

            if (createAppointmentOneTherapist.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404))

            } else {
                res.json(createAppointmentOneTherapist);

            }
        } catch {
            next(new APIError("Erreur lors de la création d'un rendez-vous d'un therapist avec un patient", 500))
        }
    },
    /**
     * Récupérer d'un avis sur un therapist 
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} un avis sur un therapist
     */
    async viewOneTherapistReviews(req, res, next) {
        const id = req.params.id

        if (!id) {
            next(new APIError("Paramètres manquants", 400));
            return;
        }

        try {
            const viewOneTherapistReviews = await therapistsDatamapper.viewOneTherapistReviews(id)

            if (viewOneTherapistReviews.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404))

            } else {
                res.json(viewOneTherapistReviews)

            }
        } catch {
            next(new APIError("Erreur lors de la récupération d'un avis sur un therapist", 500))
        }
    },
    /**
     * Récupérer tous les therapists par leurs spécialités
     * @param {*}req requête Express
     * @param {*}res réponse Express
     * @returns {json} tous les therapists par leurs spécialités
     */
    async findAllTherapistBySpecialties(req, res, next) {
        const id = req.params.id

        if (!id) {
            next(new APIError("Paramètres manquants", 400));
            return;
        }
        try {
            const findAllTherapistBySpecialties = await therapistsDatamapper.findAllTherapistBySpecialties(id)

            if (findAllTherapistBySpecialties.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404))

            } else {
                res.json(findAllTherapistBySpecialties)
            }
        } catch {
            next(new APIError("Erreur lors de la récupération de tous les therapists par leurs spécialités", 500))
        }
    },

}

module.exports = therapistsController;