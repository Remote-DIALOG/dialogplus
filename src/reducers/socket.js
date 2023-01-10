import {setCurrentSessionValue, updateSelectScale, deleteSelectScale} from './session'
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
export const session = async function (message) {
  window.Session.handleReview();
  await socket.emit("session", message)
}
export const savedsession = async function () {
  socket.on("sessionsave", (data)=> {
    console.log(data)
  })
}
export const selectscale =  async function(message) {
  await socket.emit("selectscale", message)
}

export const deselectscale = async function(message) {
  await socket.emit ("deselectscale", message)
}
export const updatescalehelp =  async function() {
  socket.on("selectscale", (data)=>{
    store.dispatch(updateSelectScale(data))
  })
  store.on("deselectscale", (data)=>{
    store.dispatch(deleteSelectScale(data))
  })
}