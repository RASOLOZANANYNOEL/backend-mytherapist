const therapistsDatamapper = require('../model/therapists')
const APIError = require("../service/error/APIError");
const bcrypt = require('bcrypt');
const fs = require('fs')

const therapistsController = {
    /**
     * get all therapists
     * @param {*}_ request Express
     * @param {*} res response Express
     * @returns {json} Get all therapists
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
     * Get one therapist by id
     * @param {therapists_id}req request Express
     * @param {*}res response Express
     * @returns {json} Get one therapist by id
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
     * Create a therapist
     * @param {*}req request Express
     * @param {*}res response Express
     * @returns {json} Create a therapist
     */
    async creatTherapist(req, res, next) {

        /**
         * retrieve body data
         */
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
             * Make sure the adelinumber number is 9 digits
             */
            if (adelinumber.length !== 9) {
                return res.status(400).json({
                    error: "Le numéro adeli doit être composé de 9 chiffres"
                });
            }
            /**
             * Check that the gender is well informed
             */
            if (!gender) {
                return res.status(400).json({
                    error: "Merci de renseigner votre sexe"
                });
            }
            /**
             * Make sure the phone number is 10 digits
             */
            if (phonenumber.length !== 10) {
                return res.status(400).json({
                    error: "Le numéro de téléphone doit être composé de 10 chiffres"
                });
            }
            /**
             * Check that all fields are filled in
             */
            if (!email || !lastname || !firstname || !phonenumber || !adelinumber || !streetname || !zipcode || !city || !gender || !password) {
                return res.status(400).json({
                    error: "Veuillez renseigner tous les champs"
                });
            }

            /**
             * Check if the user exists with the email address
             */
            const existingUserWithSameEmail = await therapistsDatamapper.findByEmail(email);
            if (existingUserWithSameEmail) {
                return res.status(400).json({
                    error: "Cet email est déjà utilisé"
                });
            }
            /**
             * Check if the user exists with the phone number
             */
            const existingUserWithSamePhoneNumber = await therapistsDatamapper.findByPhonenumber(phonenumber);
            if (existingUserWithSamePhoneNumber) {
                return res.status(400).json({
                    error: "Cet numero de téléphone est déjà utilisé"
                });
            }

            /**
             * Check if the user exists with the adelinumber 
             */
            const existingUserWithSameAdeliNumber = await therapistsDatamapper.findByAdelinumber(adelinumber);
            if (existingUserWithSameAdeliNumber) {
                return res.status(400).json({
                    error: "Cet numero adeli est déjà utilisé"
                });
            }

            /**
             * Encrypt password
             */
            const passwordCrypted = await bcrypt.hash(password, 10);

            /**
             * add therapist in database
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
     * update a therapist
     * @param {therapists_id}req request Express
     * @param {*}res response Express
     * @returns {json} update a therapist
     */
    async updateTherapist(req, res, next) {
        const id = req.params.id

        // update profilpicture
        let base64String = req.body.profilpicture;
        // Remove header
        let base64Image = base64String.split(';base64,');
        const fileType = base64Image[0].split('/').pop();

        const findPatient = await therapistsDatamapper.findByPk(id);
        //check a image already exists
        if (findPatient.profilpicture) {
            const imagePath = `public/images/therapists/${req.body.firstname}.${fileType}`
            //Delete old image
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`L'image précédente a été supprimée ${imagePath}`)
                }
            })
        }
        // Create the path for the image using the therapist's first name and file type
        const imagePath = `public/images/therapists/${req.body.firstname}.${fileType}`;
        // Write the image as a file to the server using fs.writeFile()
        fs.writeFile(imagePath, base64Image[1], {
            encoding: 'base64'
        }, function (err) {
            console.log('File created');
        });
        /**
         * retrieve body data
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
         * Encrypt password
         */
        const passwordCrypted = await bcrypt.hash(password, 10);

        /**
         * add therapist in database
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
         * Make sure the adelinumber is 09 digits
         */
        if (therapistInfo.adelinumber.length !== 9) {
            return res.status(400).json({
                error: "Le numéro adeli doit être composé de 9 chiffres"
            });
        }
        /**
         * check that the gender is well informed
         */
        if (!therapistInfo.gender) {
            return res.status(400).json({
                error: "Merci de renseigner votre sexe"
            });
        }
        /**
         * Check that all fields are filled in
         */
        if (!therapistInfo.email || !therapistInfo.lastname || !therapistInfo.firstname || !therapistInfo.phonenumber || !therapistInfo.adelinumber || !therapistInfo.streetname || !therapistInfo.zipcode || !therapistInfo.city || !therapistInfo.gender || !therapistInfo.password) {
            return res.status(400).json({
                error: "Veuillez renseigner tous les champs"
            });
        }
        /**
         * Make sure the phone number is 10 digits
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
     * delete a therapist
     * @param {therapist_id}req request Express
     * @param {*}res response Express
     * @returns {json} delete a therapist
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
     * Recovery of all therapists with their specialties
     * @param {*}req request Express
     * @param {*}res response Express
     * @returns {json} recovery of all therapists with their specialties
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
     * get all therapists with their specialties
     * @param {*}_ request Express  
     * @param {*}res response Express
     * @returns {json} list of all therapists with their specialties
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
     * Add a specialty to a therapist
     * @param {*}req requestExpress
     * @param {*}res response Express
     * @returns {json} Add a specialty to a therapist
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
     * Remove a specialty from a therapist
     * @param {*}req request Express
     * @param {*}res response Express
     * @returns {json} Remove a specialty from a therapist
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
     * get all therapists by their genres and with their specialties
     * @param {*}req request Express
     * @param {*}res response Express
     * @returns {json} list of therapists with their genres and specialties
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
     * Fetching all therapists by their genders
     * @param {*}req request Express
     * @param {*}res response Express
     * @returns {json} list of therapists with their genders
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
     * get all appointments of a therapist
     * @param {*}req request Express
     * @param {*}res response Express
     * @returns {json} list of therapist appointments
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
     * Picking up a therapist appointment
     * @param {*}req request Express
     * @param {*}res response Express
     * @returns {json} an appointment with a therapist
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
     * Create appointment of a therapist with a patient
     * @param {*}req request Express
     * @param {*}res response Express
     * @returns {json} creation of an appointment for a therapist with a patient
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
     * get a review of a therapist 
     * @param {*}req request Express
     * @param {*}res respons Express
     * @returns {json} a review of a therapist
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
     * Collect all therapists by their specialties
     * @param {*}req request Express
     * @param {*}res respons Express
     * @returns {json} List of all therapists by their specialties
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