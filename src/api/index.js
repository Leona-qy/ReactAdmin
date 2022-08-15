/* 
要求：根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
分别暴露
每个函数的返回值都是promise
*/
import { message } from 'antd'
import jsonp from 'jsonp'
import ajax from './ajax'

const BASE = ''
// export function reqLogin() {
//     return ajax('/login', {username,password}, 'POST')
// } 

//登陆
export const reqLogin = (username, password) => ajax(BASE + '/login', {username,password}, 'POST')

//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')
 
//天气查询

export const reqWeather = (citycode) => {
    return new Promise((resolve, reject)=> {
        const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=12fe3990d86611022e2265a9315bfcb9&city=${citycode}&extensions=base&output=JSON`
        jsonp(url, {}, (err,data) => {
            //const {weather,city} = data.lives[0]
            console.log(data)
            if(!err&&data.status==='1') {
                const {weather,city} = data.lives[0]
                resolve({weather,city})
            } else {
                message.error('天气请求失败')
            }
        })
    })
    
}