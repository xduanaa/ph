import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
// import store from "./store";
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const app = createApp(App);
const pinia = createPinia();
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(router);
// app.use(store);
app.use(pinia);
app.mount("#app");
