const User = require('../models/user');
const {v4: uuidv4} = require('uuid');
const { setUser } = require('../services/auth');

async function createUser(req, res) {
    try {
        const { user_name, email, password, role } = req.body;

        const newuser = await User.create({
            user_name,
            email,
            password,
            role
        });
        
        return res.status(201).json({
            message: 'User created successfully',
            user: newuser
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
}


async function authenticateUser(req, res) {
    try {
        const {email_or_username, password} = req.body;

        const user = await User.findOne({
            $or: [
                {email: email_or_username},
                {user_name: email_or_username}
            ]
        });

        if(!user || user.password !== password) {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }
        // const sessionId = uuidv4();
        const token = setUser(user);
        res.cookie('token', token);
        
        return res.json({
            message: 'Authentication successful',
            token: token
        });
    } catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(500).json({
            message: 'Error authenticating user',
            error: error.message
        });
    }
}


module.exports = {
    createUser,
    authenticateUser
};