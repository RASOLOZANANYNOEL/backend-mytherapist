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
}

module.exports = new Patients(client);