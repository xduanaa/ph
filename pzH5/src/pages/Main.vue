<template>
    <router-view />
    <div style="height: 40px"></div>
    <van-tabbar v-model="active">
        <van-tabbar-item
            v-for="item in $router.options.routes[0].children"
            :key="item.path"
            :icon="item.meta.icon"
            :url="`#/${item.path}`"
            class="qx"
            >{{ item.meta.name }}</van-tabbar-item
        >
    </van-tabbar>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const $route = useRoute();
const $router = useRouter();
const active = ref(0);
onMounted(() => {
    // console.log($router);
    const list = $router.options.routes[0];
    active.value = list.children.findIndex(
        (item) => "/" + item.path === $route.path
    );
    // console.log(active.value);
});
</script>
<style lang="less" scope>
.qx {
    caret-color: rgba(0, 0, 0, 0);
}
</style>
