import axios from "axios";
const hostname = window.location.hostname
const protocol = hostname=='localhost'? 'http://':'https://'
const port = ':443'
const API  = axios.create({
    "baseURL": protocol+hostname+port,
    timeout:1000,
});
export default API;

