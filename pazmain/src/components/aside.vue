<template>
    <el-menu
        :style="{ width: !headerStore.isCollapse ? '230px' : '64px' }"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="aside-container"
        :default-active="active"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        :collapse="headerStore.isCollapse"
    >
        <p class="logo-lg">
            {{ headerStore.isCollapse ? "DIDI" : "DIDI陪诊" }}
        </p>
        <TreeMenu :index="1" :meunData="meunData" />
    </el-menu>
</template>

<script setup>
import TreeMenu from "@/components/treeMenu.vue";
// import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
// import { useRouter } from "vue-router";
import useHeaderStore from "../store/useHeaderStore";
import useRouterStore from "../store/useRouterStore";
let headerStore = useHeaderStore();
let routerStore = useRouterStore();

// vuex
// import { useStore } from "vuex";
// const $store = useStore();
// const isCollapse = computed(() => {
//     $store.state.menu.isCollapse;
// });
// const $router = useRouter();
// const meunData = reactive($router.options.routes[0].children);
const active = ref(headerStore.menuActive);
const meunData = reactive(routerStore.routerList);
const handleOpen = () => {};
const handleClose = () => {};
</script>

<style lang="less" scoped>
.aside-container {
    height: 100vh;
    .logo-lg {
        font-size: 20px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: #fff;
    }
}
</style>
