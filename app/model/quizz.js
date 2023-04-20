const CoreDatamapper = require('./CoreDatamapper');
const client = require('../db/pg');

class Quizz extends CoreDatamapper {
    tableName = 'quizz';
    
    
}


module.exports = new Quizz(client);