<template>
    <el-row class="login-container" justify="center">
        <el-card style="max-width: 480px">
            <template #header>
                <div class="card-header">
                    <img :src="imgUrl" alt="" />
                </div>
            </template>
            <div class="jump-link">
                <el-link type="primary" @click="handleChange">{{
                    !fromType ? "返回登陆" : "注册账号"
                }}</el-link>
            </div>
            <el-form
                ref="ruleFormRef"
                :model="loginFrom"
                style="max-width: 600px"
                class="demo-ruleForm"
                :rules="rules"
            >
                <el-form-item prop="userName">
                    <el-input
                        v-model="loginFrom.userName"
                        type="userName"
                        placeholder="手机号"
                        prefix-icon="UserFilled"
                    />
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input
                        v-model="loginFrom.passWord"
                        type="passWord"
                        placeholder="密码"
                        prefix-icon="Lock"
                    />
                </el-form-item>
                <el-form-item prop="validCode">
                    <el-input
                        v-if="!fromType"
                        v-model="loginFrom.validCode"
                        type="validCode"
                        placeholder="验证码"
                    >
                        <template #append>
                            <button
                                @click="countdownChange"
                                :disabled="isTimerRunning"
                            >
                                {{ buttonText }}
                            </button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        class="button-login"
                        @click="submitForm(ruleFormRef)"
                        >{{ !fromType ? "注册账号" : "登陆" }}</el-button
                    >
                </el-form-item>
            </el-form>
        </el-card>
    </el-row>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { reqGetCode, reqUseCode, reqUserLogin } from "../../api";
const imgUrl = new URL("../..//../public/Capture001.png", import.meta.url).href;
const $router = useRouter();
const fromType = ref(1);
const handleChange = () => {
    if (fromType.value === 1) {
        fromType.value = 0;
    } else {
        fromType.value = 1;
    }
};
const getCode = async () => {
    let result = await reqGetCode({ tel: loginFrom.userName });
    console.log(result);
};
let isTimerRunning = false;
let buttonText = ref("获取验证码");
let timer;
const phoneReg = /^1[3,4,5,6,7,8,9][0-9]{9}$/;
const countdownChange = () => {
    if (isTimerRunning) return;
    // buttonText = "5s";
    let countdown = 60;
    if (!loginFrom.userName || !phoneReg.test(loginFrom.userName)) {
        return ElMessage({
            message: "请检查手机号是否正确",
            type: "waring",
        });
    }
    timer = setInterval(() => {
        buttonText.value = `剩余时间${countdown}s`;
        countdown--;
        // console.log(buttonText.value);
        if (countdown < 0) {
            clearInterval(timer);
            isTimerRunning = false;
            buttonText.value = "获取验证码";
        }
    }, 1000);
    isTimerRunning = true;
    getCode();
};

// 校验规则
const validatorUser = (rule, value, callback) => {
    if (value === "") {
        callback(new Error("请输入手机号"));
    } else {
        const phoneReg = /^1[3,4,5,6,7,8,9][0-9]{9}$/;
        phoneReg.test(value)
            ? callback()
            : callback(new Error("请输入正确手机号"));
    }
};
const validatorPassWord = (rule, value, callback) => {
    if (value === "") {
        callback(new Error("请输入密码"));
    } else {
        const passWordReg = /^[a-zA-Z0-9_-]{4,16}$/;
        passWordReg.test(value)
            ? callback()
            : callback(new Error("密码格式不正确,请输入4-16位数"));
    }
};
const validatorvalidCode = (rule, value, callback) => {
    if (value === "" && fromType.value === 0) {
        callback(new Error("请输入验证码"));
    } else {
        callback();
    }
};

const loginFrom = reactive({
    userName: "",
    passWord: "",
    validCode: "",
});
// 表单校验
const rules = reactive({
    userName: [{ validator: validatorUser, trigger: "blur" }],
    passWord: [{ validator: validatorPassWord, trigger: "blur" }],
    validCode: [{ validator: validatorvalidCode, trigger: "blur" }],
});

const ruleFormRef = ref();
const submitForm = async (ruleFormRef) => {
    if (!ruleFormRef) return;
    console.log(ruleFormRef);
    await ruleFormRef.validate((valid, fields) => {
        if (valid) {
            console.log("submit!", loginFrom);
            if (!fromType.value) {
                reqUseCode(loginFrom).then(({ data }) => {
                    if (data.code === 10000) {
                        alert("注册成功");
                        // ElMessage.success("注册成功");
                        loginFrom.userName = "";
                        loginFrom.passWord = "";
                        loginFrom.validCode = "";
                        fromType.value = 1;
                    }
                });
            } else {
                reqUserLogin(loginFrom).then(({ data }) => {
                    if ((data.code = 10000)) {
                        alert("登陆成功");
                        console.log(data, data.data.token);
                        localStorage.setItem("pz-token", data.data.token);
                        localStorage.setItem(
                            "pz-userInfo",
                            JSON.stringify(data.data.userInfo)
                        );
                        $router.push("/");
                    }
                });
            }
            // console.log(result);
            // if ((result.code = 10000)) {
            //     ElMessage.success("注册成功");
            // }
        } else {
            console.log("error submit!", fields, valid);
        }
    });
    // ruleFormRef.validate((valid) => {
    //     if (valid) {
    //         console.log("submit!");
    //     } else {
    //         console.log("error submit!");
    //     }
    // });
};
watch(
    () => fromType.value,
    () => {
        console.log("我变了");
        loginFrom.userName = "";
        loginFrom.passWord = "";
        loginFrom.validCode = "";
    }
);
</script>

<style lang="less" scoped>
:deep(.el-card__header) {
    padding: 0;
}
.login-container {
    height: 100%;
    .card-header {
        background-color: #899fe8;
        img {
            width: 430px;
        }
    }
    .jump-link {
        text-align: right;
        margin-bottom: 10px;
    }
}
.button-login {
    width: 100%;
    background-color: aqua;
}
</style>
