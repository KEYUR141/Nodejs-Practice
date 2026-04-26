const jwt = require('jsonwebtoken');
const secretKey = 'kendall@Roy';

function setUser(user) {
    payload = {
        id: user._id,
        email: user.email,
        role: user.role
    }
    return jwt.sign(payload, secretKey);
}

function getUser(token) {
    //return sessionIdtoUserMap.get(id);
    if(!token) return null;
    try {
        return jwt.verify(token, secretKey);
    } catch(error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}