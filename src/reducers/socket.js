import {setCurrentSessionValue} from './session'
import { io } from "socket.io-client";
import {store} from '../store'
const hostname = window.location.hostname
const protocol = hostname ==='localhost'? 'http://':'https://'
const port = ':443'
const url = protocol+hostname+port
let socket;
export const initiateSocketConnection = (token) => {
    socket = io(url, {auth: {token,},transports:['websocket']});
    console.log(`Connecting socket...`);
    return socket;
};
export const join_room = (id) => {
  socket.emit("join_room", id)
}
export const send_message = async function(message) {
  await socket.emit("send_message", message)
}
export const recive_message = async function () {
  socket.on("recevice_message", (data)=> {
    store.dispatch(setCurrentSessionValue(data))
    console.log(data)
  })
}