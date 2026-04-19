const User = require('../models/user');


async function createUser(req, res) {
    try {
        const { user_name, email, password} = req.body;

        const newuser = await User.create({
            user_name,
            email,
            password,
        });
        
        return res.render('user_created', { user: newuser });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).render('error', { error: 'Failed to create user' });
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
        return res.json({
            message: 'Authentication successful',
            user: user,
        });
    } catch (error) {
        console.error('Error authenticating user:', error); 
    }
}


module.exports = {
    createUser,
    authenticateUser
};