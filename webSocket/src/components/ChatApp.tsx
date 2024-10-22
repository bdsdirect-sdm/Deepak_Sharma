import  { useEffect , useState} from 'react'
import socket from '../utils/setSocketServer'

interface Sent_Message{
    message: string,
    socketId: string,
    name:string
}

const ChatApp = () => {
    const [room, setRoom] = useState<string>("");
    const [currentRoom, setCurrentRoom]  = useState<string|null>(null);
    const [messages, setMessages] = useState<Array<Sent_Message>>([])
    const [message,setMessage] = useState<string>("")
    const [socketId,setSocketId] =  useState('')
    const [name,setName] =  useState<string>('')

    useEffect(()=>{
        socket.on("message",(data) =>{
            setMessages((prev) => ([...prev,data]))
        })
        socket.on("joined_room",(data) =>{
          setSocketId(data)
        })
        return () =>{
            socket.off("message")  
        }
    },[])

  const enterHandler =() =>{
    socket.emit("join_room",{room,name});
    setCurrentRoom(room);
    setMessages([])
  }

  const sendMessageHandler = () =>{
    if((message?.length > 0) && currentRoom){
        socket.emit("send_message",{room,message,name})
    }
    setMessage("");
  }
  const keyDownEvent = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    console.log(e.key,"when you enter key");
    if(e.key == "Enter" && e.shiftKey !== true ){
      sendMessageHandler();
    }
  }

  const leaveRoom = () =>{
    socket.emit("leave_room",currentRoom);
    setCurrentRoom(null);
    setMessages([])
    setName("")
    setSocketId("")
    setSocketId("")
  }

  if(!currentRoom){
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 ">
      <h2 className="text-2xl font-bold mb-4">Join a Chat Room</h2>
      <input 
          id='name' 
          type='text' 
          placeholder='Enter Name' 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className='border-2 border-gray-400 p-2 mb-4 rounded-lg w-80'
      />
      <input 
          id='room_id' 
          type='text' 
          placeholder='Enter Room Name' 
          value={room} 
          onChange={(e) => setRoom(e.target.value)} 
          className='border-2 border-gray-400 p-2 mb-4 rounded-lg w-80'
      />
      <button onClick={enterHandler} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">Join Room</button>
    </div>
      )
  }

  console.log("socketIdiffffff",socketId)

  return (
    <div className="flex flex-col h-screen bg-gray-50">
            <h2 className="text-xl font-semibold text-center py-4 bg-blue-200">Chat Room: {currentRoom}</h2>
            <ul className="flex-grow overflow-y-auto p-4">
                {messages.map((msg, index) => (
                    <li 
                        key={index} 
                        className={`m-2 p-3 rounded-lg ${msg.socketId !== socketId ? "bg-green-200 text-left" : "bg-yellow-200 text-right"}`}
                    >
                        {msg.socketId !== socketId ? msg.name+":" : "You:"} <span className='font-mono'>{msg.message}</span>
                    </li>
                ))}
            </ul>
            <div className="flex p-4">
                <input 
                    id='message' 
                    type='text'  
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    className='border-2 border-gray-400 rounded-lg flex-grow p-2 mr-2'
                    onKeyDown={keyDownEvent}
                />
                <button onClick={sendMessageHandler} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">Send</button>
                <button onClick={leaveRoom} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 ml-2">Leave Room</button>
            </div>
        </div>
  )
}

export default ChatApp