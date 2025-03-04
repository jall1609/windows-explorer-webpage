import axios from 'axios'

const api = axios.create({
    baseURL : import.meta.env.VITE_BASE_BE_URL ?? "http://localhost:8081"
})

export default api