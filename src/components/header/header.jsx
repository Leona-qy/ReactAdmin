import React, {Component} from 'react'
import withRouter from '../../utils/withRouter'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import storageUtils from '../../utils/storageUtils'
import './index.less'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import { reqWeather } from '../../api'
import menuList from '../../config/menuConfig'
import { Modal, Button } from 'antd';

const {confirm}=Modal
class Header extends Component {
    state = { 
        currentTime : formateDate(Date.now()),//当前时间字符串
        weather:'',//天气文本
        city:'',
    }
 
    getTime= ()=> {
        //每隔一秒获取当前时间并更新数据
        setInterval(()=>{
            const currentTime=formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }

    getWeather= async ()=> {
        //调用接口请求异步获取数据
        const {weather, city} = await reqWeather(110101)
        this.setState({weather,city})
    }

    getTitle = ()=>{
        const path=this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key===path) {//如果当前item对象的key与path一样，item的title就是需要显示的title
                title = item.title
            } else if (item.children) {
                //在所有子item中寻找匹配
                const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
                if (cItem) {
                    title=cItem.title
                }
            }
        })
        return title
    }


    /*
    退出登录
    */
   logout = () => {
    confirm ({
      title: '确定退出吗?',
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      onOk : ()=> {
        // 清除用户
        storageUtils.removeUser()
        // 跳转到登录界面
        this.props.navigate('/login')
      }, 
      onCancel() {
      },
    })
   }
    //循环定时器一个异步行为
    /*
    第一次render后执行一次
    一般在执行异步操作：发ajax请求/启动定时器
    */
   componentDidMount() {
    //获取当前时间
    this.getTime()
    this.getWeather()
   }

   /*
   当前组件卸载之前调用
   */
  componentWillUnmount () {
    clearInterval(this.intervalId)
  }

    render() {
        const {currentTime, dayPictureUrl,weather}=this.state
        const username= memoryUtils.user.userName
        //得到当前需要显示的title
        return (
            <div className='header'>
                <div className='head-top'>
                    <span>欢迎,admin</span>
                    <Button type="text" onClick={this.logout}>退出</Button>
                </div>
                <div className="head-bottom">
                    <div className="head-bottom-left">{this.getTitle()}</div>
                    <div className="head-bottom-right">
                        <span>{this.state.currentTime}</span>
                        <span >{this.state.city}</span>
                        <span>{this.state.weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)