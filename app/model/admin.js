const CoreDatamapper = require('./CoreDatamapper');
const client = require('../db/pg');

class Admin extends CoreDatamapper {
    tableName = 'specialties';
    tableName = 'therapists';
    tableName = 'appointments';

    
}


module.exports = new Admin(client);