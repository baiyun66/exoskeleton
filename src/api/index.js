/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// let BASE_URL = 'http://localhost:8080'
let BASE_URL = '/api/basic'



/*************userList***************/
/*************测试api***************/
export const getUserList = () => ajax(BASE_URL+'/getUserList')
export const getUserInfo = (id) => ajax(BASE_URL+'/getUserInfo',{id})


/*************userList***************/
/*************基础信息页面***************/
// BASE_URL += '/basic'

//1. 获取一页的信息
export const getInfoByPage = (page,size,info) => ajax(BASE_URL+'/',{page,size,info})
export const searchInfoByPage = (page,size,info) => ajax(BASE_URL+'/search',{page,size},"POST",info)
//2.添加一条新数据
export const addInfo = (info) => ajax(BASE_URL+'/', {},'POST',info)
//3.依据id删除数据
export const deleteInfoByName = (id) => ajax(BASE_URL+'/'+String(id),{},'GET')
//4.更新一条数据
export const updateInfo = (info) => ajax(BASE_URL+'/', {},'PUT',info)
//5.上传文件
export const importDate = (info) => ajax(BASE_URL+'/import',{info},'POST')


/*************userinfo***************/
/*************详细信息页面***************/
export const getDInfoByUid = (uid)=>ajax(BASE_URL+'/detail/'+String(uid),{},'GET')
//1.添加详细信息
export const addDInfo = (dInfo) => ajax(BASE_URL+'/detail/',{dInfo},'POST')
//2.更新一条详细信息
export const updateDInfo = (dInfo) => ajax(BASE_URL+'/detail/', {},'PUT',dInfo)
//3.依据id删除一条详细信息
export const deleteDInfo = (id) => ajax(BASE_URL+'/detail/',{id},'DELETE')
//4.获取一页治疗记录
export const getTRecordsByPage = (page,size,info,uid) => ajax(BASE_URL+'/detail/getTRecords/'+String(uid),{page,size,info})
//3.添加治疗记录
export const addTreatmentRecord = (tRecord) => ajax(BASE_URL+'/detail/addTRecord', {},'POST',tRecord)
//4.依据id删除一条治疗记录
export const deleteTreatmentRecord = (id) => ajax(BASE_URL+'/detail/deleteTRecord/',id,'DELETE')
//5.更新（修改）一条治疗记录
export const updateTreatmentRecord = (tRecord) => ajax(BASE_URL+'/detail/updateTRecord', {},'PUT',tRecord)


