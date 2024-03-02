<template>
  <div class="page-content card">
    <!-- 表格头部 -->
    <div class="table-header">
      <h3 class="title">药品列表</h3>
      <div class="operations">
        <el-button type="primary" @click="handleCreateOrUpdateMedicineClick">新建药品</el-button>
        <el-button>批墙添加药品</el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="medicineList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="brand" label="品牌" width="110" align="center" />
        <el-table-column prop="name" label="名字" width="170" align="center" />
        <el-table-column prop="specs" label="规格" width="120" align="center" />
        <el-table-column prop="type" label="类型" width="100" align="center" />
        <el-table-column prop="suit" label="适用人群" width="120" align="center" />
        <el-table-column prop="price" label="价格" width="100" align="center" />
        <el-table-column prop="stock" label="库存" width="80" align="center" />
        <el-table-column prop="description" label="描述" align="center" />
        <el-table-column label="操作" align="center" width="160">
          <template #default="{ row }">
            <el-button
              size="small"
              icon="Edit"
              text
              type="primary"
              @click="handleCreateOrUpdateMedicineClick($event, row)"
              >编辑
            </el-button>
            <el-popconfirm title="确认删除?" @confirm="handleDeleteConfirmClick($event, row)">
              <template #reference>
                <el-button type="danger" :icon="Delete" text size="small">删除</el-button>
              </template>
            </el-popconfirm>
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
</template>

<script setup lang="ts">
import { Delete, Edit } from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import useDrugStore from '@/store/main/drug';

const emit = defineEmits(['createEvent', 'updateEvent', 'createOrUpdateEvent']);

const drugStore = useDrugStore();
const { size, total, medicineList } = storeToRefs(drugStore);

const currentPage = ref(1);
const pageSize = ref(10);
let currentQueryData = {};
const fetchMedicineListAction = (queryData: any = currentQueryData) => {
  const size = pageSize.value;
  const current = currentPage.value;
  if (currentQueryData !== queryData) currentQueryData = queryData;
  const pageParam = { size, current };
  const medicine = { ...queryData };
  drugStore.getMedicineListDataAction(pageParam, medicine);
};

//展示条数改变事件
const handleSizeChange = (size: number) => {
  fetchMedicineListAction();
};

//改变当前页码事件
const handleCurrentChange = (currentPage: number) => {
  fetchMedicineListAction();
};
fetchMedicineListAction();

//点击新增或编辑按钮
const handleCreateOrUpdateMedicineClick = (event, row?: any) => {
  emit('createOrUpdateEvent', row);
};
//点击删除按钮
const handleDeleteConfirmClick = (e, row: any) => {
  drugStore.deleteMedicineAction(row.id).then(() => {
    fetchMedicineListAction();
  });
};

defineExpose({
  fetchMedicineListAction
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
