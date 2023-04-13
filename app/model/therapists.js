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
            console.log('Result:', result.rows); // Ajoutez ce log pour afficher les résultats retournés
            return result.rows;
        } catch (error) {
            console.error('Error in AllTherapistsWithSpecialities:', error); // Ajoutez ce log pour afficher l'erreur
            throw error;
        }
    }
    
    
}

module.exports = new Therapists(client);