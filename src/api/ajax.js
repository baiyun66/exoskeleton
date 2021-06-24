import axios from 'axios'
// import header from 'vuetify/src/components/VDataTable/mixins/header'

export default function ajax (url = '', data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    let promise
    let dataStr = '' // 数据拼接字符串
    console.log(data.constructor)
    if(data.constructor===Object)
    {
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })
    }else{
      dataStr+=String(data)
    }

    if (type === 'GET') {
// 准备 url query 参数数据
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
// 发送 get 请求
      console.log(url)
      promise = axios.get(url)
    } else if (type === 'POST') {
// 发送 post 请求

      console.log(url,data)
      axios.defaults.headers.post['Content-Type'] = 'application/json';
      promise = axios.post(url,JSON.stringify(data))
    } else if (type === 'PUT') {
// 发送 put 全部更新请求
      console.log(url,data)
      axios.defaults.headers.put['Content-Type'] = 'application/json';
      promise = axios.put(url,JSON.stringify(data))
    } else if (type === 'DELETE') {
      // 准备 url query 参数数据
      if (dataStr !== '') {
        // dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + dataStr
        console.log(url)
      }
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






