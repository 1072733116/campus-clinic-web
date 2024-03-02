<template>
  <div class="user">
    <page-search :searchConfig="searchConfig" @searchEvent="handleSearchEvent" @resetEvent="handleResetEvent" />
    <page-content v-bind="contentConfig" ref="pageContentRef" @createOrUpdateEvent="handleCreateOrUpdateEvent">
      <template #gender="{ row }">
        {{ row.gender === 0 ? '男' : '女' }}
      </template>
      <template #btn>
        <el-button type="success">
          <a
            style="color: #fff"
            href="https://cdw123.oss-cn-beijing.aliyuncs.com/%E7%94%A8%E6%88%B7%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx"
            >下载导入模板</a
          >
        </el-button>
        <!--        <el-button type='primary' @click='handleUploadUserExcel'>批量导入用户</el-button>-->
        <el-upload
          ref="upload"
          class="upload-demo"
          action="http://127.0.0.1:8081/user/excel"
          :limit="1"
          :on-exceed="handleExceed"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          :auto-upload="false"
        >
          <template #trigger>
            <el-button type="primary">选择excel文件</el-button>
          </template>
        </el-upload>
        <el-button type="success" @click="submitUpload" :loading="loading"> 上传</el-button>
      </template>
    </page-content>
    <page-drawer v-bind="drawerConfig" ref="pageDrawerRef" @createOrUpdateDoneEvent="handleCreateOrUpdateDoneEvent">
    </page-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import PageDrawer from '@/components/page-drawer';
import searchConfig from './config/search-config';
import contentConfig from './config/content-config';
import drawerConfig from './config/drawer-config';
import usePageContent from '@/hooks/usePageContent';
import usePageDrawer from '@/hooks/usePageDrawer';
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus';

const { pageContentRef, handleSearchEvent, handleResetEvent, handleCreateOrUpdateDoneEvent } = usePageContent();
const { pageDrawerRef, handleCreateOrUpdateEvent } = usePageDrawer();

const loading = ref<boolean>(false);
const upload = ref<UploadInstance>();
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  upload.value!.handleStart(file);
};

const handleUploadSuccess = () => {
  loading.value = false;
  ElMessage({
    message: '文件上传成功',
    type: 'success'
  });
  upload.value!.clearFiles();
  pageContentRef.value?.fetchPageListDataAction();
};

const handleUploadError = () => {
  loading.value = false;
  ElMessage.error('文件上传失败');
};

const submitUpload = () => {
  loading.value = true;
  upload.value!.submit();
};
</script>

<style scoped lang="less">
.upload-demo {
  display: flex;
  align-items: center;
  margin: 0 10px;
}
</style>
