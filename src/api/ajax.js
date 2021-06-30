import axios from 'axios'
// import header from 'vuetify/src/components/VDataTable/mixins/header'

export default function ajax (url = '', url_data = {}, type = 'GET', body_data = {}) {
  return new Promise(function (resolve, reject) {
    let promise
    let dataStr = '' // 数据拼接字符串
    console.log(url_data.constructor)
    if (url_data.constructor === Object) {
      Object.keys(url_data).forEach(key => {
        dataStr += key + '=' + url_data[key] + '&'
      })
    } else {
      dataStr += String(url_data)
    }
    if (dataStr !== '') {
      dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr

    }
    console.log(url)

    if (type === 'GET') {

// 发送 get 请求
      promise = axios.get(url)
    } else if (type === 'POST') {
// 发送 post 请求
      console.log(JSON.stringify(body_data))
      axios.defaults.headers.post['Content-Type'] = 'application/json'
      promise = axios.post(url, JSON.stringify(body_data))
    } else if (type === 'PUT') {
// 发送 put 全部更新请求
      console.log(JSON.stringify(body_data))
      axios.defaults.headers.put['Content-Type'] = 'application/json'
      promise = axios.put(url, JSON.stringify(body_data))
    } else if (type === 'DELETE') {
// 发送 delete 请求
      promise = axios.delete(url)
    }
    promise.then(response => {
      resolve(response.data)
    })
      .catch(error => {
        reject(error)
      })
  })
}






