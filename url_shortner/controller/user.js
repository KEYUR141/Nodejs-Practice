const User = require('../models/user');


async function createUser(req, res) {
    try {
        const { user_name, email, password} = req.body;

        const newuser = new User.create({
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