<template>
  <div class="role">
    <page-search :searchConfig="searchConfig" @searchEvent="handleSearchEvent" @resetEvent="handleResetEvent" />
    <page-content v-bind="contentConfig" ref="pageContentRef" @createOrUpdateEvent="handleCreateOrUpdateEvent" />
    <page-drawer
      v-bind="drawerConfig"
      :otherInfo="otherInfo"
      ref="pageDrawerRef"
      @createOrUpdateDoneEvent="handleCreateOrUpdateDoneEvent"
    >
      <template #menu-select>
        <el-tree
          ref="treeRef"
          :data="resourceList"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-drawer>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import PageDrawer from '@/components/page-drawer';
import searchConfig from './config/search-config';
import contentConfig from './config/content-config';
import drawerConfig from './config/drawer-config';
import usePageContent from '@/hooks/usePageContent';
import usePageDrawer from '@/hooks/usePageDrawer';
import { nextTick, ref } from 'vue';
import { ElTree } from 'element-plus';
import { storeToRefs } from 'pinia';
import useSystemStore from '@/store/main/system';
import { mapMenuListToIds } from '@/utils/menu';

const { pageContentRef, handleSearchEvent, handleResetEvent, handleCreateOrUpdateDoneEvent } = usePageContent();
const { pageDrawerRef, handleCreateOrUpdateEvent } = usePageDrawer(callBack);

const systemStore = useSystemStore();
systemStore.getAllResourceAction();
const { resourceList } = storeToRefs(systemStore);

const treeRef = ref<InstanceType<typeof ElTree>>();
const otherInfo = ref({});
const handleElTreeCheck = (data1: any, data2: any) => {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys];
  otherInfo.value = { menuList };
};
function callBack(isCreate: boolean, row: any) {
  if (isCreate) {
    nextTick(() => {
      treeRef.value?.setCheckedKeys([]);
    });
  } else {
    nextTick(() => {
      const menuIds = mapMenuListToIds(row.menuList);
      treeRef.value?.setCheckedKeys(menuIds);
    });
  }
}
</script>

<style scoped></style>
