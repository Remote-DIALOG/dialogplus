import {setCurrentSessionValue, updateHelp, deleteHelp, updateSessionExternal} from './session'
import { io } from "socket.io-client";
import {store} from '../store'
const hostname = window.location.hostname
const protocol = hostname ==='localhost'? 'http://':'https://'
const port = ':443'
const url = protocol+hostname+port
// const url = "http://"+"192.168.29.172:443"
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
  console.log("send message", message)
  await socket.emit("send_message", message)
}
export const recive_message = async function () {
  socket.on("recevice_message", (data)=> {
    console.log("recived message = ", data)
    store.dispatch(updateSessionExternal(data.current_session))
  })
}
export const review = async function (message) {
  await socket.emit("review", message)
}
export const movetoReview = async function () {
  socket.on("movetoReview", (data)=> {
    window.Session.handleReview();
    //console.log(data)
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
    store.dispatch(updateHelp(data))
  })
  store.on("deselectscale", (data)=>{
    store.dispatch(deleteHelp(data))
  })
}