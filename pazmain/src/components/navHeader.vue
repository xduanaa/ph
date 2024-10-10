<template>
    <div class="header-container">
        <div class="heraer-left flex-box">
            <el-icon class="icon" size="20" @click="changer"><Fold /></el-icon>
            <!-- <el-icon class="icon" size="20" @click="$store.commit('collapseMenu')"><Fold /></el-icon> -->
            <ul class="flex-box">
                <li
                    v-for="(item, index) in headerStore.selectMenu"
                    :key="item.path"
                    class="tag flex-box"
                    :class="{ selected: $route.path === item.path }"
                >
                    <el-icon class="icon-left"
                        ><component :is="item.icon"></component
                    ></el-icon>
                    <!-- <div class="text">{{ item.name }}</div> -->
                    <router-link
                        class="text flex-box"
                        :to="{ path: item.path }"
                    >
                        {{ item.name }}
                    </router-link>
                    <el-icon
                        class="close"
                        size="12"
                        @click="closeTag(item, index)"
                        ><Close
                    /></el-icon>
                </li>
            </ul>
        </div>
        <div class="heraer-right">
            <el-dropdown @command="handleClick">
                <div class="el-dropdown-link flex-box">
                    <el-avatar
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    />
                    <p class="user-name">admin</p>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="a">退出</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup>
import {} from "module";
import useHeaderStore from "../store/useHeaderStore";
import { useRoute, useRouter } from "vue-router";
// vuex
// import { useStore } from "vuex";
// const $store = useStore();
const $router = useRouter();
const $route = useRoute();
let headerStore = useHeaderStore();
// console.log(headerStore);
const changer = () => {
    headerStore.isCollapse = !headerStore.isCollapse;
};
const closeTag = (item, index) => {
    headerStore.closeTag(item);
    // console.log($route.path, "router");
    // console.log(item.path, "item");
    // console.log(index, "index");
    // console.log(headerStore.selectMenu.length, "headerStore.selectMenu.length");
    if ($route.path !== item.path) {
        return;
    }
    if (index === headerStore.selectMenu.length) {
        if (headerStore.selectMenu.length === 0) {
            $router.push({
                path: "/",
            });
        } else {
            $router.push({
                path: headerStore.selectMenu[index - 1].path,
            });
        }
    } else {
        $router.push({
            path: headerStore.selectMenu[index].path,
        });
    }
};
const handleClick = (command) => {
    if (command === "a") {
        localStorage.removeItem("pz-token");
        localStorage.removeItem("pz-userinfo");

        window.location.href = window.location.origin;
    }
};
</script>
<style lang="less" scoped>
.flex-box {
    display: flex;
    align-items: center;
    height: 100%;
}
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background-color: #fff;
    padding-right: 25px;
    .heraer-left {
        height: 100%;
        .icon {
            width: 40px;
            height: 100%;
        }
        .icon:hover {
            background-color: #f5f5f5;
            cursor: pointer;
        }
        .tag {
            padding: 0 10px;
            height: 100%;
            .text {
                margin: 0 5px;
                text-decoration: none;
                user-select: none;
            }
            .close {
                visibility: hidden;
            }
            &.selected {
                a {
                    color: #409eff;
                }
                i {
                    color: #409eff;
                }
                background-color: #f5f5f5;
            }
        }
        .tag:hover {
            background-color: #f5f5f5;
            .close {
                visibility: inherit;
                cursor: pointer;
                color: #000;
            }
        }
    }
    .heraer-right {
        .user-name {
            margin-left: 10px;
        }
    }
    a {
        height: 100%;
        color: #333;
        font-size: 15px;
    }
}
</style>
