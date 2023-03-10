import Taro from "@tarojs/taro";
import { SelectorQuery } from "@tarojs/taro/types";
import { getAuth } from "@/service";
import { APP_ID } from "@/global/const";

export function uuid(len = 8, radix = 16): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    ""
  );
  const value: string[] = [];
  let i = 0;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) value[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    /* eslint-disable-next-line */
    value[8] = value[13] = value[18] = value[23] = '-'
    value[14] = "4";

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!value[i]) {
        r = 0 | (Math.random() * 16);
        value[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return value.join("");
}
export function delay(delayTime = 25): Promise<null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // @ts-ignore
      resolve();
    }, delayTime);
  });
}
export function delayGetClientRect({
  selectorStr,
  delayTime = 500,
}): Promise<any[]> {
  const selector: SelectorQuery = Taro.createSelectorQuery();

  return new Promise((resolve) => {
    delay(delayTime).then(() => {
      selector
        .select(selectorStr)
        .boundingClientRect()
        .exec((res: any[]) => {
          resolve(res);
        });
    });
  });
}

export function delayGetScrollOffset({ delayTime = 500 }): Promise<any[]> {
  return new Promise((resolve) => {
    delay(delayTime).then(() => {
      Taro.createSelectorQuery()
        .selectViewport()
        .scrollOffset()
        .exec((res: any[]) => {
          resolve(res);
        });
    });
  });
}
export function delayQuerySelector(
  selectorStr: string,
  delayTime = 500
): Promise<any[]> {
  return new Promise((resolve) => {
    const selector: SelectorQuery = Taro.createSelectorQuery();
    delay(delayTime).then(() => {
      selector
        .select(selectorStr)
        .boundingClientRect()
        .exec((res: any[]) => {
          resolve(res);
        });
    });
  });
}
export function login() {
  return Taro.login().then((res) => {
    if (res.errMsg === "login:ok") {
      return getAuth({ code: res.code, appid: APP_ID }).then((req: any) => {
        const v = (req || {}).openid || "";
        Taro.setStorageSync("OPENID", v);
        return v;
      });
    }
    return "";
  });
}
export function needLogin() {
  const openid = Taro.getStorageSync("OPENID");
  if (openid) {
    return new Promise((resolve) => {
      Taro.checkSession({
        success: function () {
          console.log("token有效");
          resolve(openid);
        },
        fail: function () {
          console.log("token失效重新登录");
          login().then((res) => {
            resolve(res);
          });
        },
      });
    });
  }
  return login();
}

export function isOutTime(date: string | number) {
  try {
    return new Date(Number(date)).getTime() < Date.now();
  } catch (e) {
    console.log(e);
    return false;
  }
}

export function buildUrl(url: string, params: Record<string, any>) {
  let res = url + "?";
  Object.keys(params).forEach((key, index) => {
    if (index) res += "&";
    res += `${key}=${params[key]}`;
  });
  return res;
}
