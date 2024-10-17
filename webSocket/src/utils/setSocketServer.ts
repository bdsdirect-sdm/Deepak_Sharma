import {io}  from "socket.io-client"

export const newSocket = io('http://localhost:4000');

