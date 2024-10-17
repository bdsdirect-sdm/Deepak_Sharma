import socketio from "socket.io"
export const setSocket = (server:any) =>{
    const io = new socketio.Server(server,{
        cors: {origin:"*"}
    });

    io.on("connect",(socket:any) =>{

        console.log("Client connected",socket.id)
    
        // first ard or emit is the name event
        socket.emit("welcome",[1,2,3])
        socket.on("select-car", (data : any)=>{
            console.log("message from select-car",data)
            socket.emit("test",`You have selected ${data}`)
        })
        socket.on("join_room",(data : any)=>{
            console.log(data)
            socket.join(data)
            console.log("room has been joined", data)

            socket.to(data).emit("")
        })
        
        
    })
}