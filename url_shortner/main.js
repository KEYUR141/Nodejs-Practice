const express = require('express');
const urlRoutes = require('./routes/routes');
const app = express();
const port = 8000;


const ConnectDB = require('./models/connect_db');
ConnectDB();

app.use(express.json());

app.use('/api', urlRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));

