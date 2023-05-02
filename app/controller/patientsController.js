const patientsDatamapper = require('../model/patients');
const APIError = require("../service/error/APIError");
const bcrypt = require('bcrypt');
const fs = require('fs')


const patientsController = {
    /**
     * Get all patients
     * @param {*}_ request Express
     * @param {*} res response Express
     * @returns {json} liste of patients
     */
    async getAll(_, res, next) {
        try {
            const allPatients = await patientsDatamapper.findAll();

            if (allPatients.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));
            } else {
                res.json(allPatients);
            }
        } catch {
            next(new APIError("Erreur lors de la récupération des patients", 500));
        }
    },

    /**
     * Get one patient by his id
     * @param {*}req request Express
     * @param {*} res respons Express
     * @returns {json} one patient
     */
    async getById(req, res, next) {
        const id = req.params.id
        try {
            const onePatientsById = await patientsDatamapper.findByPk(id);

            if (onePatientsById.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));

            } else {
                res.json(onePatientsById)
            }
        } catch {
            next(new APIError("Erreur lors de la récupération du patient", 500));
        }
    },

    //in the patientsInfo there will be quizz_id
    //and the quiz id will be retrieved either via the body
    /**
     * Creation of a patient outside the authentication system
     * @param {*} req request Express
     * @param {*} res respons Express
     * @returns {json} creat a patient 
     */
    async createPatients(req, res, next) {

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
            streetname,
            zipcode,
            city,
            quizz_id,
        } = req.body;


        try {
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
            if (!email || !lastname || !firstname || !phonenumber || !streetname || !zipcode || !city || !confirmPassword || !password) {
                return res.status(400).json({
                    error: "Veuillez renseigner tous les champs"
                });
            }

            /**
             * Check if the user exists with the email address
             */
            const existingUserWithSameEmail = await patientsDatamapper.findByEmail(email);
            if (existingUserWithSameEmail) {
                return res.status(400).json({
                    error: "Cet email est déjà utilisé"
                });
            }

            /**
             * Check that the two passwords are identical
             */
            if (password !== confirmPassword) {
                return res.status(400).json({
                    error: "Les mots de passe ne sont pas identiques"
                });
            }

            /**
             * Encrypt password
             */
            const passwordCrypted = await bcrypt.hash(password, 10);
            /**
             * add the patient in db
             */
            const patientsInfo = {
                email,
                lastname,
                firstname,
                password: passwordCrypted,
                phonenumber,
                profilpicture: 'public/images/profil-default.png',
                streetname,
                zipcode,
                city,
                quizz_id,
                role: 'patient'
            }

            const createPatients = await patientsDatamapper.create(patientsInfo);
            if (createPatients.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));
            } else {
                res.json(createPatients)
            }
        } catch {
            next(new APIError("Erreur lors de la création du patient", 500));
        }
    },

    /**
     * Update a patient
     * @param {*} req request Express
     * @param {*} res respos Express
     * @returns {json} Update a patient
     */
    async updatePatients(req, res, next) {
        const id = req.params.id

        if (!id) {
            next(new APIError("Paramètres manquants", 400));
        }

        // update profilpicture
        let base64String = req.body.profilpicture;
        // Remove header
        let base64Image = base64String.split(';base64,');
        const fileType = base64Image[0].split('/').pop();

        const findPatient = await patientsDatamapper.findByPk(id);
        //check a image already exists
        if (findPatient.profilpicture) {
            const imagePath = `public/images/Patients profile picture/${req.body.firstname}.${fileType}`
            //Delete old image
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`L'image précédent a été supprimée ${imagePath}`)
                }
            })
        }
        // Create the path for the image using the patient's first name and file type
        const imagePath = `public/images/Patients profile picture/${req.body.firstname}.${fileType}`;
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
            streetname,
            zipcode,
            city,
            quizz_id,
        } = req.body;
        /**
         * Encrypt password
         */
        const passwordCrypted = await bcrypt.hash(password, 10);

        /**
         * add the patient in db
         */
        const patientsInfo = {
            email,
            lastname,
            firstname,
            password: passwordCrypted,
            phonenumber,
            profilpicture: imagePath,
            streetname,
            zipcode,
            city,
            quizz_id,
            role
        }
    
        /**
         * Make sure the phone number is 10 digits
         */
        if (patientsInfo.phonenumber.length !== 10) {
            return res.status(400).json({
                error: "Le numéro de téléphone doit être composé de 10 chiffres"
            });
        }
        /**
         * Check that all fields are filled in
         */
        if (!patientsInfo.email || !patientsInfo.lastname || !patientsInfo.firstname || !patientsInfo.phonenumber || !patientsInfo.streetname || !patientsInfo.zipcode || !patientsInfo.city || !patientsInfo.password) {
            return res.status(400).json({
                error: "Veuillez renseigner tous les champs"
            });
        }

        try {
            const updatePatients = await patientsDatamapper.update({
                id
            }, patientsInfo);
            if (updatePatients.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));
            } else {
                res.json(updatePatients)
            }
        } catch (err) {
            next(new APIError("Erreur lors de la mise à jour du patient", 500));
            console.log(err)
        }
    },
    /**
     * Delete a patient
     * @param {*} req request Express
     * @param {*} res response Express
     * @returns {json} Delete a patient
     */
    async deletePatients(req, res, next) {
        const id = req.params.id

        if (!id) {
            next(new APIError("Paramètres manquants", 400));
            return;
        }
        try {
            const deletePatients = await patientsDatamapper.delete(id);

            if (deletePatients.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));

            } else {
                res.json(deletePatients)
            }
        } catch {
            next(new APIError("Erreur lors de la suppression du patient", 500));
        }
    },
    /**
     * Retrieving a patient with their appointments
     * @param {*} req request Express
     * @param {*} res response Express
     * @returns {json} Retrieving a patient with their appointments
     */
    async getOnePatientWithAllAppointments(req, res, next) {
        const id = req.params.id

        if (!id) {
            next(new APIError("Paramètres manquants", 400));
            return;
        }

        try {
            const getOnePatientsWithAllAppointments = await patientsDatamapper.getOnePatientWithAllAppointments(id);

            if (getOnePatientsWithAllAppointments.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));

            } else {
                res.json(getOnePatientsWithAllAppointments)
            }
        } catch {
            next(new APIError("Erreur lors de la récupération du patient avec ses rendez-vous", 500));
        }
    },
    /**
     *  Recovery of a patient with his quizzes
     * @param {*} req request Express
     * @param {*} res response Express
     * @returns {json} Recovery of a patient with his quizzes
     */
    async getOnePatientWithQuizz(req, res, next) {
        const id = req.params.id

        if (!id) {
            next(new APIError("Paramètres manquants", 400));
            return;
        }

        try {
            const getOnePatientWithQuizz = await patientsDatamapper.getOnePatientWithQuizz(id);

            if (getOnePatientWithQuizz.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));

            } else {
                res.json(getOnePatientWithQuizz)
            }
        } catch {
            next(new APIError("Erreur lors de la récupération du patient avec ses quizz", 500));
        }
    },
    /**
     * Retrieving the opinion of patients on a therapist
     * @param {*} req request Express
     * @param {*} res response Express
     * @returns {json} Retrieving the opinion of patients on a therapist
     */
    async getReviewsOneTherapists(req, res, next) {
        const id = req.params.id

        if (!id) {
            next(new APIError("Paramètres manquants", 400));
            return;
        }
        try {
            const getReviewsOneTherapists = await patientsDatamapper.getReviewsOneTherapists(id);

            if (getReviewsOneTherapists.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));

            } else {
                res.json(getReviewsOneTherapists)
            }
        } catch {
            next(new APIError("Erreur lors de la récupération des avis des patients sur un therapist", 500));
        }
    },
    /**
     * créate a new appointment between a patient and a therapist
     * @param {*} req request Express
     * @param {*} res response Express
     * @returns {json} créate a new appointment between a patient and a therapist
     */
    async createAppointmentOneTherapist(req, res, next) {

        const therapistId = req.params.therapistId
        const patientId = req.params.patientId

        if (!therapistId) {
            next(new APIError("Paramètres manquants", 400));
            return;
        }
        if (!patientId) {
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
            const createAppointmentOneTherapist = await patientsDatamapper.createAppointmentOneTherapist({
                therapistId,
                patientId
            }, appointment);

            if (createAppointmentOneTherapist.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));

            } else {
                res.json(createAppointmentOneTherapist)
            }
        } catch {
            next(new APIError("Erreur lors de la création du rendez-vous entre un patient et un therapist", 500));
        }
    },
    /**
     * créate a review on a therapist
     * @param {*} req request Express
     * @param {*} res response Express
     * @returns {json} create a review on a therapist
     */
    async createReviewsOneTherapist(req, res, next) {
        const patientId = req.params.patientId
        const therapistId = req.params.therapistId

        if (!patientId) {
            next(new APIError("Paramètres manquants", 400));
            return;
        }

        if (!therapistId) {
            next(new APIError("Paramètres manquants", 400));
            return;
        }

        const review = {
            messages: req.body.messages,
            negatifreviews: req.body.negatifreviews,
            positifreviews: req.body.positifreviews,
            patients_id: patientId,
            therapists_id: therapistId,
        }

        try {
            const createReviewsOneTherapist = await patientsDatamapper.createReviewsOneTherapist({
                patientId,
                therapistId
            }, review);

            if (createReviewsOneTherapist.length === 0) {
                next(new APIError("La route n'a pas été trouvé", 404));

            } else {
                res.json(createReviewsOneTherapist)
            }
        } catch {
            next(new APIError("Erreur lors de la création d'un avis sur un therapist", 500));
        }
    },
    /**
     * answer the quizz to get quizz_id
     * @param {*} req request Express
     * @param {*} res response Express
     * @returns {json} answer the quizz to get quizz_id
     */
    async answerPatientsQuizz(req, res, next) {

        const answers = {

            answer_1: req.body.answer_1,
            answer_2: req.body.answer_2,
            answer_3: req.body.answer_3,
            answer_4: req.body.answer_4

        }
    
        try {
        const answerPatientsQuizz = await patientsDatamapper.answerPatientsQuizz(answers);
        
        if (answerPatientsQuizz.length === 0) {
             next(new APIError("La route n'a pas été trouvé", 404));
         }else {
             res.json(answerPatientsQuizz)
         }
         } catch {
             next(new APIError("Erreur lors de la réponse au quizz", 500));
         
         } 
    }


};


module.exports = patientsController;