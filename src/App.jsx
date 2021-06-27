import React, { Component } from "react"
import "./App.scss"
import * as $ from "jquery"
import { BrowserRouter as Router, HashRouter, Switch, Route, Link } from "react-router-dom"
import home from "./components/home/home.jsx"

import 'antd/dist/antd.css';

import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

export default class App extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };



    componentDidMount() {



    }


    selected=["#/"]


    render() {
        console.log(window.location, window.location.pathname, window.location.href)
        if(window?.location?.hash){
            this.selected=[window.location.hash]
            if(window.location.hash=="/"){
                this.selected.push("#/")
            }
        }

        return (
            <div className="App">
                <Layout>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={this.selected}>   
                            <Menu.Item key="#/" >
                                <a href="#">Home</a>
                            </Menu.Item>                         
                            {/* <Menu.Item key="#/blog" icon={<UserOutlined />}>
                                <a href="#/blog">Blog</a>
                            </Menu.Item> */}
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{ padding: 0 }}>

                        </Header>
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                            }}
                        >
                            <Router>
                                <Switch>
                                    <HashRouter>
                                        <Switch>
                                            <Route path="/" exact component={home} />
                                        </Switch>
                                    </HashRouter>
                                </Switch>

                            </Router>
                        </Content>
                    </Layout>
                </Layout>

            </div>

        )
    }
}
