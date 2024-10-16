import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import paneHead from "./components/paneHead.vue";

router.beforeEach((to, from) => {
    const token = localStorage.getItem("pz-token");
    // console.log(token);

    if (!token && to.path !== "/login") {
        return "/login";
    } else if (token && to.path === "/login") {
        return "/";
    } else {
        return true;
    }
});

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

import useRouterStore from "./store/useRouterStore";
const routerStore = useRouterStore();
const localData = JSON.parse(localStorage.getItem("useRouterStore"));
if (localData) {
    routerStore.dynamicMenu(localData.routerList);
    // console.log(routerStore.routerList);
    routerStore.routerList.forEach((item) => {
        router.addRoute("main", item);
    });
}

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.component("paneHead", paneHead);
app.use(router);

app.mount("#app");
