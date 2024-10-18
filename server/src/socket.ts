import socketio from "socket.io"
interface SentMessage{
    message: string;
    room: string;
    name:String
}
export const setSocket = (server:any) =>{
    const io = new socketio.Server(server,{
        // serveClient:true,   //it is by default true to serve the erver. You can set it to false if dont want to sever serv the server
        cors: {origin:"*"}
    });

    io.on("connect",(socket:any) =>{

        console.log("Client connected",socket.id)

        socket.on("join_room",({room,name}:any)=>{
            socket.join(room)
            console.log("joined room",socket.id,"in room",room,"withName",name)
            io.to(room).emit("message",{message:`New User Just joined the  room ${room}`,socketId:socket.id,name})
            socket.emit("joined_room",socket.id);
        })

        socket.on("send_message",({message,room,name}:SentMessage) =>{
            console.log(`${socket.id} just sent a message in a room ${room}`)
            io.to(room).emit("message",{message,name,socketId:socket.id})
        })

        socket.on("leave_room",(room:string)=>{
            socket.leave(room)
        })
        socket.on("disconnect", () => {
            console.log("Client disconnected",socket.id)
        })
        
    })
}