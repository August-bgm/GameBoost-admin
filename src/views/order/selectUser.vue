<template>
  <el-row>
    <el-dialog v-model="visible" title="选择打手" width="800px" top="5vh" append-to-body>
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="queryParams.realName" placeholder="请输入姓名" clearable @keyup.enter="handleQuery" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phonenumber">
          <el-input v-model="queryParams.phonenumber" placeholder="请输入手机号码" clearable @keyup.enter="handleQuery" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
          <el-button icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-table ref="tableRef" border :data="userList" height="260px" @row-click="clickRow" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column key="realName" label="姓名" align="center" prop="realName" />
            <el-table-column key="phonenumber" label="手机号码" align="center" prop="phonenumber"/>
            <el-table-column key="credit" label="信誉分" align="center" prop="assets.credit"/>
            <el-table-column label="创建时间" align="center" prop="createTime"/>
        </el-table>
        <pagination v-if="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
      </el-row>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSelectUser">确 定</el-button>
          <el-button @click="clean">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </el-row>
</template>
<script setup lang="ts">
import { listPlayers } from '@/api/system/user';
import { insertTask, transfer } from '@/api/order'
import { UserVO } from '@/api/system/user/types';
import { UserQuery } from '@/api/system/user/types';

const props = defineProps({
  orderId: {
    type: [Number, String],
    required: true
  }
});

const { proxy } = getCurrentInstance();
const userList = ref<UserVO[]>([]);
const visible = ref(false);
const total = ref(0);
const userId=ref(undefined);
const taskId=ref(undefined)
const userIds = ref<Array<string | number>>([]);

const queryParams = reactive<UserQuery>({
  pageNum: 1,
  pageSize: 10,
  phonenumber: '',
  realName: '',
  status: '0',
});

const tableRef = ref<ElTableInstance>();
const queryFormRef = ref<ElFormInstance>();

const show = () => {
  getList();
  visible.value = true;
};
const transferShow = (ttaskId,tuserId) => {
    taskId.value=ttaskId;
    userId.value=tuserId;
    getList();
    visible.value = true;
};
const clickRow = (row: any) => {
  tableRef.value?.toggleRowSelection(row, false);
};

const handleSelectionChange = (selection: UserVO[]) => {
  userIds.value = selection.map((item: UserVO) => item.userId);
};

const getList = async () => {
  const res = await listPlayers(queryParams);
  let list = res.data.records;
  if (userId.value) {
    list = list.filter((item: UserVO) => 
      String(item.userId) !== String(userId.value)
    );
  }
  userList.value = list;
  total.value = userId.value ? list.length : res.data.total;
};

const handleQuery = () => {
  queryParams.pageNum = 1;
  getList();
};

const resetQuery = () => {
  queryFormRef.value?.resetFields();
  getList();
};

const emit = defineEmits(['ok']);

const handleSelectUser = async () => {
  if (userIds.value.length <= 0) return;
  if (taskId.value) {
    await transfer({
      taskId: taskId.value,
      userIds: userIds.value
    });
    proxy?.$modal.msgSuccess('转单成功');
  } else {
    await insertTask({
      orderId: props.orderId,
      userIds: userIds.value
    });
    proxy?.$modal.msgSuccess('分配成功');
  }
  emit('ok');
  clean();
};
const clean=()=>{
    queryParams.pageNum=1;
    userId.value=undefined;
    taskId.value=undefined;
    visible.value = false;
}
defineExpose({
  show,transferShow
});
</script>