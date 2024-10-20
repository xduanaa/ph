<template>
    <van-row class="order-item" v-for="item in orderList" :key="item.id">
        <van-col span="5">
            <van-image
                :src="item.serviceImg"
                width="60px"
                height="60px"
                style="line-height: 50px"
            ></van-image>
        </van-col>
        <van-col span="14">
            <div style="line-height: 20px" class="order-info">
                <div class="text1">{{ item.service_name }}</div>
                <div class="text2">
                    {{ item.hospital_name }}
                </div>
                <div class="text2">{{ item.starttime }}</div>
            </div>
        </van-col>
        <van-col span="5">
            <div>
                <div
                    :style="{
                        color: styleColor[item.trade_state],
                    }"
                >
                    {{ item.trade_state }}
                </div>
                <div></div>
            </div>
        </van-col>
    </van-row>
</template>

<script setup>
import { ref, reactive, defineProps, watch } from "vue";
const props = defineProps(["orderList"]);
const styleColor = reactive({
    待支付: "#ffa200",
    待服务: "#1da6fd",
    已完成: "#21c521",
    已取消: "orange",
});
watch(
    () => props.orderList,
    (newVal) => {
        console.log("Updated orderList:", newVal);
    }
);
console.log(props.orderList);
</script>

<style scoped></style>
