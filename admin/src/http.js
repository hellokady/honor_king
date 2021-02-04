import axios from 'axios'
import router from './router'
import { Message } from 'element-ui'

const http = axios.create({
    baseURL: 'http://localhost:8090/admin/api/'
})

const whiteStatusCode = new Set([401, 422])

http.interceptors.request.use(config => {
    if (sessionStorage.getItem('token')) config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`
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
}, err => {
    if (err.response.data.message) {
        Message({
            type: 'error',
            message: err.response.data.message
        })
    }
    // 令牌错误 | 过期 | 错误处理
    if (whiteStatusCode.has(err.response.status)) router.push('/login')
    return Promise.reject(err)
})

export default http