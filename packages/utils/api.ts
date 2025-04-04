import axios from "axios"
import { API_URL } from "./config"

export const api = axios.create({   
    baseURL: "http://localhost:3001/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})
