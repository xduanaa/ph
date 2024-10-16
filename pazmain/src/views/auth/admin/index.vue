<template>
    <pane-head :route="$route" />
    <el-table :data="tableData.list.list" style="width: 100%">
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="name" label="昵称" width="180" />
        <el-table-column prop="permissions_id" label="所属组别">
            <template #default="scope">
                {{ permissionName(scope.row.permissions_id) }}
            </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" />
        <el-table-column prop="active" label="状态">
            <template #default="scope">
                <el-tag :type="scope.row.active ? 'success' : 'danger'">{{
                    scope.row.active ? "正常" : "失效"
                }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="创造时间">
            <template #default="scope">
                <div class="clock">
                    <el-icon><Clock /></el-icon>
                    <span>{{ scope.row.create_time }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
            <template #default="scope">
                <div>
                    <el-button type="primary" @click="open(scope.row)"
                        >编辑</el-button
                    >
                </div>
            </template>
        </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
        <el-pagination
            v-model:current-page="paginationData.pageNum"
            v-model:page-size="paginationData.pageSize"
            :page-sizes="[10, 20, 30, 400]"
            layout="  prev, pager, next,sizes,->, total,jumper"
            :total="100"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
    <el-dialog
        width="500"
        v-model="dialogFormVisible"
        :before-close="handleClose"
        title="添加权限"
        align-center
    >
        <el-form
            :model="form"
            ref="formRef"
            label-width="100px"
            label-position="left"
            :rules="rules"
        >
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="form.mobile" disabled />
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="菜单权限" prop="permissions_id">
                <el-select
                    v-model="form.permissions_id"
                    placeholder="请选择菜单权限"
                    style="width: 240px"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :lebel="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="comfirm(formRef)"
                    >确认</el-button
                >
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import { reqAdmin, reqSelectList, reqUserUpdate } from "@/api/index";
import dayjs from "dayjs";
import { useRoute } from "vue-router";
const $route = useRoute();
const paginationData = reactive({
    pageNum: 1,
    pageSize: 10,
});
onMounted(() => {
    getAdmin();
    getSelectList();
});
const tableData = reactive({
    list: [],
    total: 0,
});
const open = (rowData) => {
    dialogFormVisible.value = true;
    Object.assign(form, {
        mobile: rowData.mobile,
        name: rowData.name,
        permissions_id: rowData.permissions_id,
    });
    console.log(form);
};
const getAdmin = async () => {
    let result = await reqAdmin(paginationData);
    // console.log(result);

    result.data.data.list.forEach((item) => {
        item.create_time = dayjs(item.create_time).format("YYYY-MM-DD");
    });
    // console.log(result.data.data.list);
    tableData.list = result.data.data;
    console.log(tableData);
};

const options = ref([]);
const getSelectList = async () => {
    let result = await reqSelectList();
    // console.log(result);
    options.value = result.data.data;
    console.log(options.value, "options.value");
};

const permissionName = (id) => {
    const data = options.value.find((el) => el.id === id);
    return data ? data.name : "超级管理员";
};
const formRef = ref();
const dialogFormVisible = ref(false);
const handleClose = () => {
    dialogFormVisible.value = false;
};
const form = reactive({
    mobile: "",
    name: "",
    permissions_id: "",
});
const rules = reactive({
    name: [{ required: true, trigger: "blue", message: "请填写名称" }],
    permissions_id: [{ required: true, trigger: "blue", message: "请选择" }],
});
const comfirm = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((value, fields) => {
        if (value) {
            console.log("sumbit", form);
            const { name, permissions_id } = form;
            reqUserUpdate({ name, permissions_id }).then(({ data }) => {
                if (data.code === 10000) {
                    dialogFormVisible.value = false;
                    getAdmin();
                }
            });
        } else {
            console.log("error ", fields);
        }
    });
};
const handleSizeChange = (val) => {
    paginationData.pageSize = val;
    getAdmin();
};
const handleCurrentChange = (val) => {
    paginationData.pageNum = val;
    getAdmin();
};
</script>
<style lang="less" scope>
.clock {
    display: flex;
    align-items: center;
}
</style>
