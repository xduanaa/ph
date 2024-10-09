<template>
    <div class="common-layout">
        <el-container>
            <Aside></Aside>
            <el-container>
                <el-header><navHeader /></el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import Aside from "@/components/aside.vue";
import navHeader from "@/components/navHeader.vue";
</script>
<style lang="less" scoped>
.common-layout {
    height: 100%;
    .el-container {
        height: 100%;
        // .el-main {
        //     min-height: 400px;
        // }
    }
}
</style>
