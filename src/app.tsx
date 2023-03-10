import React, { useEffect, useState } from "react";
import "./app.scss";
import Taro from "@tarojs/taro";
import { globalContext } from "@/context/global";
import { useUpdateManager } from "@/context/hooks";

const { Provider } = globalContext;
function App(props: any) {
  const [statusBarHeight, setStatusBarHeight] = useState(44);
  const [navHeight, setNavHeight] = useState(40);
  useEffect(() => {
    let _menuInfo = Taro.getMenuButtonBoundingClientRect();
    let _windowInfo = Taro.getWindowInfo();
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { statusBarHeight = 0 } = _windowInfo;
    let _navHeight = (_menuInfo.top - statusBarHeight) * 2 + _menuInfo.height;
    setStatusBarHeight(statusBarHeight);
    setNavHeight(_navHeight);
  }, []);
  useUpdateManager();
  return (
    <Provider
      value={{
        statusBarHeight,
        navHeight,
        paddingTop: statusBarHeight + navHeight + "px",
      }}
    >
      {props.children}
    </Provider>
  );
}
export default App;
