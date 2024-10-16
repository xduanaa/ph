<template>
    <h1 class="tital">用户登陆</h1>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                v-model="from.userName"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="from.passWord"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
        </van-cell-group>
        <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>
<script setup>
import { reactive } from "vue";
import { reqLogin } from "../../api";
import { useRouter } from "vue-router";
const $router = useRouter();
const from = reactive({
    userName: "",
    passWord: "",
});
const getLogin = async () => {
    const result = await reqLogin(from);
    console.log(result);
    if (result.data.code === 10000) {
        localStorage.setItem("h5-token", result.data.data.token);
        localStorage.setItem(
            "h5-userinfo",
            JSON.stringify(result.data.data.userInfo)
        );
        $router.push("/home");
    }
};

const onSubmit = () => {
    getLogin();
};
</script>
<style lang="less" scoped>
.tital {
    display: flex;
    justify-content: center;
    font-size: 30px;
    margin: 15px 0;
}
</style>
