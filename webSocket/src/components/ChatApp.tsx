import  { useEffect , useState} from 'react'
import socket from '../utils/setSocketServer'

interface Sent_Message{
    message: string,
    sender: string
}

const ChatApp = () => {
    const [room, setroom] = useState<string>("");
    const [currentRoom, setCurrentRoom]  = useState<string|null>(null);
    const [messages, setMessages] = useState<Array<Sent_Message>>([])
    const [message,setMessage] = useState<string>("")

    useEffect(()=>{
        socket.on("message",(data) =>{
            setMessages((prev) => ([...prev,data]))
        })
        return () =>{
            socket.off("message")  
        }
    },[])

  const enterHandler =() =>{
    socket.emit("join_room",room);
    setCurrentRoom(room);
    setMessages([])
  }

  const sendMessageHandler = () =>{
    if((message?.length > 0) && currentRoom){
        socket.emit("send_message",{room,message})
    }
    setMessage("");
  }

  const leaveRoom = () =>{
    socket.emit("leave_room",currentRoom);
    setCurrentRoom(null);
    setMessages([])
  }
  if(!currentRoom){
    return (
        <div><h2>Join a Chat Room</h2>
            <label htmlFor='room_id'>Room Name</label>
            <input id='room_id' type='text' placeholder='Enter Room Name' value={room} onChange={(e)=>setroom(e.target.value)}/>
            <button onClick={enterHandler}>Join Room</button>
        </div>
      )
  }

  return (
    <div>
        <h2>Chat Room: {currentRoom}</h2>
        <ul>
            {messages.map((message, index) => (
                <li key={index}>{message.sender}: {message.message}</li>
            ))}
        </ul>
        <label htmlFor='message'>Message</label>
        <input id='message' type='text'  value={message} onChange={(e)=>setMessage(e.target.value)}/>
        <button onClick={sendMessageHandler}>Send</button>
        <button onClick={leaveRoom}>Leave Room</button>
    </div>
  )
}

export default ChatApp