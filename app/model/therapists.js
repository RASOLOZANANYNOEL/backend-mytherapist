const CoreDatamapper = require('./CoreDatamapper');
const client = require('../db/pg');

class Therapists extends CoreDatamapper {
    tableName = 'therapists';

    
    async findTherapistsWithSpecialities(id) {
        const preparedQuery = {
            text: `SELECT t.lastname, t.firstname, s.label, t.gender FROM therapists t
            JOIN therapists_own_specialties ts ON ts.therapists_id = t.id
			JOIN specialties s ON s.id = ts.specialties_id 
            WHERE t.id = $1`,
            values: [id],
        };

        const result = await this.client.query(preparedQuery);

        return result.rows;
    }

    async findByEmail(email) {
        const preparedQuery = {
            text: `SELECT * FROM therapists t WHERE t.email = $1`,
            values: [email],
        };

        const result = await this.client.query(preparedQuery);

        return result.rows[0];
    }
    
    async AllTherapistsWithSpecialities() {
        const preparedQuery = {
            text: `SELECT t.lastname, t.firstname, s.label, t.id FROM therapists t
            JOIN therapists_own_specialties ts ON ts.therapists_id = t.id
			JOIN specialties s ON s.id = ts.specialties_id`,
        };

        try {
            const result = await this.client.query(preparedQuery);
            console.log('Result:', result.rows); 
            return result.rows;
        } catch (error) {
            console.error('Error in AllTherapistsWithSpecialities:', error); 
            throw error;
        }
    }

    async addSpecialtiesToTherapist(therapistId, specialityId) {
        const preparedQuery = {
            text: `INSERT INTO therapists_own_specialties (therapists_id, specialties_id) VALUES ($1, $2) RETURNING *`,
            values: [therapistId, specialityId],
        };

        const result = await this.client.query(preparedQuery);

        return result.rows;
    }
    
    async removeSpecialtiesFromTherapist(therapistId, specialityId) {
        const preparedQuery = {
            text: `DELETE FROM therapists_own_specialties WHERE therapists_id = $1 AND specialties_id = $2 RETURNING *`,
            values: [therapistId, specialityId],
        };

        const result = await this.client.query(preparedQuery);

        return result.rows;
    }

    async getAllTherapistsByGenderWithSpecialities(gender) {
        const preparedQuery = {
            text: `SELECT t.lastname, t.firstname, s.label, t.id, t.gender FROM therapists t
            JOIN therapists_own_specialties ts ON ts.therapists_id = t.id
			JOIN specialties s ON s.id = ts.specialties_id
			WHERE gender = $1`,
            values: [gender],
        };

        const result = await this.client.query(preparedQuery);

        return result.rows;
    }

    async getAllTherapistsByGender(gender) {
        const preparedQuery = {
            text: `SELECT t.lastname, t.firstname, t.id, t.gender, t.phonenumber, t.email, t.streetname, t.city, t.complement, t.profilpresentation, t.audiosession,t.videosession, t.chatsession,t.sessionatoffice FROM therapists t
			WHERE gender = $1`,
            values: [gender],
        };

        const result = await this.client.query(preparedQuery);

        return result.rows;
    }

    async getAllAppointmentOfATherapist(id) {
        const preparedQuery = {
            text: `SELECT a.beginninghour, a.endtime, a.patients_id, t.videosession, t.audiosession, t.chatsession, t.sessionatoffice, t.email AS therapist_email, t.lastname AS therapist_lastname, t.firstname AS therapist_firstname, t.phonenumber AS therapist_phonenumber, p.profilpicture AS patient_profilepicture, t.streetname AS therapist_adress, t.zipcode AS therapist_zipcode, t.city AS therapist_city, t.complement AS therapist_adresscomplement, p.email AS patient_email, p.phonenumber AS patient_phonenumber, p.lastname AS patient_lastname, p.firstname AS patient_firstname,a.id AS appointment_id  FROM appointments a
            JOIN therapists t ON t.id = a.therapists_id
            JOIN patients p ON p.id = a.patients_id
            WHERE t.id = $1`,
            values: [id],
        
        };

        const result = await this.client.query(preparedQuery);

        return result.rows;
    }

    async getOneAppointmentOfATherapist(TherapistId, appointmentId) {
        const preparedQuery = {
            text: `SELECT a.beginninghour, a.endtime, a.patients_id, t.videosession, t.audiosession, t.chatsession, t.sessionatoffice, t.email AS therapist_email, t.lastname AS therapist_lastname, t.firstname AS therapist_firstname, t.phonenumber AS therapist_phonenumber, p.profilpicture AS patient_profilepicture, t.streetname AS therapist_adress, t.zipcode AS therapist_zipcode, t.city AS therapist_city, t.complement AS therapist_adresscomplement, p.email AS patient_email, p.phonenumber AS patient_phonenumber, p.lastname AS patient_lastname, p.firstname AS patient_firstname,a.id AS appointment_id  FROM appointments a
            JOIN therapists t ON t.id = a.therapists_id
            JOIN patients p ON p.id = a.patients_id
            WHERE t.id = $1 AND a.id = $2`,
            values: [TherapistId,appointmentId],
        
        };

        const result = await this.client.query(preparedQuery);

        return result.rows;
    }

    async creatAppointmentWithOnePatient ({patientId,therapistId},appointment){
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
                patientId,therapistId, appointment.videosession,
                appointment.audiosession,appointment.chatsession, appointment.sessionatoffice ],
        }
        const result = await this.client.query(preparedQuery);
        return result.rows;
    }

    async viewOneTherapistReviews(id) {
        const preparedQuery = {
            text:`SELECT r.messages AS patient_messages, r.negatifreviews AS badscore, r.positifreviews AS godscore, p.firstname AS patient_firstname, p.lastname AS patient_lastname, p.id AS patient_id, p.profilpicture AS patient_profilpicture, t.lastname AS therapist_lastname, t.firstname AS therapist_firstname FROM reviews r
            JOIN therapists t  ON t.id = therapists_id
            JOIN patients p ON p.id = patients_id
            WHERE t.id = $1;`,
            values : [id],
        }
        const result = await this.client.query(preparedQuery);
        return result.rows;
    }

    async findAllTherapistBySpecialties(id) {
        const preparedQuery = {
            text: `SELECT t.lastname, t.firstname, s.label, t.gender FROM therapists t
            JOIN therapists_own_specialties ts ON ts.therapists_id = t.id
			JOIN specialties s ON s.id = ts.specialties_id 
            WHERE s.id = $1`,
            values: [id],
        };

        const result = await this.client.query(preparedQuery);

        return result.rows;
    }

    async findAllTherapistBySpecialtiesAndGender(id,gender) {
        
        const preparedQuery = {
            text: `SELECT t.lastname, t.firstname, s.label, t.id, t.gender FROM therapists t
            JOIN therapists_own_specialties ts ON ts.therapists_id = t.id
			JOIN specialties s ON s.id = ts.specialties_id
			WHERE s.id = $1 AND t.gender = $2`,
            values: [id,gender],
        };

        const result = await this.client.query(preparedQuery);

        return result.rows;
    }

    
}

module.exports = new Therapists(client);