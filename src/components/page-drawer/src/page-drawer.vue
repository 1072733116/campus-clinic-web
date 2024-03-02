<template>
  <el-drawer
    v-model="drawerVisible"
    :destroy-on-close="true"
    :size="size ?? '450px'"
    :title="isCreateRef ? header.createTitle ?? '新增数据' : header.updateTitle ?? '编辑数据'"
  >
    <el-form
      ref="formRef"
      :model="createOrUpdateFormData"
      :label-width="labelWidth ?? '100px'"
      :label-suffix="labelSuffix ?? ' :'"
      :rules="rules"
      size="large"
    >
      <template v-for="item in formItemList" :key="item.prop">
        <el-form-item :label="item.label" :prop="item.prop">
          <template v-if="item.type === 'input'">
            <el-input v-model="createOrUpdateFormData[item.prop]" :placeholder="item.placeholder" />
          </template>
          <template v-else-if="item.type === 'select'">
            <el-select v-model="createOrUpdateFormData[item.prop]" :placeholder="item.placeholder" style="width: 100%">
              <template v-for="option in item.options" :key="option.value">
                <el-option :label="option.label" :value="option.value"></el-option>
              </template>
            </el-select>
          </template>
          <template v-else-if="item.type === 'textarea'">
            <el-input
              v-model="createOrUpdateFormData[item.prop]"
              :placeholder="item.placeholder"
              autosize
              type="textarea"
            />
          </template>
          <template v-else-if="item.type === 'custom'">
            <slot :name="item.slotName"></slot>
          </template>
        </el-form-item>
      </template>
    </el-form>
    <template #footer v-if="isShowFooter">
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleConfirmClick">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import useMainStore from '@/store/main';
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';

interface IProps {
  pageName: string;
  formItemList: any[];
  labelWidth?: string;
  labelSuffix?: string;
  rules?: any;
  size?: string;
  header?: {
    createTitle: string;
    updateTitle: string;
  };
  otherInfo?: any;
  isShowFooter?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  isShowFooter: true
});
const emit = defineEmits(['createOrUpdateDoneEvent']);

const formRef = ref<FormInstance>();
const isCreateRef = ref<boolean>(true);
const drawerVisible = ref<boolean>(false);

const mainStore = useMainStore();

const initCreateOrUpdateFormData: any = {};
const createOrUpdateFormData = reactive<any>(initCreateOrUpdateFormData);
//初始化drawer（新增或编辑）
const setInitDrawerParam = (isCreate: boolean = true, updateFormData?: any) => {
  drawerVisible.value = true;
  isCreateRef.value = isCreate;
  if (!isCreate && updateFormData) {
    //编辑
    for (const key in updateFormData) {
      createOrUpdateFormData[key] = updateFormData[key];
    }
  } else {
    //新增
    if ('id' in createOrUpdateFormData) {
      delete createOrUpdateFormData.id;
    }
    for (const formItem of props.formItemList) {
      initCreateOrUpdateFormData[formItem.prop] = formItem.initValue ?? undefined;
    }
  }
};

//点击确定按钮
const handleConfirmClick = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      let formData = createOrUpdateFormData;
      if (props.otherInfo) {
        formData = { ...formData, ...props.otherInfo };
      }
      mainStore.createOrUpdatePageContentDataAction(props.pageName, isCreateRef.value, formData).then(
        () => {
          emit('createOrUpdateDoneEvent');
        },
        (e) => {
          ElMessage({
            showClose: true,
            message: e.message,
            type: 'error',
            duration: 1500
          });
        }
      );
      drawerVisible.value = false;
    }
  });
};

defineExpose({
  setInitDrawerParam
});
</script>

<style scoped></style>
