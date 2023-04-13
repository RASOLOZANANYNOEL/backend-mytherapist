const CoreDatamapper = require('./CoreDatamapper');
const client = require('../db/pg');

class Therapists extends CoreDatamapper {
    tableName = 'therapists';

    
    async findTherapistsWithSpecialities(id) {
        const preparedQuery = {
            text: `SELECT t.lastname, t.firstname, s.label FROM therapists t
            JOIN therapists_own_specialties ts ON ts.therapists_id = t.id
			JOIN specialties s ON s.id = ts.specialties_id 
            WHERE t.id = $1`,
            values: [id],
        };

        const result = await this.client.query(preparedQuery);

        return result.rows;
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
            text: `INSERT INTO therapists_own_specialties (therapists_id, specialties_id) VALUES ($1, $2)`,
            values: [therapistId, specialityId],
        };

        const result = await this.client.query(preparedQuery);

        return result.rows;
    }
    
    async removeSpecialtiesFromTherapist(therapistId, specialityId) {
        const preparedQuery = {
            text: `DELETE FROM therapists_own_specialties WHERE therapists_id = $1 AND specialties_id = $2`,
            values: [therapistId, specialityId],
        };

        const result = await this.client.query(preparedQuery);

        return result.rows;
    }
    
}

module.exports = new Therapists(client);