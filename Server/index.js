const http = require('http');
const fs = require('fs')
const url = require('url')

const server = http.createServer((req, res) => {
    if (req.url ==='/favicon.ico') return res.end();
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`
    my_url = url.parse(req.url,true)
    console.log(my_url)
    fs.appendFile('server.log', log, (err)=> {
        if (err) {
            console.log(err)
        }
    })  
    
    // console.log(req.headers)
    name = my_url.query.name
    res.end(`Hello World!,${name}`)
})


server.listen(8000,()=>console.log("Server is listening on port 8000"))