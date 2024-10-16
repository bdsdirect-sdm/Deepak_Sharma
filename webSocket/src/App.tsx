import './App.css'
import ChatApp from './components/ChatApp'
import { SocketProvider } from './context/SocketContext'

function App() {

  return (
    <SocketProvider>
      <h2></h2>
       <ChatApp/>
    </SocketProvider>
  )
}

export default App
