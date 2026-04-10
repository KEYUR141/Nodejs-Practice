require('dotenv').config();
const express = require('express');
const ConnectDB = require('./config/db');
const apiRoutes = require('./routes/api')
const app = express();

app.use(express.json());

ConnectDB();





app.use('/api', apiRoutes);

const PORT = process.env.PORT  || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


