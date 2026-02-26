const http = require('http');
const fs = require('fs')


const server = http.createServer((req, res) => {
    
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`
    fs.appendFile('server.log', log, (err)=> {
        if (err) {
            console.log(err)
        }
    })  
    console.log(req.headers)
    
    res.end("Hello, World!")
})


server.listen(8000,()=>console.log("Server is listening on port 8000"))