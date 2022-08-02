/* 
能发送异步ajaxq请求的函数模块 
封装axios库
函数返回值是promise对象
*/

import axios from 'axios'

export default function ajax(url, data={}, type='GET') {
    if (type=='GET') {//发get请求
        return axios.get(url, {//配置对象
            params: data//指定请求参数
        })
    } else{ //发出post请求
        return axios.post(url,data)
    }
}


//请求登陆接口
ajax('/login', {username:'Tom', password:'12345'}, 'POST').then()//.then判断是否成功
//添加用户
ajax('/manage/user/add', {username:'Tom', password:'12345', phone:'123456'})
