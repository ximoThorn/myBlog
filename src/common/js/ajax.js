/*
*对axios的简单封装
*/
import axios from 'axios'

let ajax = (data) => {
  /*
  添加请求拦截器
  */
  axios.interceptors.request.use((config) => {
    return config
  }, (error) => {
    return Promise.reject(error)
  })
  /*
  添加返回拦截器
  */
  axios.interceptors.response.use((res) => {
    /*
    由于此次是调用的github_api并没有返回码，所以这里不做任何处理
    */

    return res
  }, (error) => {
    return Promise.reject(error)
  })

  let params = {
    ...data,
    baseURL: 'https://api.github.com',
    timeout: 2000,
    responsetype: 'json',
    validateStatus: (status) => {
      if (status < 200 || status >= 300) {
        console.log('暂时垮了-_-!')
      }
      return status >= 200 && status < 300
    }
  }

  return axios(params)
}

export default ajax
