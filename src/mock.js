import Mock from 'mockjs'
//import data from './data.json'

const Random = Mock.Random
Random.extend({
  treatmentType: function(date) {
    const treatmentType = ['脑电康复','机械康复']
    return this.pick(treatmentType)
  }
})

Mock.mock('http://localhost:8080/getUserList', {
  code: 0, data:
    {
      'data|1000': [
        {
          id: '@id',//随机id
          name: '@name',//随机名称
          nickName: '@last',//随机昵称
          phone: /^1[34578]\d{9}$/,//随机电话号码
          'age|11-99': 1,//年龄
          address: '@county(true)',//随机地址
          email: '@email',//随机邮箱
          isMale: '@boolean',//随机性别
          createTime: '@datetime',//创建时间
          avatar() {
            //用户头像
            return Mock.Random.image('100×100', Mock.Random.color(), '#757575', 'png', this.nickName)
          }
        }
      ]
    }
})

// 'http://localhost:8080/getUserInfo?id=410000200306032981'
Mock.mock(/getUserInfo\?id=[0-9]+/i, {
  code: 0, data:
    {
      'data':
        {
          sex: '@boolean',
          height: 180,
          thigh_len: 50,
          shank_len: 50,
          age: /^\d{2}$/,
          up_site: 1,
          down_site: 1,
          phoneNumber: /^1[34578]\d{9}$/,

          id: '@id',//随机id
          name: '@name',//随机名称
          nickName: '@last',//随机昵称
          address: '@county(true)',//随机地址
          email: '@email',//随机邮箱
          avatar() {
            //用户头像
            return Mock.Random.image('100×100', Mock.Random.color(), '#757575', 'png', this.nickName)
          },
// /^20[012]\d\/((0[1-9])|(1[0-2]))\/[1-30]$/
          desserts() {
            return Mock.mock({
              'list|1-50': [{
                'id|+1': 1,
                'treatmentType': '@treatmentType',
                'startTime': '@date',
                'totalTime': /^\d{3}$/,
                'effect': /^[好坏]$/,
              }]
            })
          },


        }
    }
})


Mock.mock(/detail\/\?page=[0-9]+&size=[0-9]+/, {
  code: 0, data:
    {
      'length':333,
      'data|10': [
        {
          // 'id|+1': 1,
          'id' :'@id',
          'treatmentType': '@treatmentType',
          'startTime': '@date',
          'totalTime': /^\d{3}$/,
          'effect': /^[好坏]$/,
        }
      ]
    }
})
