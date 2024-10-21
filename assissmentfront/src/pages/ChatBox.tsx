import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {io} from "socket.io-client"
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import socket from '../utils/setSocketServer'
import { createJsxClosingElement } from 'typescript'

interface Message{
  roomid?:string,
  senderid?:string,
  message?:string,
}

const ChatBox = () => {
    const navigate = useNavigate()
    const {roomid} = useParams()
    const [messages, setMessages] = useState<Array<any>>([])
    const [message,setMessage] = useState("")
    const {user}  = useSelector((state:any)=>state.user)
    console.log("user id " , user.id)

    const {data} = useQuery({
      queryKey: ["messages", roomid],
      queryFn: async () => {
        const response = await axios.get(`http://172.24.0.207:4400/api/v1/getMessages/${roomid}`)

        // console.log(response.data)
        const messagesData = Array.isArray(response.data.messages) ? response.data.messages : [];
        console.log(messagesData)

        setMessages(messagesData);
        return messagesData
      }
    })

    
    useEffect(() =>{
      socket.emit("join_room",roomid)
        socket.emit("testing", "testing connection")

        socket.on("message",(data) =>{
          setMessages((prev) =>([...prev,data]))
        })

        socket.on("error",(data)=>{
          toast.error(data)
        }) 

    },[]) 

    const sendMessageHandler = () =>{
      if((message?.length > 0) && roomid){
          socket.emit("send_message",{roomid,senderid:user.id,message})
      }
      setMessage("");
    }

    const keyDownEvent = (e:any)=>{
      if(e.key === "Enter"){
        sendMessageHandler();
      }
    }
    
    const leaveChatHandler = () =>{
      socket.emit("leave_room",roomid);
      socket.disconnect();
      navigate('/dashboard')
    }

    socket.emit("testing","testing event")

  return (
    <div>
      <div className="flex flex-col h-screen bg-gray-50">
            <h2 className="text-xl font-semibold text-center py-4 bg-blue-200">Chat Box</h2>
            <ul className="flex-grow overflow-y-auto p-4">
                {(messages as any)?.map((msg:any) => {

                  return (
                    ( 
                      <li 
                          key={msg.id} 
                          className={`m-2 p-3 rounded-lg ${msg.senderid != (user.id) ? "bg-green-200 text-left" : "bg-yellow-200 text-right"}`}
                      >
                         <span className='font-mono'>{msg.message}</span>
                      </li>
                  )
                  )
                }

                )}
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
                <button onClick={leaveChatHandler} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 ml-2">Leave Chat</button>
            </div>
        </div>
    </div>
  )
}

export default ChatBox