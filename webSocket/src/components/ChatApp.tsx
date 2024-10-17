import React, { useEffect , useState} from 'react'
import { newSocket } from '../utils/setSocketServer'
// import { Socket } from 'socket.io-client'



const ChatApp = () => {
  const [formData, setFormData] = useState({
    yourName: '',
    roomid:''
  })
  
  useEffect(()=>{
    newSocket.on("connect",()=>{
      console.log("websocket is connected ")
    })
    newSocket.on("message",() =>{
      // setCarList((prev) =>([...prev, socket.message]))
    })
    newSocket.on("test",(data) =>{
      console.log(data)
    })
  },[newSocket])
  const handleOnSubmit =  () => {
    console.log(formData)
    newSocket.emit("join_room",formData.roomid)
  }

  const handleOnChange = (e)=>{
    e.preventDefault();
    setFormData((prev) =>  ({...prev, [e.target.name]: e.target.value}))
    
  }
  return (
    <div><h2>Express is working fine</h2>
    <form>
    <label htmlFor='Room_name' >Room id</label>
        <input type="text" id="Room_name" name="roomid" value={formData.roomid} onChange={handleOnChange}/>

        <label htmlFor='Name'>Your Name</label>
        <input type='text' id='Name' name='yourName' value={formData.yourName} onChange={handleOnChange}/>

        <button type='button' onClick={handleOnSubmit}>submit</button>
    </form>

        
    </div>
  )
}

export default ChatApp