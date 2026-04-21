const jwt = require('jsonwebtoken');
const secretKey = 'kendall@Roy';

function setUser(user) {
    payload = {
        id: user._id,
        email: user.email
    }
    return jwt.sign(payload, secretKey);
}

function getUser(token) {
    //return sessionIdtoUserMap.get(id);
    if(!token) return null;
    return jwt.verify(token, secretKey);
}

module.exports = {
    setUser,
    getUser
}