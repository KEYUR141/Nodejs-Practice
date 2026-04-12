const express = require('express');
const urlRoutes = require('./routes/routes');
const app = express();
const port = 8000;
require('dotenv').config();

const URL = require('./models/url');
const ConnectDB = require('./models/connect_db');
ConnectDB();

app.use(express.json());

app.use('/api', urlRoutes);


app.get('/test-ejs/',(req,res)=> {
    
    
    try { 
        res.end(`
        <html>
        <head>
        <title>Test EJS</title>
        </head>
        <body>
        <h1>Test EJS</h1>
        <p>This is a test EJS page.</p>
        </body>
        </html>`)
        console.log('Hit on the ejs page at http://localhost:8000/test-ejs/');
    } catch (error) {
        console.error('Error in rendering EJS page', error);
        return res.status(500).json({
            message: 'Error in rendering EJS page',
            error: error.message
        });
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

