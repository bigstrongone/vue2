/* 封装axios用于发送请求 */
import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
// 创建一个新的axios实例
const instance = axios.create({
  baseURL: 'https://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: { platform: 'h5' }
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  const res = response.data
  if (res.status !== 200) {
    Toast(res.message)
    return Promise.reject(res.message)
  } else {
    Toast.clear()
  }
  // 对响应数据做点什么
  return res
}, function (error) {
  console.log('error-------')
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
