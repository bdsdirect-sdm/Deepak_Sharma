import {io}  from "socket.io-client"

const socket = io('http://172.24.0.207:4000/');

export default socket;

