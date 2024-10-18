<template>
    <div class="container">
        <div class="header">
            <div style="margin-bottom: 10px">我的订单</div>
            <van-tabs v-model:active="active" @click-tab="onClickTab">
                <van-tab title="全部" name="">
                    <Row :orderList="orderList" />
                    <!-- <van-row
                        class="order-item"
                        v-for="item in orderList"
                        :key="item.id"
                    >
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
                    </van-row> -->
                </van-tab>
                <van-tab title="待支付" name="1">
                    <Row :orderList="orderList" />
                </van-tab>
                <van-tab title="带服务" name="2">
                    <Row :orderList="orderList" />
                </van-tab>
                <van-tab title="已完成" name="3">
                    <Row :orderList="orderList" />
                </van-tab>
                <van-tab title="已取消" name="4">
                    <Row :orderList="orderList" />
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import { reqOrderList } from "@/api";
import Row from "../../components/row.vue";
const orderList = ref([]);
const getOrderList = async (state) => {
    const res = await reqOrderList({ state });
    orderList.value = res.data.data;
    console.log(orderList.value);
};
onMounted(() => {
    getOrderList("");
});

const styleColor = reactive({
    待支付: "#ffa200",
    待服务: "#1da6fd",
    已完成: "#21c521",
    已取消: "orange",
});

const onClickTab = (item) => {
    getOrderList(item.name);
};
</script>
<style lang="less" scope>
.container {
    flex-direction: column;
    height: 100vh;
    background: #f5f5f5;
    margin-top: 0;
    .header {
        width: 100%;
        line-height: 40px;
        text-align: center;
    }
}
.order-item {
    margin: 10px 0;
    ::deep(.van-col--5) {
        display: flex;
        align-items: center;
    }
    .order-info {
        display: flex;
        flex-direction: column;
        align-items: start;
        .text1 {
            font-size: 16px;
            line-height: 25px;
            font-weight: bold;
        }
        .text2 {
            font-size: 14px;
            line-height: 20px;
            color: #999;
        }
    }
}
</style>
