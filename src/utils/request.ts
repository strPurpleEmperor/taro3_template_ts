import Taro from "@tarojs/taro";
import { BASE_URL } from "@/global/const";

export function request<T>(url, method, data): Promise<T> {
  Taro.showLoading({
    title: "加载中",
  });
  return new Promise((resolve, reject) => {
    Taro.request({
      url: BASE_URL + url,
      method,
      data,
    }).then((res) => {
      Taro.hideLoading();
      if (res.statusCode === 200) {
        resolve(res.data);
      } else {
        Taro.showToast({
          icon: "error",
          title: res.data.message,
        });
        reject({
          message: res.statusCode,
        });
      }
    });
  });
}

export function get<T>(url, data): Promise<T> {
  return request(url, "GET", data);
}
export function post<T>(url, data): Promise<T> {
  return request(url, "POST", data);
}
export function del<T>(url, data): Promise<T> {
  return request(url, "DEL", data);
}
export function put<T>(url, data): Promise<T> {
  return request(url, "PUT", data);
}
