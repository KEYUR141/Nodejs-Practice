const express = require('express');
const urlRoutes = require('./routes/routes');
const userRoutes = require('./routes/user');
const app = express();
const port = 8000;
require('dotenv').config();
const path = require('path');

const URL = require('./models/url');
const ConnectDB = require('./models/connect_db');
ConnectDB();

//View Engine Define
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"))


app.use(express.json());

app.use('/api', urlRoutes);
app.use('/api/users', userRoutes);
app.use(express.static('./public'));

app.get('/home',(req,res)=> {
    
    
    try { 
        res.render('page.ejs')
        console.log('Hit on the ejs page at http://localhost:8000/home/');
    } catch (error) {
        console.error('Error in rendering EJS page', error);
        return res.status(500).json({
            message: 'Error in rendering EJS page',
            error: error.message
        });
    }
});

app.get('/signup',(req,res)=> {
    try {
        res.render('signup.ejs');
        console.log('Rendered signup page at http://localhost:8000/signup');
    } catch (error) {
        console.error('Error in rendering signup page', error);
        return res.status(500).render('error', { error: 'Failed to load signup page' });
    }
});

app.get('/login',(req,res)=> {
    try {
        res.render('login.ejs');
        console.log('Rendered login page at http://localhost:8000/login');
    } catch (error) {
        console.error('Error in rendering login page', error);
        return res.status(500).render('error', { error: 'Failed to load login page' });
    }
});




app.get('/:shortId', async(req,res) => {
    try {
        const {shortId} = req.params;
        const record = await URL.findOneAndUpdate(
            {shortId: shortId},
            { 
                $push:  {
                visitHistory: { timestamp: new Date() }
            }
            }
        );
        
        return res.redirect(record.redirectUrl);
    }
    catch(error) {
        console.error('Error in redirecting URL', error);
        return res.status(500).json({
            message: 'Error in redirecting URL',  
            error: error.message,      
        });
    }
});



app.listen(port, () => console.log(`Server running on port ${port}`));

