import request from "../until/request";

const API = {
    GETLOGIN: "/login",
    GETHINDEX: "/Index/index",
    GETCREATEORDER: "/createOrder",
    GETORDERDETAIL: "/order/detail",
    GETORDERLIST: "/order/list",
    GETCOMPANION: "/h5/companion",
};

export const reqLogin = (data) => request.post(API.GETLOGIN, data);
// h5首页
export const reqHIndex = () => request.get(API.GETHINDEX);
//创建订单
export const reqCreateOrder = (data) => request.post(API.GETCREATEORDER, data);
//订单详情
export const reqOrderDetail = (oid) =>
    request.get(API.GETORDERDETAIL + `oid=${oid}`);
//订单列表
export const reqOrderList = (params) =>
    request.get(API.GETORDERLIST, { params });
//陪护师列表
export const reqCompanion = () => request.get(API.GETCOMPANION);
