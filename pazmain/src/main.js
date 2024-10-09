import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
// import store from "./store";
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import paneHead from "./components/paneHead.vue";
router.beforeEach((to, from) => {
    const token = localStorage.getItem("pz-token");
    console.log(token);

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
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.component("paneHead", paneHead);
app.use(router);
// app.use(store);
app.use(pinia);
app.mount("#app");
