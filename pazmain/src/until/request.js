import axios from "axios";
import { ElMessage } from "element-plus";

const request = axios.create({
    baseURL: "https:/v3pz.itndedu.com/v3pz",
    timeout: 50000,
});

// 添加请求拦截器
request.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        const token = localStorage.getItem("pz-token");
        // 添加白名单
        const whiteUrl = ["/get/code", "/user/authentication", "/login"];
        if (token && !whiteUrl.includes(config.url)) {
            config.headers["x-token"] = token;
        }
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
request.interceptors.response.use(
    (response) => {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        if (response.data.code === -1) {
            ElMessage.warning(response.data.message);
        }
        if (response.data.code === -2) {
            localStorage.removeItem("pz-token");
            localStorage.removeItem("x-token");
            window.location.href == window.location.origin;
        }
        return response;
    },
    (error) => {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export default request;
