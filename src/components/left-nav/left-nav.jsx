import React, {Component, useState} from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './index.less'//.less不能省略，只有js，jsx可以省略
import { Breadcrumb, Layout, Menu } from 'antd';
import Icon from '@ant-design/icons';
import withRouter from '../../utils/withRouter';
import menuList from '../../config/menuConfig'
import SubMenu from 'antd/lib/menu/SubMenu';
const { Sider } = Layout;
class LeftNav extends Component {
    /* 根据menu的数据数组生成对应的标签数组
    使用map+递归调用 */
    getMenuNodes_map = (menuList) => {
      const path=this.props.location.pathname
      return menuList.map((item) => { 
        if (!item.children) {
          return (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.key}>
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          )
        } else{
          //查找一个与当前请求路径匹配的子Item
          const cItem=item.children.find( cItem => cItem.key===path)
          //如果存在，说明当前item子列表需要打开
          if (cItem) {
            this.openKey=item.key
          }
          
          return (
            <SubMenu
            key={item.key}
            icon={item.icon}
            title= {
              <span>{item.title}</span>
            }>
              {this.getMenuNodes_map(item.children)}
            </SubMenu>
          )
        }
      } )
    }
    getMenuNodes_reduce =(menuList) => {
      return menuList.reduce((pre,item)=>{
        //向pre中添加<Menu.Item>
        if (!item.children) {
          pre.push((
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon}></Icon>
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))
        } else {
          pre.push((
            <SubMenu
            key={item.key}
            title= {
              <span>
                <Icon type={item.icon}></Icon>
                <span>{item.title}</span>
              </span>
            }>
              {this.getMenuNodes_reduce(item.children)}
            </SubMenu>
          ))
        }
        return pre
      },[])
    }
    /*
    在第一次render()之前执行
    在第一次render之前准备数据（必须同步）
    */
    UNSAFE_componentWillMount() {
      const menuNodes=this.getMenuNodes_map(menuList)
      // console.log(storageUtils.getUser().role.menus)
  }
    render() {
      const menuNodes=this.getMenuNodes_map(menuList)
      //得到当前请求的路由路径
      const path=this.props.location.pathname
      const openKey=this.openKey
        return (
            <div className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt="" />
                    <h1>硅谷后台</h1>
                </Link>
                <Sider
                style={{
                  overflow: "auto",
                  height: "100vh",
                  position: "fixed",
                  left: 0,
                }}>
                    <div className="logo" />
                    <Menu 
                    theme="dark" 
                    mode="inline"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]} >
                        {this.getMenuNodes_map(menuList)}
                    </Menu>
                </Sider>
            </div>
        )
    }
}


/*
withRouter 高阶组件
包装非路由组件，返回一个新的组件
新的组件向非路由组件返回三个属性：history/location/match
*/
export default withRouter(LeftNav)