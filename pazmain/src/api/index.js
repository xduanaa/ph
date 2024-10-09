import request from "../until/request";

const API = {
    GETCODE: "/get/code",
    USECODE: "/user/authentication",
    USERLOGIN: "/login",
    GETADMIN: "/auth/admin",
    GETMENU: "/user/getmenu",
    GETSETMENU: "/user/setmenu",
    GETMENULIST: "/menu/list",
    GETSELECTLIST: "/menu/selectlist",
    GETUSERUPDATE: "/update/user",
};

export const reqGetCode = (data) => request.post(API.GETCODE, data);
export const reqUseCode = (data) => request.post(API.USECODE, data);
export const reqUserLogin = (data) => request.post(API.USERLOGIN, data);
export const reqAdmin = (params) => request.get(API.GETADMIN, { params });
export const reqMenu = () => request.get(API.GETMENU);
export const reqSetMenu = (data) => request.post(API.GETSETMENU, data);
export const reqMenuList = (params) => request.get(API.GETMENULIST, { params });
export const reqSelectList = () => request.get(API.GETSELECTLIST);
export const reqUserUpdate = (data) => request.post(API.GETUSERUPDATE, data);
