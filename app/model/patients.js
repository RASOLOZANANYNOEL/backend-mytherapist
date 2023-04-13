const CoreDatamapper = require('./CoreDatamapper');
const client = require('../db/pg');

class Patients extends CoreDatamapper {
    tableName = 'patients';
}

module.exports = new Patients(client);