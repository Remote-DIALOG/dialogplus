import { CompressOutlined } from "@mui/icons-material";
import axios from "axios";

const API  = axios.create({
    "baseURL":'http://127.0.0.1:8080',
    timeout:1000,
});
export default API;

