import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "@/views/dashboard/index.vue";
import Admin from "@/views/auth/admin//index.vue";
import Group from "@/views/auth/group/index.vue";
import Staff from "@/views/vppz/staff/index.vue";
import Order from "@/views/vppz/order/index.vue";
const routes = [
    {
        path: "/",
        component: () => import("../views/Main.vue"),
        name: "main",
        children: [
            //控制台路由
            {
                path: "dashboard",
                meta: {
                    id: "1",
                    name: "控制台",
                    icon: "Platform",
                    path: "/dashboard",
                    describe: "展示",
                },
                component: Dashboard,
            },
            //权限管理
            {
                path: "auth",
                meta: { id: "2", name: "权限管理", icon: "Grid" },
                children: [
                    //账号管理
                    {
                        path: "",
                        alias: ["admin"],
                        meta: {
                            id: "1",
                            name: "账号管理",
                            icon: "Avatar",
                            path: "/auth/admin",
                            describe: "管理员",
                        },
                        component: Admin,
                    },
                    //菜单管理
                    {
                        path: "group",
                        meta: {
                            id: "2",
                            name: "菜单管理",
                            icon: "Menu",
                            path: "/auth/group",
                            describe: "管理菜单",
                        },
                        component: Group,
                    },
                ],
            },
            //陪护管理
            {
                path: "vppz",
                meta: { id: "3", name: "DIDI陪诊", icon: "BellFilled" },
                children: [
                    //陪护管理
                    {
                        path: "",
                        alias: ["staff"],
                        meta: {
                            id: "1",
                            name: "陪护管理",
                            icon: "Checked",
                            path: "/vppz/staff",
                            describe: "陪护师",
                        },
                        component: Staff,
                    },
                    //订单管理
                    {
                        path: "order",
                        meta: {
                            id: "2",
                            name: "订单管理",
                            icon: "List",
                            path: "/vppz/order",
                            describe: "订单",
                        },
                        component: Order,
                    },
                ],
            },
        ],
    },
    {
        path: "/login",
        component: () => import("@/views/login/index.vue"),
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return {
            left: 0,
            top: 0,
        };
    },
});
