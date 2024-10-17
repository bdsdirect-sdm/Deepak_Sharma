import  express from "express"
import { createServer } from "http"
import {setSocket} from  './socket'


const app = express(); //make an express app
// app.use(express.static('public'))

const server = createServer(app)
setSocket(server)
// making server file public
server.listen(4000,()=>{
    console.log("runnign on 4000")
})


