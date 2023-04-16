const CoreDatamapper = require('./CoreDatamapper');
const client = require('../db/pg');

class Specialties extends CoreDatamapper {
    tableName = 'specialties';

    
}


module.exports = new Specialties(client);