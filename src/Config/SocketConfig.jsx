"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext({
  socket: null,
  isConnected: false,
});

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {

//     const socket = io("http://localhost:8080");

//     // Listen for responses
//     socket.on("response", (data) => {
//       console.log("AI Response:", data);
//     });

//     // Send a message
//     const sendMessage = (message) => {
//       socket.emit("message", message);
//     };
//     sendMessage("hello")
//     sendMessage("What is javascript")
//   }, []);
  useEffect(() => {
    const socketInstance = io('http://localhost:8080')

    socketInstance.on('connect', () => {
      setIsConnected(true)
    })

    socketInstance.on('disconnect', () => {
      setIsConnected(false)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  return useContext(SocketContext);
};
