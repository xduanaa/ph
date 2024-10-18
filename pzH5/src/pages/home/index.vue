<template>
    <div class="home-header">
        <div class="header-left">
            <van-icon name="location" size="20px" />
            <span>中部地区</span>
            <van-icon name="arrow" size="20px" />
        </div>
        <form action="/">
            <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                shape="round"
                class="seach"
            />
        </form>
    </div>
    <van-swipe :autoplay="3000" lazy-render class="my-swiper">
        <van-swipe-item v-for="image in form.slides" :key="image.id">
            <img :src="image.pic_image_url" class="img" />
        </van-swipe-item>
    </van-swipe>
    <van-row justify="space-around">
        <van-col
            span="11"
            v-for="(item, index) in form.nav2s"
            :key="item.id"
            class="center-img"
            @click="goOrderTwo(index)"
        >
            <img :src="item.pic_image_url" radius="5" />
        </van-col>
    </van-row>
    <van-row
        justify="space-around"
        v-for="item in form.hospitals"
        style="margin: 5px"
        class="yy-list"
        @click="goHos(item)"
    >
        <van-col span="6">
            <van-image :src="item.avatar_url" width:100 height="95" />
        </van-col>
        <van-col span="15" class="yy">
            <div class="yy-name">{{ item.name }}</div>
            <div class="yy-type">
                <span>{{ item.rank }}</span>
                &nbsp
                <span>{{ item.label }}</span>
            </div>
            <div class="yy-text">{{ item.intro }}</div>
        </van-col>
    </van-row>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import { reqHIndex } from "../../api";
import { useRouter } from "vue-router";
const $router = useRouter();
let value = ref();
onMounted(() => {
    getHindex();
});
const form = reactive({
    hospitals: [],
    nav2s: [],
    navs: [],
    now: "",
    slides: [],
});
const getHindex = async () => {
    let result = await reqHIndex();
    // console.log(result);
    if ((result.data.code = 10000)) {
        Object.assign(form, result.data.data);
        // console.log(form);
    }
};
const goOrderTwo = (index) => {
    // console.log(index);
    $router.push(`/createOrder?id=${form.hospitals[index].id}`);
};
const goHos = (item) => {
    $router.push(`/createOrder?id=${item.id}`);
};
</script>
<style lang="less" scope>
.home-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    margin: 5px;
    background-color: #ffff;
    .header-left {
        display: flex;
        align-items: center;
        flex: 1;
        width: 100%;

        span {
            font-size: 20px;
            display: inline-block;
            white-space: nowrap;
        }
    }
    .seach {
        width: 100%;
        flex: 2;
    }
}
.my-swiper {
    margin: 5px;
    height: 170px;
    .img {
        max-width: 100%;
        // height: auto;
    }
}
.center-img {
    img {
        max-width: 100%;
    }
}
.yy-list {
    padding-bottom: 10px;
    margin: 20px 0;
    border-radius: 10px;
    // overflow: hidden;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.04), 0 1px 6px 0 rgba(0, 0, 0, 0.04);
    .yy {
        .yy-name {
            font-size: 20px;
            line-height: 30px;
            font-weight: bold;
        }
        .yy-type {
            font-weight: bold;
            line-height: 25px;
            font-size: 15px;
            color: #0ca7ae;
        }
        .yy-text {
            font-size: 14px;
            color: #999999;
        }
    }
}
.bottom-text {
    line-height: 50px;
    text-align: center;
    color: #999999;
}
</style>
