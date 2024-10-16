<template>
    <pane-head :route="$route" />
    <div>
        <el-button icon="Plus" type="primary" @click="open(null)" size="small"
            >新增</el-button
        >
        <el-popconfirm
            confirm-button-text="是"
            cancel-button-text="否"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="Are you sure to delete this?"
            @confirm="confirmEvent"
        >
            <template #reference>
                <el-button :icon="Delete" type="danger" size="small"
                    >删除</el-button
                >
            </template>
        </el-popconfirm>
    </div>
    <el-table
        :data="tableData.list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
    >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="name" prop="name"></el-table-column>
        <el-table-column label="头像">
            <template #default="scope">
                <el-image
                    style="width: 50px; height: 50px"
                    :src="scope.row.avatar"
                ></el-image>
            </template>
        </el-table-column>
        <el-table-column label="性别">
            <template #default="scope">
                <div>{{ scope.row.sex === "1" ? "男" : "女" }}</div>
            </template>
        </el-table-column>
        <el-table-column label="手机号" prop="mobile"></el-table-column>
        <el-table-column label="状态" prop="active">
            <template #default="scope">
                <div>{{ scope.row.active ? "正常" : "失效" }}</div>
            </template>
        </el-table-column>
        <el-table-column label="创建时间">
            <template #default="scope">
                <div class="flex-box">
                    <el-icon><Clock /></el-icon>
                    <span style="margin-left: 10px">
                        {{ scope.row.create_time }}
                    </span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <div>
                    <el-button type="primary" @click="open(scope.row)">
                        编辑</el-button
                    >
                </div>
            </template>
        </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
        <el-pagination
            v-model:current-page="pages.pageNum"
            v-model:page-size="pages.pageSize"
            :page-sizes="[10, 20, 30, 400]"
            layout="  prev, pager, next,sizes,->, total,jumper"
            :total="100"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
    <el-dialog
        v-model="dialogVisible"
        width="500"
        :before-close="handleClose"
        title="陪护师添加"
        align-center
    >
        <el-form
            :model="form"
            ref="formRef"
            :rules="rules"
            label-width="100px"
            label-position="left"
        >
            <el-form-item v-show="false" prop="id">
                <el-input v-model="form.id"> </el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="name">
                <el-input v-model="form.name" placeholder="亲输入昵称">
                </el-input>
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <el-button
                    v-if="!form.avatar"
                    type="primary"
                    @click="dialogImgVisable = true"
                    >上传</el-button
                >
                <el-image
                    v-else
                    :src="form.avatar"
                    style="width: 100px; height: 100px"
                    @click="openImg"
                ></el-image>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-select placeholder="请选择性别" v-model="form.sex">
                    <el-option label="男" value="1"> </el-option>
                    <el-option label="女" value="2"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input-number
                    v-model="form.age"
                    :min="18"
                    :max="50"
                ></el-input-number>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input
                    v-model="form.mobile"
                    placeholder="请输入手机号"
                ></el-input>
            </el-form-item>
            <el-form-item label="是否生效" prop="active">
                <el-radio-group v-model="form.active">
                    <el-radio :value="0">失效</el-radio>
                    <el-radio :value="1">生效</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="confirm(formRef)"
                    >确定</el-button
                >
            </div>
        </template>
    </el-dialog>
    <el-dialog
        v-model="dialogImgVisable"
        :before-close="beforeClose"
        title="陪护师头像添加"
        width="680"
    >
        <div class="image-list">
            <div
                v-for="(item, index) in fileList"
                :key="item.name"
                class="img-box"
                @click="selectInde(item, index)"
            >
                <div v-if="selectIndex === index" class="select">
                    <el-icon color="#fff"><Check /></el-icon>
                </div>
                <el-image :src="item.url" style="width: 148px; height: 148px">
                </el-image>
            </div>
        </div>
        <template #footer>
            <div>
                <el-button type="primary" @click="confirmImage">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from "vue";
import {
    reqPhotoList,
    reqCompanion,
    reqComList,
    reqDelete,
} from "../../../api";
import { Delete, InfoFilled } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
onMounted(() => {
    getPhotoList();
    getComList();
});
const $route = useRoute();

const fileList = ref([]);
const getPhotoList = async () => {
    let result = await reqPhotoList();
    if (result.data.code === 10000) {
        fileList.value = result.data.data;
        // console.log(fileList);
    }
};
const pages = reactive({
    pageNum: 1,
    pageSize: 10,
});
const handleSizeChange = (val) => {
    pages.pageSize = val;
    getComList();
};
const handleCurrentChange = (val) => {
    pages.pageNum = val;
    getComList();
};
const tableData = reactive({
    list: [],
    total: 0,
});
const getComList = async () => {
    let result = await reqComList(pages);
    if (result.data.code === 10000) {
        result.data.data.list.forEach((item) => {
            item.create_time = dayjs(item.create_time).format("YYYY-MM-DD");
        });
        tableData.total = result.data.data.total;
        tableData.list = result.data.data.list;
    }
    // console.log(result);
};
const dialogVisible = ref(false);
const dialogImgVisable = ref(false);
const handleClose = () => {
    dialogVisible.value = false;
    formRef.value.resetFields();
};
const form = reactive({
    id: "",
    mobile: "",
    active: 1,
    age: 28,
    avatar: "",
    name: "",
    sex: "",
});
const open = (rowData = {}) => {
    dialogVisible.value = true;
    nextTick(() => {
        if (rowData) {
            Object.assign(form, rowData);
        }
    });
};
const openImg = () => {
    dialogImgVisable.value = true;
};
const formRef = ref();
const rules = reactive({
    name: [{ required: true, trigger: "blur", message: "请输入姓名" }],
    avatar: [{ required: true, trigger: "blur", message: "请上传头像" }],
    sex: [{ required: true, trigger: "change", message: "请确认性别" }],
    mobile: [{ required: true, trigger: "blur", message: "请输入手机号" }],
});
const confirm = async (formRef) => {
    if (!formRef) return;
    await formRef.validate((value, fields) => {
        if (value) {
            console.log("submit");
            reqCompanion(form).then(({ data }) => {
                if (data.code === 10000) {
                    ElMessage.success(data.data);
                    handleClose();
                    getComList();
                } else {
                    return;
                }
            });
        } else {
            console.log("error submit", fields);
        }
    });
};
const beforeClose = () => {};
const selectIndex = ref(0);
const selectInde = (item, index) => {
    selectIndex.value = index;
    form.avatar = item.url;
};
const confirmImage = () => {
    console.log(form.avatar);

    dialogImgVisable.value = false;
};
const selectTableData = ref([]);
const handleSelectionChange = (val) => {
    selectTableData.value = val;
    console.log(selectTableData.value);
};
const getDelete = async () => {
    let result = await reqDelete({ id: selectTableData.value });
    console.log(result);
};
const confirmEvent = () => {
    // console.log(selectTableData.value);
    if (!selectTableData.value.length) {
        return ElMessage.warning("请选择至少一项数据");
    } else {
        getDelete();
        getComList();
    }
};
</script>
<style lang="less" scoped>
.btns {
    padding: 10px 0 10px 10px;
    background-color: #fff;
}
.image-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .img-box {
        position: relative;
        .select {
            position: absolute;
            left: 0px;
            top: 0px;
            width: 24px;
            height: 24px;
            background-color: #67c23a;
            z-index: 999;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .el-image {
        margin-right: 10px;
        margin-bottom: 10px;
    }
}
</style>
