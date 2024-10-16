import axios from "axios";

const request = axios.create({
    baseURL: "https:/v3pz.itndedu.com/v3pz",
    timeout: 5000,
    headers: { terminal: "h5" },
});

request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("h5-token");
        const whiteList = ["login"];
        if (token && !whiteList.includes(config.url)) {
            config.headers["h-token"] = token;
            // console.log(1111);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response) => {
        if (response.data.code === -1) {
            return Promise.reject(response.data.message);
        }
        if (response.data.code === -2) {
            localStorage.removeItem("h5-token");
            localStorage.removeItem("h-token");
            localStorage.removeItem("h5-userinfo");
            window.location.href = window.location.origin;
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default request;
