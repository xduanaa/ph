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
    GETMENUPERMISSIONS: "/menu/permissions",
    GETPHOTOLIST: "/photo/list",
    GETCOMPANION: "/companion",
    GETCOMLIST: "/companion/list",
    GETDELTE: "/delete/companion",
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
export const reqMenuPressions = () => request.get(API.GETMENUPERMISSIONS);
export const reqPhotoList = () => request.get(API.GETPHOTOLIST);
export const reqCompanion = (data) => request.post(API.GETCOMPANION, data);
export const reqComList = (params) => request.get(API.GETCOMLIST, { params });
export const reqDelete = (data) => request.post(API.GETDELTE, data);
