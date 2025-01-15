import {updateSessionExternal} from './session'
import {updateNotesExternal} from './notes';
import { io } from "socket.io-client";
import {store} from '../store'
const hostname = window.location.hostname
const protocol = hostname ==='localhost'? 'http://':'https://'
const port = ':443'
const url = protocol+hostname+port
// const url = "http://35.178.194.72:8080"
// const url = "http://10.6.54.183:443"
let socket = null;
export const initiateSocketConnection = (token) => {
    socket = io(url, {auth: {token,},transports:['websocket']});
    console.log(`Connecting socket...`);
    return socket;
};
export const join_room = (id) => {
  socket.emit("join_room", id)
}
export const send_message = async function(message) {
  console.log("send message", message)
  await socket.emit("send_message", message)
}
export const recive_message = async function () {
  socket.on("recevice_message", (data)=> {
    console.log("recived message = ", data)
    store.dispatch(updateSessionExternal(data.current_session))
  })
}
export const sendNotes = async function (message) {
  console.log("send note", message)
  await socket.emit("sendNotes", message)
}
export const reciveNotes = async function () {
  console.log("recvice is called")
  socket.on("get_notes", (data)=> {
    console.log("data from notes = ", data)
   store.dispatch(updateNotesExternal(data.notes))
  })
}
export const disconnectSocket = async function () {
  if (socket!=null) {
    console.log("socket disconnect")
    socket.emit('forceDisconnect')
  }
}