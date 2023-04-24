const CoreDatamapper = require('./CoreDatamapper');
const client = require('../db/pg');
const debug = require("debug")("datamapper");
const errorModule = require("../service/error/errorHandling");

class Appointments extends CoreDatamapper {
    tableName = 'appointments';

    async getAllAppointmentOfATherapist(id) {
        const preparedQuery = {
            text: `SELECT a.beginninghour, a.endtime, a.patients_id, t.videosession, t.audiosession, t.chatsession, t.sessionatoffice, t.email AS therapist_email, t.lastname AS therapist_lastname, t.firstname AS therapist_firstname, t.phonenumber AS therapist_phonenumber, p.profilpicture AS patient_profilepicture, t.streetname AS therapist_adress, t.zipcode AS therapist_zipcode, t.city AS therapist_city, t.complement AS therapist_adresscomplement, p.email AS patient_email, p.phonenumber AS patient_phonenumber, p.lastname AS patient_lastname, p.firstname AS patient_firstname,a.id AS appointment_id  FROM appointments a
            JOIN therapists t ON t.id = a.therapists_id
            JOIN patients p ON p.id = a.patients_id
            WHERE t.id = $1`,
            values: [id],
        
        };
        try {
        const result = await this.client.query(preparedQuery);

        return result.rows;
        } catch (err){
            await errorModule.log(err,"Base de donnée");
        }
    }

    async getAllAppointments() {
        const preparedQuery = {
            text: `SELECT a.beginninghour, a.endtime, a.patients_id, t.videosession, t.audiosession, t.chatsession, t.sessionatoffice, t.email AS therapist_email, t.lastname AS therapist_lastname, t.firstname AS therapist_firstname, t.phonenumber AS therapist_phonenumber, p.profilpicture AS patient_profilepicture, t.streetname AS therapist_adress, t.zipcode AS therapist_zipcode, t.city AS therapist_city, t.complement AS therapist_adresscomplement, p.email AS patient_email, p.phonenumber AS patient_phonenumber, p.lastname AS patient_lastname, p.firstname AS patient_firstname,a.id AS appointment_id  FROM appointments a
            JOIN therapists t ON t.id = a.therapists_id
            JOIN patients p ON p.id = a.patients_id`,
            
        
        };
        try {
        const result = await this.client.query(preparedQuery);

        return result.rows;
        } catch (err) {
            await errorModule.log(err,"Base de donnée");
        }
    }

    
}


module.exports = new Appointments(client);