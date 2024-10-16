import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Define the context type
interface SocketContextType {
  socket: Socket | null;
}

interface SocketProviderProps {
    children: ReactNode;
  }

// Create the context
const SocketContext = createContext<SocketContextType | undefined>(undefined);

// Socket provider component
export const SocketProvider: React.FC<SocketProviderProps> = ({children}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:4000'); // Replace with your server's URL
    setSocket(newSocket);
    console.log(newSocket)

    // Clean up the socket connection on unmount
    return () => { 
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Hook to use the SocketContext
export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};