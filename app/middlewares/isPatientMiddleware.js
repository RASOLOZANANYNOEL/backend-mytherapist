const jwt = require('jsonwebtoken');

const isPatientMiddleware = function(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ error: 'Token is wrong format' });
    }
    const token = authHeader.substring(7, authHeader.length);
    
    jwt.verify(token, 'therapist-secret', (err, user) => {
    if (err) {
    return res.status(403).json({ error: 'Le token est invalide ou a expiré' });
    }
    console.log(user.data.role)
    if (user.data.role !=='patient') {
        return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à accéder à cette ressource car vous n\'etes pas un patient!!!!' });
      }
      
    req.user = user;
    next();
        })
    }

    module.exports = isPatientMiddleware;