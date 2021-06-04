import axios from 'axios'

export default function ajax (url = '', data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    let promise
    let dataStr = '' // 数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })

    if (type === 'GET') {
// 准备 url query 参数数据
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
// 发送 get 请求
      promise = axios.get(url)
    } else if (type === 'POST') {
// 发送 post 请求
      promise = axios.post(url, data)
    } else if (type === 'PUT') {
// 发送 put 全部更新请求
      promise = axios.put(url, data)
    } else if (type === 'DELETE') {
      // 准备 url query 参数数据
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
// 发送 delete 请求
      promise = axios.delete(url, data)
    }
    promise.then(response => {
      resolve(response.data)
    })
      .catch(error => {
        reject(error)
      })
  })
}






