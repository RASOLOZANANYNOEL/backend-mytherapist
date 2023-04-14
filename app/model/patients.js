const CoreDatamapper = require('./CoreDatamapper');
const client = require('../db/pg');

class Patients extends CoreDatamapper {
    tableName = 'patients';

    async getOnePatientWithAllAppointments(id){
        const preparedQuery ={
            text: `SELECT p.email, p.lastname,p.firstname, p.phonenumber,p.profilpicture, p.streetname,p.zipcode,p.city,p.complement ,a.id AS appointmentId,t.id AS therapistId,t.firstname AS therapistFirstname,
            t.lastname AS therapistName,a.beginninghour AS appointmentBegin, a.endtime AS appointmentEnd
            FROM patients p
            JOIN appointments a ON p.id = patients_id
            JOIN therapists t ON t.id = therapists_id
            WHERE p.id = $1`,
            values: [id],
        }
        const result =await this.client.query(preparedQuery);
        return result.rows;
    }

    async getOnePatientWithQuizz (id){
        const preparedQuery = {
            text: `SELECT p.email, p.lastname,p.firstname, p.phonenumber,p.profilpicture, p.streetname,p.zipcode,p.city,p.complement, p.quizz_id ,
            q.quizz_1, q.answer_1, q.quizz_2, q.answer_2,q.quizz_3, q.answer_3,q.quizz_4, q.answer_4,q.quizz_5, q.answer_5,q.quizz_6, q.answer_6,q.quizz_7, q.answer_7,
            q.quizz_8, q.answer_8,q.quizz_9, q.answer_9,q.quizz_10, q.answer_10,q.quizz_11, q.answer_11,q.quizz_12, q.answer_12,q.quizz_13, q.answer_13,
            q.quizz_14, q.answer_14,q.quizz_15, q.answer_15,q.quizz_16, q.answer_16,q.quizz_17, q.answer_17,q.quizz_18, q.answer_18
            FROM patients p
            JOIN quizz q ON q.id = quizz_id
            WHERE p.id = $1`,
            values: [id]
        }
        const result = await this.client.query(preparedQuery);
        return result.rows;
    }

    async getReviewsOneTherapists(id){
        const preparedQuery = {
           text: `SELECT p.lastname,p.firstname,p.profilpicture, t.id AS therapistId,t.firstname AS therapistFirstname,
           t.lastname AS therapistName, r.negatifreviews , r.positifreviews, r.messages
           FROM patients p
           JOIN reviews r  ON r.id = patients_id
           JOIN therapists t ON t.id = therapists_id
           WHERE t.id = $1` ,
           values: [id]
        }
        const result =await this.client.query(preparedQuery);
        return result.rows;
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
        const result = await this.client.query(preparedQuery);
        return result.rows;
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
        const result = await this.client.query(preparedQuery);
        return result.rows;
    } 

    async answerPatientsQuizz (answers){
        const preparedQuery = {
            text: `INSERT INTO quizz
            (quizz_1, answer_1,
            quizz_2, answer_2,
            quizz_3, answer_3,
            quizz_4, answer_4,
            quizz_5, answer_5,
            quizz_6, answer_6,
            quizz_7, answer_7,
            quizz_8, answer_8,
            quizz_9, answer_9,
            quizz_10, answer_10,
            quizz_11, answer_11,
            quizz_12, answer_12,
            quizz_13, answer_13,
            quizz_14, answer_14,
            quizz_15, answer_15,
            quizz_16, answer_16,
            quizz_17, answer_17,
            quizz_18, answer_18)
            VALUES(
                'Vous-êtes un particulier ?',$1,
                'Souhaitez-vous faire intervenir un praticiens dans votre entreprise ?',$2,
                'Souhaitez-vous prendre rendez-vous pour vous ?',$3,
                'Souhaitez-vous prendre rendez-vous pour un de vos proches ?',$4,
                'Souhaitez-vous prendre rendez-vous pour un ou plusieurs de vos enfants ?',$5,
                'Avez-vous des problématiques à régler dans votre couple ?',$6,
                'Sur quoi souhaitez-vous travailler, sur un Accident ?',$7,
                'Sur quoi souhaitez-vous travailler, sur une Agression ?',$8,
                'Sur quoi souhaitez-vous travailler, sur un Deuil ?',$9,
                'Sur quoi souhaitez-vous travailler, sur une Phobie ?',$10,
                'Sur quoi souhaitez-vous travailler, sur une Anxiété ?',$11,
                'Sur quoi souhaitez-vous travailler, sur une Depression ?',$12,
                'Sur quoi souhaitez-vous travailler, sur une Solitude ?',$13,
                'Sur quoi souhaitez-vous travailler, sur une Confiance/Estime de soi ?',$14,
                'Sur quoi souhaitez-vous travailler, sur une Addictions ?',$15,
                'Sur quoi souhaitez-vous travailler, sur une Evalution/Bilan psychologique et/ou test psychométriques ?',$16,
                'Sur quoi souhaitez-vous travailler, sur une Vie profesionnel ?',$17,
                'Préférez-vous un praticien Femme ou Homme ? ',$18
               
            )RETURNING id;`,
            values :[
                answers.answer_1,answers.answer_2,
                answers.answer_3,answers.answer_4,
                answers.answer_5,answers.answer_6,
                answers.answer_7,answers.answer_8,
                answers.answer_9,answers.answer_10,
                answers.answer_11,answers.answer_12,
                answers.answer_13,answers.answer_14,
                answers.answer_15,answers.answer_16,
                answers.answer_17,answers.answer_18,
            ],
        }
        const result = await this.client.query(preparedQuery);
        return result.rows;
    }
}

module.exports = new Patients(client);