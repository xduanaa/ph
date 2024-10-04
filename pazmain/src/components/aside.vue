<template>
    <el-menu
        :style="{ width: !headerStore.isCollapse ? '230px' : '64px' }"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="aside-container"
        default-active="2"
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
import { useRouter } from "vue-router";
import { reactive, computed } from "vue";
import useHeaderStore from "../store/useHeaderStore";
let headerStore = useHeaderStore();

// console.log($router);

// vuex
// import { useStore } from "vuex";
// const $store = useStore();
// const isCollapse = computed(() => {
//     $store.state.menu.isCollapse;
// });
const $router = useRouter();
const meunData = reactive($router.options.routes[0].children);
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
