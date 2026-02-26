// const http = require('http');
const fs = require('fs');
const url = require('url');
const express = require('express');


const app = express();

app.get('/', (req, res) => {
    return res.send("Hello World!")
})



app.get('/about-us',(req,res)=> {
    return res.send(`This is about us page, Thank you ${req.query.name} to visit our website!`)
})


// const myServer = http.createServer(app);

app.listen(8000,() => console.log("Server is listening on port 8000"))
