import axios from "axios";
const hostname = window.location.hostname
const protocol = hostname ==='localhost'? 'http://':'https://'
const port = ':443'
const API  = axios.create({
    "baseURL": protocol+hostname+port,
    // "baseURL":"http://35.178.194.72:8080",
    // "baseURL": "http://"+"10.6.54.183"+port,
    timeout:5000,
});
export default API;
