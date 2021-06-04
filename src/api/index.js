/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
const BASE_URL = 'http://localhost:8080'




/*************userList***************/
/*************测试api***************/
export const getUserList = () => ajax(BASE_URL+'/getUserList')
export const getUserInfo = (id) => ajax(BASE_URL+'/getUserInfo',{id})


/*************userList***************/
/*************基础信息页面***************/
//1. 获取一页的信息
export const getInfoByPage = (page,size,info) => ajax(BASE_URL+'/',{page,size,info})
//2.添加一条新数据
export const addInfo = (info) => ajax(BASE_URL+'/',{info},'POST')
//3.依据id删除数据
export const deleteInfoByName = (id) => ajax(BASE_URL+'/',{id},'DELETE')
//4.更新一条数据
export const updateInfo = (info) => ajax(BASE_URL+'/',{info},'PUT')
//5.上传文件
export const importDate = (info) => ajax(BASE_URL+'/import',{info},'POST')


/*************userinfo***************/
/*************详细信息页面***************/

//1.添加详细信息
export const addDInfo = (dInfo) => ajax(BASE_URL+'/detail/',{dInfo},'POST')
//2.更新一条详细信息
export const updateDInfo = (dInfo) => ajax(BASE_URL+'/detail/',{dInfo},'PUT')
//3.依据id删除一条详细信息
export const deleteDInfo = (id) => ajax(BASE_URL+'/detail/',{id},'DELETE')
//4.获取一页治疗记录
export const getTRecordsByPage = (page,size) => ajax(BASE_URL+'/detail/',{page,size})
//3.添加治疗记录
export const addTreatmentRecord = (tRecord) => ajax(BASE_URL+'/detail/addTRecord',{tRecord},'POST')
//4.依据id删除一条治疗记录
export const deleteTreatmentRecord = (id) => ajax(BASE_URL+'/detail/deleteTRecord/',{id},'DELETE')
//5.更新（修改）一条治疗记录
export const updateTreatmentRecord = (tRecord) => ajax(BASE_URL+'/detail/updateTRecord',{tRecord},'PUT')


