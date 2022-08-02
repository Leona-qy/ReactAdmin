import React, {Component} from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Checkbox } from 'antd';
import './login.less'
import logo from './images/logo.png'
import  { reqLogin } from '../../api' //默认暴露不要写{},指定暴露(分别暴露)用解构{}

/* 登陆的路由组件*/
const Item = Form.Item //不能写在import之前
const onFinish = (values) => {
    console.log(values)
}
export default class Login extends Component {

    handleSubmit = (event) => {
        event.preventDefault()
    }
    onFinish = (values) => {
        console.log(values)
    }

    validator = (rule, value, callback) => {
        if (!value) {
            //callback如果不传参说明校验成功，如果传参说明校验失败，并且会提示错误信息
            callback('Please input your Username!')
        } else if (value.length<4) {
            callback('The user name must be greater than 4.')
        } else if (value.length>12) {
            callback('The user name must be smaller than 12.')
        } else if (! /^[a-zA-Z0-9_]+$/.test(value)) {
            callback('The username must be an alphabetic character, an array, or an underscore.')
        } else {
            callback() //必须调用
        }
        
    }

    render() {
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
                        onFinish={onFinish}>
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