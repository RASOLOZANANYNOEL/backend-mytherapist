const authMiddleware = require('./authMiddleware.js');
const isTherapistMiddleware = require('./isTherapistMiddleware.js');
const isPatientMiddleware = require('./isPatientMiddleware.js');
const isAdminMiddleware = require('./isAdminMiddleware.js');

module.exports = {
    authMiddleware,
    isTherapistMiddleware,
    isPatientMiddleware,
    isAdminMiddleware
}