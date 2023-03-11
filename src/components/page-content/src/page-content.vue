<template>
  <div class='page-content card'>
    <!-- 表格头部 -->
    <div class='table-header'>
      <h3 class='title'>{{ header.title ?? '数据列表' }}</h3>
      <div class='operations'>
        <el-button type='primary' @click='handleCreateOrUpdateDataClick'>{{ header.btnTitle ?? '新建数据' }}</el-button>
      </div>
    </div>
    <div class='table'>
      <el-table :data='pageList' border style='width: 100%'>
        <template v-for='item in propList'>
          <template v-if='item.type === "timer"'>
            <el-table-column v-bind='item' align='center'></el-table-column>
          </template>
          <template v-if='item.type === "handle"'>
            <el-table-column v-bind='item' align='center' >
              <template #default='{row}'>
                <el-button size='small' icon='Edit' text type='primary'
                           @click='handleCreateOrUpdateDataClick($event,row)'>
                  编辑
                </el-button>
                <el-popconfirm title='确认删除?' @confirm='handleDeleteConfirmClick($event,row)'>
                  <template #reference>
                    <el-button type='danger' icon='Delete' text size='small'>删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </template>
          <template v-else-if='item.type === "custom"'>
            <el-table-column v-bind='item' align='center'>
              <template #default='scope'>
                <slot :name='item.slotName' v-bind='scope' :prop='item.prop'></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind='item' align='center'></el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class='pagination'>
      <el-pagination
        v-model:current-page='currentPage'
        v-model:page-size='pageSize'
        :page-sizes='[5, 8, 10]'
        :background='true'
        layout='total, sizes, prev, pager, next, jumper'
        :total='total'
        @size-change='handleSizeChange'
        @current-change='handleCurrentChange'
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import useMainStore from '@/store/main';

interface IProps {
  pageName: string;
  propList: any[],
  header?: {
    title: string;
    btnTitle: string;
  },
  childrenTree?: any,
}

const props = defineProps<IProps>();

const emit = defineEmits(['createOrUpdateEvent']);

const mainStore = useMainStore();
const { total, pageList } = storeToRefs(mainStore);

const currentPage = ref(1);
const pageSize = ref(10);

let currentQueryData = {}; //保留查询的条件
const fetchPageListDataAction = (queryData: any = currentQueryData) => {
  const size = pageSize.value;
  const current = currentPage.value;
  if (currentQueryData !== queryData) currentQueryData = queryData;
  const pageParam = { size, current };
  const query = { ...queryData };
  mainStore.getPageContentListDataAction(props.pageName, pageParam, query);
};
fetchPageListDataAction();
//展示条数改变事件
const handleSizeChange = (size: number) => {
  fetchPageListDataAction();
};

//改变当前页码事件
const handleCurrentChange = (currentPage: number) => {
  fetchPageListDataAction();
};
//点击删除按钮
const handleDeleteConfirmClick = (e, row: any) => {
  mainStore.deletePageContentDataAction(props.pageName, row.id).then(() => {
    fetchPageListDataAction();
  });
};


//点击新增或编辑按钮
const handleCreateOrUpdateDataClick = (event, row?: any) => {
  emit('createOrUpdateEvent', row);
};


defineExpose({
  fetchPageListDataAction
});
</script>

<style scoped lang='less'>
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

