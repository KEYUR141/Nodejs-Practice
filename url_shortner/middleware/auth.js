const {getUser} = require('../services/auth');


async function authMiddleware(req,res, next) {
    try {
        //const sessionId = req.cookies.uid;
        const authheader = req.headers['authorization'];

        //if(!sessionId) return res.redirect('/login');
        if(!authheader) return res.redirect('/login');

        const sessionId = authheader.split(' ')[1];

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