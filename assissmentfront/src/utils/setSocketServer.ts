import {io}  from "socket.io-client"

const socket = io('http://localhost:4400');

export default socket;

