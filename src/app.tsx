import React, { Component } from "react";
import "./app.scss";
import Taro from "@tarojs/taro";
import {globalContext} from '@/context/global'

const {Provider} = globalContext
class App extends Component <any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      statusBarHeight: 44,
      navHeight: 40
    }
  }

  componentDidMount() {
    let _menuInfo = Taro.getMenuButtonBoundingClientRect();
    let _windowInfo = Taro.getWindowInfo()
    const {statusBarHeight = 0} = _windowInfo
    let _navHeight = (_menuInfo.top - statusBarHeight) * 2 + _menuInfo.height;
    this.setState({
      statusBarHeight,
      navHeight:_navHeight
    });

  }

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    const {statusBarHeight,navHeight} = this.state
    return (
      <Provider
        value={{
          statusBarHeight,
          navHeight,
          paddingTop: statusBarHeight + navHeight + 'px'
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default App;
