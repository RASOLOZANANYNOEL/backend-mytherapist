const CoreDatamapper = require('./CoreDatamapper');
const client = require('../db/pg');
const debug = require("debug")("model");
const errorModule = require("../service/error/errorHandling");

class Patients extends CoreDatamapper {
    tableName = 'patients';
    /**
     * permet de récupérer un patient avec son id
     * @param {number} id
     */
    async getOnePatientWithAllAppointments(id){
        const preparedQuery ={
            text: `SELECT p.id, p.email, p.lastname,p.firstname, p.phonenumber,p.profilpicture, p.streetname,p.zipcode,p.city,p.complement ,a.id AS appointmentId,t.id AS therapistId,t.firstname AS therapistFirstname,
            t.lastname AS therapistName,a.beginninghour AS appointmentBegin, a.endtime AS appointmentEnd
            FROM patients p
            JOIN appointments a ON p.id = patients_id
            JOIN therapists t ON t.id = therapists_id
            WHERE p.id = $1`,
            values: [id],
        }
        try {
        const result =await this.client.query(preparedQuery);
        return result.rows
        } catch (err) {
            await errorModule.log(err,"Base de données");
        }
    }
    /**
     * permet de récupérer un patient avec son email
     * @param {string} email
     */
    async findByEmail(email) {
        const preparedQuery = {
            text: `SELECT * FROM patients t WHERE t.email = $1`,
            values: [email],
        };
        try {
        const result = await this.client.query(preparedQuery);
        return result.rows[0];
        } catch (err) {
            await errorModule.log(err,"Base de données");
        }
    }
    /**
     * permet de récupérer un patient avec son quizz par son id
     * @param {number} id
     */
    async getOnePatientWithQuizz (id){
        const preparedQuery = {
            text: `SELECT p.id, p.email, p.lastname,p.firstname, p.phonenumber,p.profilpicture, p.streetname,p.zipcode,p.city,p.complement, p.quizz_id ,
            q.question_1, q.answer_1, q.question_2, q.answer_2,q.question_3, q.answer_3,q.question_4, q.answer_4
            FROM patients p
            JOIN quizz q ON q.id = quizz_id
            WHERE p.id = $1`,
            values: [id]
        }
        try {
        const result = await this.client.query(preparedQuery);
        return result.rows;
        } catch (err) {
            await errorModule.log(err,"Base de données");
        }
    }

    async getReviewsOneTherapists(id){
        const preparedQuery = {
           text: `SELECT p.id AS patients_id, p.lastname AS patients_lastname,p.firstname AS patients_firstname,p.profilpicture AS patients_profilpicture, t.id AS therapistId,t.firstname AS therapistFirstname,
           t.lastname AS therapistName, r.negatifreviews , r.positifreviews, r.messages
           FROM reviews r
           JOIN therapists t ON t.id = therapists_id
                   JOIN patients p ON p.id = patients_id
           WHERE t.id = $1` ,
           values: [id],
        }
        try {
        const result =await this.client.query(preparedQuery);
        return result.rows;
        } catch (err) {
            await errorModule.log(err,"Base de données");
        }
    }
    
    async createAppointmentOneTherapist({therapistId,patientId},appointment){
        const preparedQuery = {
            text:`INSERT INTO appointments
            (beginninghour, endtime, patients_id, therapists_id, videosession, audiosession, chatsession, sessionatoffice)
            VALUES (
                to_timestamp($1, 'DD-MM-YYYY HH24:MI')+ interval '1 hour',
                to_timestamp($2, 'DD-MM-YYYY HH24:MI')+ interval '1 hour',
                $3,
                $4,
                $5,
                $6,
                $7,
                $8
                
            )RETURNING * ;`,
        
            values : [appointment.beginninghour, appointment.endtime, 
                therapistId,patientId, appointment.videosession,
                appointment.audiosession,appointment.chatsession, appointment.sessionatoffice ],
        }
        try {
        const result = await this.client.query(preparedQuery);
        return result.rows;
        } catch (err) {
            await errorModule.log(err,"Base de données");
        }
    }

    async createReviewsOneTherapist ({patientId,therapistId},reviews){
        const preparedQuery = {
            text:`INSERT INTO reviews
            (messages, negatifreviews, positifreviews, patients_id, therapists_id)
            VALUES(
                $1,$2,$3,$4,$5
            )RETURNING *;`,

            values : [reviews.messages,reviews.negatifreviews,reviews.positifreviews,
            patientId,therapistId],
        }
        try {
        const result = await this.client.query(preparedQuery);
        return result.rows;
        } catch (err) {
            await errorModule.log(err,"Base de données");
        }
    } 

    async answerPatientsQuizz (answers){
        const preparedQuery = {
            text: `INSERT INTO quizz
            (question_1, answer_1,
            question_2, answer_2,
            question_3, answer_3,
            question_4, answer_4)
            VALUES(
                'Vous-êtes un particulier ?',$1,
                'Pour qui voulez vous prendre rendez-vous ?',$2,
                'Sur quoi voulez vous travailler ?',$3,
                'Préférez-vous un practicien homme ou femme ?',$4
                
               
            )RETURNING *;`,
            values :[
                answers.answer_1,answers.answer_2,
                answers.answer_3,answers.answer_4
            ],
        }
        try {
        const result = await this.client.query(preparedQuery);
        return result.rows;
        } catch (err) {
            await errorModule.log(err,"Base de données");
        }
    }

    async getSurveyAnswer(id){
        const preparedQuery = {
            text:`SELECT  answer_1,answer_2,answer_3,answer_4
            FROM patients p 
            JOIN quizz q ON q.id = quizz_id 
            WHERE p.id = $1`,
        
            values: [id],
        }
        try {
        const result = await this.client.query(preparedQuery);
        return result.rows;
        } catch (err) {
            await errorModule.log(err,"Base de données");
        }

    }
}

module.exports = new Patients(client);