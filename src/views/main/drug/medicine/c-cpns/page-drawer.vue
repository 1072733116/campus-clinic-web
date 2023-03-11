<template>
  <el-drawer v-model='drawerVisible' :destroy-on-close='true' size='450px' :title='isCreateRef ? "新增药品":"编辑药品"'>
    <el-form ref='formRef' :model='createOrUpdateFormData' label-width='90px' label-suffix=' :' :rules='rules'
             size='large'>
      <el-form-item label='药品品牌' prop='brand'>
        <el-input placeholder='请输入药品品牌' v-model='createOrUpdateFormData.brand' />
      </el-form-item>
      <el-form-item label='药品名称' prop='name'>
        <el-input placeholder='请输入药品名称' v-model='createOrUpdateFormData.name' />
      </el-form-item>
      <el-form-item label='药品规格' prop='specs'>
        <el-input placeholder='请输入药品规格' v-model='createOrUpdateFormData.specs' />
      </el-form-item>
      <el-form-item label='药品类型' prop='type'>
        <el-select placeholder='请选择药品类型' style='width: 100%' v-model='createOrUpdateFormData.type'>
          <template v-for='type in medicineTypeList' :key='type.id'>
            <el-option :label='type.name' :value='type.id' />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label='适用人群' prop='suit'>
        <el-input placeholder='请输入适用人群' v-model='createOrUpdateFormData.suit' />
      </el-form-item>
      <el-form-item label='药品价格' prop='price'>
        <el-input placeholder='请输入药品价格' v-model='createOrUpdateFormData.price' />
      </el-form-item>
      <el-form-item label='药品库存' prop='stock'>
        <el-input placeholder='请输入药品价格' v-model='createOrUpdateFormData.stock' />
      </el-form-item>
      <el-form-item label='药品描述' prop='description'>
        <el-input placeholder='请输入药品描述' v-model='createOrUpdateFormData.description' autosize type='textarea' />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click='drawerVisible = false'>取消</el-button>
      <el-button type='primary' @click='handleConfirmClick'>确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import useDrugStore from '@/store/main/drug';
import type { FormInstance } from 'element-plus';

interface IProps {
  medicineTypeList: any
}

withDefaults(defineProps<IProps>(), {
  medicineTypeList: []
});

const emit = defineEmits(['createOrUpdateDoneEvent']);

const drugStore = useDrugStore();

const formRef = ref<FormInstance>();
const rules = reactive({
  brand: [{ required: true, message: '请输入药品品牌' }],
  name: [{ required: true, message: '请输入药品名称' }],
  specs: [{ required: true, message: '请输入药品规格' }],
  type: [{ required: true, message: '请选择药品类型' }],
  suit: [{ required: true, message: '请输入适用人群' }],
  price: [{ required: true, message: '请输入药品价格' }],
  stock: [{ required: true, message: '请输入药品库存' }],
  description: [{ required: true, message: '请输入药品描述' }]
});
const createOrUpdateFormData = reactive<any>({
  brand: '',
  name: '',
  specs: '',
  type: undefined,
  suit: '',
  price: undefined,
  stock: undefined,
  description: ''
});
const isCreateRef = ref<boolean>(true);
const drawerVisible = ref<boolean>(false);

//初始化drawer（新增或编辑）
const setInitDrawerParam = (isCreate: boolean = true, updateFormData?: any) => {
  drawerVisible.value = true;
  isCreateRef.value = isCreate;
  if (!isCreate && updateFormData) {
    for (const key in updateFormData) {
      createOrUpdateFormData[key] = updateFormData[key];
    }
  } else {
    if (createOrUpdateFormData['id'] !== undefined) {
      delete createOrUpdateFormData.id;
    }
    for (const key in createOrUpdateFormData) {
      createOrUpdateFormData[key] = '';
    }
  }
};

//点击确定按钮
const handleConfirmClick = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      const medicine = { ...createOrUpdateFormData };
      drugStore.createOrUpdateMedicineAction(isCreateRef.value, medicine).then(() => {
        emit('createOrUpdateDoneEvent');
      }, (e) => {
        ElMessage({
          showClose: true,
          message: e.message,
          type: 'error',
          duration: 1500
        });
      });
      drawerVisible.value = false;
    }
  });
};

defineExpose({
  setInitDrawerParam
});
</script>

<style scoped>

</style>
