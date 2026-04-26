const {getUser} = require('../services/auth');


async function authMiddleware(req,res, next) {
    try {
        // Check for token in Authorization header first
        let token = null;
        const authheader = req.headers['authorization'];
        
        if(authheader && authheader.startsWith('Bearer ')) {
            token = authheader.split(' ')[1];
        } else if(req.cookies.token) {
            // Fall back to cookie if no Authorization header
            token = req.cookies.token;
        }
        
        if(!token) return res.redirect('/login');

        const user = getUser(token);
        if(!user) {
            return res.redirect('/login');
        }
        req.user = user;
        next();
    }
    catch(error) {
        console.error('Error in auth middleware:', error);
        return res.redirect('/login');
    }
}

function restrictTo(roles) {
    return function(req, res, next) {
        if(!req.user) return res.redirect('/login');

        if(!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        return next();
    }
}

module.exports = {
    authMiddleware,
    restrictTo
};