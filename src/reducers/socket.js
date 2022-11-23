import { io } from "socket.io-client";
const hostname = window.location.hostname
const protocol = hostname ==='localhost'? 'http://':'https://'
const port = ':443'
const url = protocol+hostname+port
export const initiateSocketConnection = (token) => {
    const socket = io(url, {
      auth: {
        token,
      },
    });
    console.log(`Connecting socket...`);
};