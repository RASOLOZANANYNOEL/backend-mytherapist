const authMiddleware = require('./authMiddleware.js');
const isTherapistMiddleware = require('./isTherapistMiddleware.js');
const isPatientMiddleware = require('./isPatientMiddleware.js');

module.exports = {
    authMiddleware,
    isTherapistMiddleware,
    isPatientMiddleware
}