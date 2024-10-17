
import express from "express"
import { dbconnect } from "./config/dbconnect";
import app from "./index"
import { createServer } from "http";
import { setSocket } from "./socket";
const port = process.env.PORT;

const server = createServer(app);

setSocket(server)

dbconnect();

server.listen(port, ()=>{
    console.log("Server is running on port : ",port)
})

