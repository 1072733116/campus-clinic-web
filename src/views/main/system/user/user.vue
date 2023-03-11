<template>
  <div class='user'>
    <page-search :searchConfig='searchConfig'
                 @searchEvent='handleSearchEvent'
                 @resetEvent='handleResetEvent'
    />
    <page-content v-bind='contentConfig'
                  ref='pageContentRef'
                  @createOrUpdateEvent='handleCreateOrUpdateEvent'
    >
      <template #gender='{row}'>
        {{ row.gender === 0 ? '男' : '女' }}
      </template>
    </page-content>
    <page-drawer v-bind='drawerConfig'
                 ref='pageDrawerRef'
                 @createOrUpdateDoneEvent='handleCreateOrUpdateDoneEvent'>
    </page-drawer>
  </div>
</template>

<script setup lang='ts'>
import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import PageDrawer from '@/components/page-drawer';
import searchConfig from './config/search-config';
import contentConfig from './config/content-config';
import drawerConfig from './config/drawer-config';
import usePageContent from '@/hooks/usePageContent';
import usePageDrawer from '@/hooks/usePageDrawer';

const { pageContentRef, handleSearchEvent, handleResetEvent, handleCreateOrUpdateDoneEvent } = usePageContent();
const { pageDrawerRef, handleCreateOrUpdateEvent } = usePageDrawer();
</script>

<style scoped lang='less'>

</style>
