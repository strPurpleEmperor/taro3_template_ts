import Taro, { useDidShow } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { needLogin } from "@/utils";

export function useParams() {
  const [params, setParams] = useState<Record<string, any>>({});
  useEffect(() => {
    const p: Record<string, any> =
      Taro.getCurrentInstance()?.router?.params || {};
    setParams(p);
  }, []);
  return params;
}

export function useTitle(title: string) {
  useEffect(() => {
    title && Taro.setNavigationBarTitle({ title });
  }, [title]);
}

export function useOpenId() {
  const [openId, setOpenId] = useState("");
  useEffect(() => {
    needLogin().then((res: any) => {
      setOpenId(res);
    });
  }, []);
  return openId;
}

export function useRefresh(
  fn: (...args: any[]) => Promise<any>,
  ...arg: any[]
) {
  const [isRefresh, setRefresh] = useState<boolean>(false);
  function onRefresherRefresh() {
    setRefresh(true);
    fn(...arg).then(() => {
      setRefresh(false);
    });
  }
  return {
    refresherEnabled: true,
    refresherTriggered: isRefresh,
    onRefresherRefresh: onRefresherRefresh,
  };
}

export function useUpdateManager() {
  useDidShow(() => {
    const updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate);
    });
    updateManager.onUpdateReady(function () {
      Taro.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        },
      });
    });
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    });
  });
}
