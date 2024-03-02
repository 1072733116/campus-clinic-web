<template>
  <div>
    <div class="page-content card">
      <!-- 表格头部 -->
      <div class="table-header">
        <h3 class="title">预约列表</h3>
      </div>
      <div class="table">
        <el-table :data="appointmentList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="project" label="就诊项目" width="150" align="center" />
          <el-table-column prop="preNumber" label="学号/工号" width="170" align="center" />
          <el-table-column prop="preName" label="名字" width="170" align="center" />
          <el-table-column prop="prePhone" label="联系方式" width="170" align="center" />
          <el-table-column prop="preGender" label="性别" width="80" align="center">
            <template #default="{ row }">
              {{ row.preGender === 0 ? '男' : '女' }}
            </template>
          </el-table-column>
          <el-table-column prop="preDate" label="预约日期" width="170" align="center" />
          <el-table-column prop="preTime" label="预约时间" width="150" align="center" />
          <el-table-column prop="preStatus" label="预约状态" width="150" align="center">
            <template #default="{ row }">
              <el-tag effect="dark" :type="tagType(row.preStatus)" size="large">{{ row.preStatus }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="{ row }">
              <el-button icon="Bell" text type="primary" @click="handleNoticeClick($event, row)"> 通知 </el-button>
              <el-button type="danger" icon="EditPen" text @click="handleVisitClick($event, row)"> 就诊 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 8, 10]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import useLoginStore from '@/store/login';
import useHomeStore from '@/store/main/home';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const tagType = computed(() => {
  return (t) => {
    let type = '';
    if (t == '已到达') {
      type = 'success';
    } else if (t == '已取消') {
      type = 'info';
    } else if (t == '已完成') {
      type = 'danger';
    }
    return type;
  };
});

const emit = defineEmits(['createEvent', 'updateEvent', 'createOrUpdateEvent', 'goVisitEvent']);
const homeStore = useHomeStore();
const loginStore = useLoginStore();
const { total, appointmentList } = storeToRefs(homeStore);

const currentPage = ref(1);
const pageSize = ref(10);
let currentQueryData = {};
const fetchAppointmentListAction = (queryData: any = currentQueryData) => {
  const size = pageSize.value;
  const current = currentPage.value;
  if (currentQueryData !== queryData) currentQueryData = queryData;
  const pageParam = { size, current };
  const doctorId = loginStore.loginUserInfo.id;
  const appointment = { ...queryData };
  homeStore.getAppointmentListAction(pageParam, appointment, doctorId);
};

//展示条数改变事件
const handleSizeChange = (size: number) => {
  fetchAppointmentListAction();
};

//改变当前页码事件
const handleCurrentChange = (currentPage: number) => {
  fetchAppointmentListAction();
};

fetchAppointmentListAction();

//点击通知
const handleNoticeClick = (event, row?: any) => {
  ElMessage({
    message: '已发送通知',
    type: 'success',
    duration: 1000
  });
  homeStore
    .sendMailAction(row)
    .then(() => {
      ElMessage({
        message: '通知成功',
        type: 'success',
        duration: 1000
      });
    })
    .catch((err) => {});
};
//点击就诊按钮
const handleVisitClick = (e, row: any) => {
  emit('goVisitEvent', row);
};

defineExpose({
  fetchAppointmentListAction
});
</script>

<style scoped lang="less">
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.table {
  :deep(.el-table__cell) {
    padding: 10px 0;
  }

  :deep(.el-button) {
    margin-left: 0;
    padding: 5px 8px;
  }
}
</style>
