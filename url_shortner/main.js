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


app.get('/:shortId', async(req,res) => {
    try {
        const {shortId} = req.params;
        const record = await URL.findOneAndUpdate(
            {shortId: shortId},
            { 
                $push:  {
                visitHistory: new Date(),
            }
            }
        );
        
        return res.redirect(record.redirectUrl);
    }
    catch(error) {
        return res.status(500).json({
            message: 'Error in redirecting URL',  
            error: error.message,      
        });
        console.error('Error in redirecting URL', error);
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));

