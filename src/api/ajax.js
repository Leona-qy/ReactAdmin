/* 
能发送异步ajaxq请求的函数模块 
封装axios库
函数返回值是promise对象
*/

//1.优化：统一处理请求异常 在外层包一个自己创建的promise对象，请求出错时，不reject（error），而是显示错误提示
//2.优化：异步得到的不是response，而是response.data,在请求成功resolve时：resolve(response.data)
import axios from 'axios'
import {message} from 'antd'


export default function ajax(url, data={}, type='GET') {
    //如果失败，不调用reject，而是提示异常信息
    return new Promise((resolve, reject) => {
        let promise
        if (type==='GET') {//发get请求
            promise = axios.get(url, {//配置对象
                params: data//指定请求参数
            })
        } else{ //发出post请求
            promise = axios.post(url,data)
        }
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error('请求失败:'+ error.message)
        })
    })
}


// //请求登陆接口
// ajax('/login', {username:'Tom', password:'12345'}, 'POST').then()//.then判断是否成功
// //添加用户
// ajax('/manage/user/add', {username:'Tom', password:'12345', phone:'123456'})
