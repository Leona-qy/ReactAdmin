import React, {Component} from 'react'
import {Navigate} from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Checkbox, message } from 'antd';
import './login.less'
import logo from '../../assets/images/logo.png'
import  { reqLogin } from '../../api' //默认暴露不要写{},指定暴露(分别暴露)用解构{}
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
/* 登陆的路由组件*/ 
const Item = Form.Item //不能写在import之前
export default class Login extends Component {
    onFinish = async (values) => {     
        const {username, password} = values
        const response= await reqLogin(username, password)
        //console.log('成功了', response.data)
        //{status:0, data: user} {status:0, msg: 'xxx'}
        if (response.status ===0) {
            //显示登录成功
            message.success('登录成功')

            const user=response.data
            memoryUtils.user=user//保存在内存中
            storageUtils.saveUser(user)//保存在本地中
            //跳转到管理界面(不需要再回退回来)
        } else {
            message.error(response.msg)
        }
        };
    validator = (rule, value, callback) => {
        if (!value) {
            //callback如果不传参说明校验成功，如果传参说明校验失败，并且会提示错误信息
            return Promise.reject('Please input your Username!')
        } else if (value.length<4) {
            return Promise.reject('The user name must be greater than 4.')
        } else if (value.length>12) {
            return Promise.reject('The user name must be smaller than 12.')
        } else if (! /^[a-zA-Z0-9_]+$/.test(value)) {
            return Promise.reject('The username must be an alphabetic character, an array, or an underscore.')
        } else {
            return Promise.resolve() //必须调用
        }
        
    }

    render() {
        //如果用户已经登陆，自跳转到管理界面
        const user=memoryUtils.user
        if(user&&user._id) {
            return <Navigate to='/'/>
        }
        return (
            <div className='login' >
                <header className='login-header'>
                    <img src={logo} alt="" />
                    <h1>React项目:后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    <Form 
                        onSubmit={this.hamdleSubmit} 
                        name="normal_login" 
                        className="login-form" 
                        initialValues={{ remember: true, }}
                        onFinish={this.onFinish}>
                        <Item 
                        name="username" 
                        rules={[//内置验证规则进行声明式验证
                            {
                                required: true,
                                whitespace:true,
                                message: 'Please input your Username!',
                            },
                            {
                                min:4, 
                                message: 'The user name must be greater than 4.',
                            },
                            {
                                max:12,
                                message: 'The user name must be smaller than 12.',
                            },
                            {
                                pattern: /^[a-zA-Z0-9_]+$/,
                                message: 'The username must be an alphabetic character, an array, or an underscore',
                            }
                        ]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="Username" />
                        </Item>
                        <Item 
                            name="password" 
                            rules={[
                                {
                                  validator: this.validator,
                                },
                              ]}>
                            <Input  prefix={<LockOutlined className="site-form-item-icon" style={{color: 'rgba(0,0,0,.25)'}} />} type="password" placeholder="Password" />
                        </Item>
                        <Item className='remenber-password-area'>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Item>

                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                            Or <a href="">register now!</a>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
} 

/* 
1.前台表单验证
2.收集表单数据收集

*/
/*
async and await
await 等待返回数据
async 写在函数旁边
1.作用
简化promise对象的作用，不再使用.then()来指定成功/失败的回调函数
以同步编码方式实现异步流程
2.哪里写await
先确定await 在返回promise的表达式左侧
不想要promise，想要promise异步执行的成功的value数据
3.async
await所在最近的所在函数定义的走册
*/