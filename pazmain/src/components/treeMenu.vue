<template>
    <!-- <el-sub-menu index="1">
        <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
    </el-sub-menu> -->
    <!-- <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>Navigator Two</span>
    </el-menu-item> -->

    <template v-for="(item, index) of props.meunData">
        <el-menu-item
            @click="handleCick(item, `${props.index}-${item.meta.id}`)"
            v-if="!item.children || item.children.length == 0"
            :index="`${props.index}-${item.meta.id}`"
            :key="`${props.index}-${item.meta.id}`"
        >
            <el-icon size="20">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.name }}</span>
        </el-menu-item>
        <el-sub-menu v-else :index="`${props.index}-${item.meta.id}`">
            <template #title>
                <el-icon><component :is="item.meta.icon"></component></el-icon>
                <span>{{ item.meta.name }}</span>
            </template>
            <tree-menu
                :index="`${props.index}-${item.meta.id}`"
                :meunData="item.children"
            />
        </el-sub-menu>
    </template>
</template>

<script setup>
import { useRouter } from "vue-router";
import useHeaderStore from "@/store/useHeaderStore";
const $router = useRouter();
const headerStore = useHeaderStore();
const props = defineProps(["meunData", "index"]);
// console.log(props.meunData);

const handleCick = (item, active) => {
    headerStore.addMenu(item.meta);
    headerStore.updateMenuActive(active);
    $router.push(item.meta.path);
};
// console.log(props);
</script>

<style lang="less" scoped></style>
