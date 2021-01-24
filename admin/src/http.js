import axios from 'axios'
import { Message } from 'element-ui'

const http = axios.create({
    baseURL: 'http://localhost:8090/admin/api/'
})

http.interceptors.request.use(config => {
    return config
})

http.interceptors.response.use(config => {
    if (config.data.message) {
        Message({
            type: 'success',
            message: config.data.message
        })
    }
    return config
})

export default http