import axios from "axios"
import { API_URL } from "./config"

export const api = axios.create({   
    baseURL: API_URL || "http://localhost:3001/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})
