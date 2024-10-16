<template>
    <pane-head :route="$route" />
    <div class="btns">
        <el-button plain type="primary" size="small" @click="open(null)">
            新增
        </el-button>
    </div>
    <el-table :data="tableData.list" style="width: 100%">
        <el-table-column prop="id" label="id" />
        <el-table-column prop="name" label="name" />
        <el-table-column prop="permissionName" label="菜单权限" width="500px" />
        <el-table-column label="操作">
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
            :page-sizes="[10, 20, 30, 40]"
            layout="prev, pager, next,sizes,->,total, jumper"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
    <el-dialog
        v-model="dialogVisible"
        width="500"
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
            <el-form-item v-show="false" prop="id">
                <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" placeholder="请填写权限名称" />
            </el-form-item>
            <el-form-item label="权限" prop="permissions">
                <el-tree
                    ref="treeRef"
                    style="max-width: 600px"
                    :data="permissionData"
                    show-checkbox
                    node-key="id"
                    :default-checked-keys="[4, 5]"
                    :default-expanded-keys="[2]"
                ></el-tree>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="confirm(formRef)"
                    >确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";
import { reqMenu, reqSetMenu, reqMenuList } from "@/api/index";
import { useRoute } from "vue-router";
const $route=useRoute()
onMounted(() => {
    getMenu();
    getMenuList();
});

const formRef = ref();
const treeRef = ref();
const dialogVisible = ref(false);
const permissionData = ref([]);
const tableData = reactive({
    list: [],
    total: 0,
});
const handleClose = () => {
    dialogVisible.value = false;
    formRef.value.resetFields();
    treeRef.value.setCheckedKeys([4, 5]);
};
const paginationData = reactive({
    pageNum: 1,
    pageSize: 10,
});
const handleSizeChange = (val) => {
    paginationData.pageSize = val;
    getMenuList();
};
const handleCurrentChange = (val) => {
    paginationData.pageNum = val;
    getMenuList();
};
const open = (rowData = {}) => {
    dialogVisible.value = true;
    nextTick(() => {
        if (rowData) {
            Object.assign(form, { id: rowData.id, name: rowData.name });
            treeRef.value.setCheckedKeys(rowData.permission);
            console.log(form, "form");
        }
    });
};
const getMenuList = async () => {
    let result = await reqMenuList(paginationData);
    // console.log(result);
    tableData.list = result.data.data.list;
    tableData.total = result.data.data.total;
};
const form = reactive({
    id: "",
    name: "",
    permissions: "",
});

const getMenu = async () => {
    let result = await reqMenu();
    // console.log(result.data.data);
    permissionData.value = result.data.data;
};

const rules = reactive({
    name: [{ required: true, trigger: "blur", message: "请输入权限名称" }],
});
const confirm = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((value, fields) => {
        if (value) {
            console.log("sumbit");
            const permissions = JSON.stringify(treeRef.value.getCheckedKeys());
            reqSetMenu({ name: form.name, permissions, id: form.id }).then(
                ({ data }) => {
                    // console.log(data);
                    handleClose();
                    getMenuList();
                }
            );
        } else {
            console.log("error", fields);
        }
    });
};
</script>
<style lang="less" scoped>
.btns {
    padding: 10px 0 10px 10px;
    background-color: #fff;
}
</style>
