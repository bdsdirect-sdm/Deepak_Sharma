import {io}  from "socket.io-client"

const socket = io('http://172.24.0.207:4400/');

export default socket;

