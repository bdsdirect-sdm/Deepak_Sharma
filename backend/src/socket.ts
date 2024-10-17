import socket from "socket.io"
import { Server } from "http"

export const setSocket = (server:Server) =>{
    const io = new socket.Server(server,{
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        }
    })

    io.on("connect" , (socket:any) =>{
        console.log("Client connected");

        socket.on("join_room", (data:string) => {
            socket.join(data);
            
        })
    })

}