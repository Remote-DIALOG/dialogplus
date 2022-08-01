import { CompressOutlined } from "@mui/icons-material";
import axios from "axios";

const API  = axios.create({
    "baseURL":'http://127.0.0.1:8080',
    timeout:1000,
});

export const postCall = async (url, opts, headers, body, token=false) => {
    if (token) {
        const tk = localStorage.getItem('token');
        headers.Authorization = `Bearer ${token}`;
    }
    try {
        const response = await API.post(url, body)
        console.log(response);
        if (response.ok) {
            return await (response.json());
        }
        const error = await response.json();
        throw new Error (error.message || error.statusText);
    } catch(error) {
        throw new Error(error)

    }
}

export default API;

