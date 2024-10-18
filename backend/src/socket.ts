import socket from "socket.io"
import { Server } from "http"
import Message from "./models/messagesModel"
import { SourceTextModule } from "vm"

interface SentMessage {
    roomid:string,
    senderid:string,
    message:string
}

export const setSocket = (server:Server) =>{
    const io = new socket.Server(server,{
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        }
    })

    io.on("connection" , (socket:any) =>{
        console.log("Client connected",socket.id);

        socket.on("join_room", (roomid:string) => {
            socket.join(roomid);
            console.log("connected to the room ",roomid) 
            io.to(roomid).emit("testing1","connection stablised")
        })

        socket.on("testing",(data:string)=>console.log("this is connection string"+data))

        socket.on("leave_room",(roomid:any) =>{
            socket.leave(roomid)
            console.log("room leavge")
        })

        socket.on("send_message",async({roomid,senderid,message}:SentMessage) =>{
            console.log("message trigger")
               try{
                    const mess =await  Message.create({roomid,senderid,message,createdAt:Date.now().toString()})

                    console.log("messmess",mess)

                    io.to(roomid).emit("message",{roomid,message,senderid})
               } catch(error){
                socket.emit("error","send message again")
               }

        })
    })
}