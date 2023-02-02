import axios from "axios";
const hostname = window.location.hostname
const protocol = hostname ==='localhost'? 'http://':'https://'
const port = ':443'
const API  = axios.create({
    "baseURL": protocol+hostname+port,
    //"baseURL":"http://"+"192.168.29.172:443",
    timeout:5000,
});
export default API;

