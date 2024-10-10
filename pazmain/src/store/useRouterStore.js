import { defineStore } from "pinia";

const useRouterStore = defineStore("useRouterStore", {
    state: () => {
        return { routerList: [] };
    },
    actions: {
        dynamicMenu(payload) {
            const modules = import.meta.glob("../views/**/**/*.vue");
            // console.log(modules);
            console.log(payload, 111);

            function routerSet(router) {
                router.forEach((route) => {
                    if (!route.children) {
                        const url = `../views${route.meta.path}/index.vue`;
                        // console.log(url, "url");
                        // console.log(modules);
                        // console.log(modules[url]);

                        route.component = modules[url];
                    } else {
                        routerSet(route.children);
                    }
                });
            }
            routerSet(payload);
            this.routerList = payload;
        },
    },
    persist: true,
});

export default useRouterStore;
