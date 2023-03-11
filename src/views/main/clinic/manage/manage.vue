<template>
  <div class='manage'>
    <page-search :searchConfig='searchConfig'
                 @searchEvent='handleSearchEvent'
                 @resetEvent='handleResetEvent'
    />
    <page-content v-bind='contentConfig'
                  ref='pageContentRef'
                  @createOrUpdateEvent='handleCreateOrUpdateEvent'
    >
      <template #gender='{row}'>
        {{ row.gender ? '女' : '男' }}
      </template>
      <template #status='{row}'>
        <el-tag :type='type(row.status)' :style='{width: "60px"}'>{{ row.status }}</el-tag>
      </template>
    </page-content>
    <page-drawer v-bind='drawerConfigData'
                 ref='pageDrawerRef'
                 @createOrUpdateDoneEvent='handleCreateOrUpdateDoneEvent'
    />
  </div>
</template>

<script setup lang='ts'>
import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import PageDrawer from '@/components/page-drawer';
import searchConfig from './config/search-config';
import contentConfig from './config/content-config';
import drawerConfig from './config/drawerConfig';
import usePageContent from '@/hooks/usePageContent';
import usePageDrawer from '@/hooks/usePageDrawer';
import { computed } from 'vue';
import useSystemStore from '@/store/main/system';

const type = computed(() => {
  return (status: string) => {
    let type = '';
    if (status == '在线') {
      type = 'success';
    } else {
      type = 'warning';
    }
    return type;
  };
});

const { pageContentRef, handleSearchEvent, handleResetEvent, handleCreateOrUpdateDoneEvent } = usePageContent();
const { pageDrawerRef, handleCreateOrUpdateEvent } = usePageDrawer();

const systemStore = useSystemStore();
systemStore.getAllRoleListAction();

const drawerConfigData = computed(() => {
  const formItem = drawerConfig.formItemList.find(item => item.prop === 'roleId');
  formItem!.options = systemStore.roleList.map(role => {
    return {
      label: role.roleName,
      value: role.id
    };
  });
  return drawerConfig;
});
</script>

<style scoped>

</style>
