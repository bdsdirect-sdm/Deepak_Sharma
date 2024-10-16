import socketio from "socket.io"
interface SentMessage{
    message: string;
    room: string;
}
export const setSocket = (server:any) =>{
    const io = new socketio.Server(server,{
        // serveClient:true,   //it is by default true to serve the erver. You can set it to false if dont want to sever serv the server
        cors: {origin:"*"}
    });

    io.on("connect",(socket:any) =>{

        console.log("Client connected",socket.id)

        socket.on("join_room",(room:string)=>{
            socket.join(room)
            console.log("joined room",socket.id)
            io.to(room).emit("message",`A new user is just joined ${socket.id} in room ${room}`)
        })
        socket.on("send_message",({message,room}:SentMessage) =>{
            console.log(`${socket.id} just sent a message in a room ${room}`)
            io.to(room).emit("message",{message,sender:socket.id})
        })
        socket.on("leave_room",(room:string)=>{
            socket.leave(room)
        })
        socket.on("disconnect", () => {
            console.log("Client disconnected",socket.id)
        })
        
    })
}