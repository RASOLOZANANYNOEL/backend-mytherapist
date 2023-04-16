const CoreDatamapper = require('./CoreDatamapper');
const client = require('../db/pg');

class Admin extends CoreDatamapper {
    tableName = 'patients';

    
}


module.exports = new Admin(client);