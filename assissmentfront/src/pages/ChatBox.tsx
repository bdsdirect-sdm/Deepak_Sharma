import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {io} from "socket.io-client"

const ChatBox = () => {
    const socket = io("http://localhost:4400")
    const {roomid} = useParams()
    const [messages, setMessages] = useState([""])

    useEffect(() =>{
        socket.emit("join_room",roomid)
    })


  return (
    <div>Chat Box</div>
  )
}

export default ChatBox