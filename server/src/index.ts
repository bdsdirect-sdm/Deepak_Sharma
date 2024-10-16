import  express from "express"
import { createServer } from "http"
import socketio from "socket.io" 

const app = express(); //make an express app
// making server file public
app.use(express.static('public'))
const expressServer = app.listen(4000)

const io = (socketio as any)(expressServer,{

}); //make a socket.io server


