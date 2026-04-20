const {getUser} = require('../services/auth');


async function authMiddleware(req,res, next) {
    try {
        const sessionId = req.cookies.uid;

        if(!sessionId) return res.redirect('/login');

        const user = getUser(sessionId);
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

module.exports = authMiddleware;