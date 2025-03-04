import axios from 'axios'

const clientAxios = axios.create({
    baseURL: `http://localhost:4026`
})

export default clientAxios;