import React, {Component} from 'react'
import { Route, Routes } from 'react-router-dom' 
import {Navigate} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import {Layout} from 'antd'
import LeftNav from '../../components/left-nav/left-nav'

import Header from '../../components/header/header'
import Home from "../home/home";
import Category from "../category/category";
import Role from "../role/role";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import Users from "../user/user";
import Product from "../product/product";
const { Footer, Sider, Content } = Layout;
/* 后台的路由组件*/

export default class Login extends Component {
    render() {
        const user=memoryUtils.user
        //如果内存没存储user==>当前没登陆
        if(!user || !user._id) {
            //自动跳转到登陆（在render中）
            return <Navigate to ='/login'/>
        }
        return (
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{backgroundColor: '#fff'}}>
                        <Routes>
                            <Route path="/home" element={Home} />
                            <Route path="/category" element={Category} />
                            <Route path="/product" element={Product} />
                            <Route path="/role" element={Role} />
                            <Route path="/user" element={Users} />
                            <Route path="/charts/bar" element={Bar} />
                            <Route path="/charts/line" element={Line} />
                            <Route path="/charts/pie" element={Pie} />
                            <Navigate to='/home'></Navigate>
                        </Routes>
                    </Content>
                    <Footer style={{textAlign: 'center', color: '#ccc'}}>推荐使用谷歌浏览器，可以获得更加页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}