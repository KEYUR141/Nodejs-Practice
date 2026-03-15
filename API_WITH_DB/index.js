require('dotenv').config();
const express = require('express');
const ConnectDB = require('./config/db');

const app = express();

app.use(express.json());

ConnectDB();

app.get('/',(req,res) => {
    res.json({message: 'Server is running'});
});

const PORT = process.env.PORT  || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


