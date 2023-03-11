<template>
  <div class='search-form card'>
    <el-form ref='formRef'
             :model='searchForm'
             size='large'>
      <el-row :gutter='20'>
        <el-col :span='8'>
          <el-form-item label='药品品牌' prop='brand'>
            <el-input placeholder='请输入药品品牌' v-model='searchForm.brand' />
          </el-form-item>
        </el-col>
        <el-col :span='8'>
          <el-form-item label='药品名称' prop='name'>
            <el-input placeholder='请输入药品名称' v-model='searchForm.name' />
          </el-form-item>
        </el-col>
        <el-col :span='8'>
          <el-form-item label='适用人群' prop='suit'>
            <el-input placeholder='请输入适用人群' v-model='searchForm.suit' />
          </el-form-item>
        </el-col>
        <el-col :span='8'>
          <el-form-item label='药品类型' prop='type'>
            <el-select placeholder='请选择药品类型' style='width: 100%' v-model='searchForm.type'>
              <template v-for='type in medicineTypeList' :key='type.id'>
                <el-option :label='type.name' :value='type.id' />
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span='8' prop='description'>
          <el-form-item label='药品描述'>
            <el-input placeholder='请输入药品描述' v-model='searchForm.description' />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class='btns'>
      <el-button type='primary' icon='Search' @click='handleSearchBtnClick'>搜索</el-button>
      <el-button icon='Refresh' @click='handleResetBtnClick'>重置</el-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import type { FormInstance } from 'element-plus';

interface IProps {
  medicineTypeList: any
}

const props = defineProps<IProps>();

const emit = defineEmits(['searchEvent', 'resetEvent']);

const formRef = ref<FormInstance>();

const searchForm = reactive({
  brand: '',
  name: '',
  type: '',
  description: '',
  suit: ''
});

const handleSearchBtnClick = () => {
  emit('searchEvent', { ...searchForm });
};

const handleResetBtnClick = () => {
  formRef.value?.resetFields();
  emit('resetEvent');
};
</script>

<style scoped lang='less'>
.search-form {
  padding: 18px 18px 0;
  margin-bottom: 10px;

  .el-form-item {
    padding: 10px 20px;
    margin-bottom: 0;
  }
}

.btns {
  text-align: right;
  padding: 0 50px 20px 0;

  .el-button {
    height: 36px;
  }
}
</style>
