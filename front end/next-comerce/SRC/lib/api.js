import axios from "axios"; 

export const axiosInstance = axios.create({
    baseURL: "http://localhost:2711", 
    "x-secret-key": "abc",
});