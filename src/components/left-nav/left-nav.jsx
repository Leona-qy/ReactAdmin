import React, {Component, useState} from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './index.less'//.less不能省略，只有js，jsx可以省略
import {
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';

const { Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  
  const items = [
    getItem('首页', '1', <PieChartOutlined />),
    getItem('商品', 'sub1', <UserOutlined />, [
      getItem('品类管理', '2'),
      getItem('商品管理', '3'),
    ]),
    getItem('用户管理', '4', <PieChartOutlined />),
    getItem('角色管理', '5', <FileOutlined />),
    getItem('图形图表', 'sub2', <TeamOutlined />, [getItem('柱形图', '6'), getItem('折线图', '7'), getItem('饼图', '8')]),
  ];

export default class LeftNav extends Component {
    render() {
        return (
            <div className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt="" />
                    <h1>硅谷后台</h1>
                </Link>
                <Sider>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelect edKeys={['1']} mode="inline" items={items} >
                        <Link to=''></Link>
                    </Menu>
                </Sider>
            </div>
        )
    }
}