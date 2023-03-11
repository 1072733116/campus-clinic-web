<template>
  <div class='search-form card'>
    <el-form ref='formRef'
             :label-width="searchConfig.labelWidth ?? '80px'"
             :model='searchForm'
             size='large'>
      <el-row :gutter='20'>
        <template v-for='formItem in searchConfig.formItemList' :key='formItem.prop'>
          <el-col :span='8'>
            <el-form-item :label='formItem.label' :prop='formItem.prop'>
              <template v-if='formItem.type === "input"'>
                <el-input :placeholder='formItem.placeholder' v-model='searchForm[formItem.prop]' />
              </template>
              <template v-if='formItem.type === "date"'>
                <el-date-picker v-model='searchForm[formItem.prop]'
                                type='date'
                                value-format='YYYY-MM-DD'
                                range-separator='-'
                                :placeholder='formItem.placeholder'
                                style='width:100%'
                />
              </template>
              <template v-if='formItem.type === "date-picker"'>
                <el-date-picker v-model='searchForm[formItem.prop]'
                                type='daterange'
                                range-separator='-'
                                start-placeholder='开始时间'
                                end-placeholder='结束时间'
                />
              </template>
              <template v-if='formItem.type === "select"'>
                <el-select v-model='searchForm[formItem.prop]' :placeholder='formItem.placeholder' style='width:100%'>
                  <template v-for='option in formItem.options' :key='option.value'>
                    <el-option :label='option.label' :value='option.value' />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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
import type { IFormItem } from './type';

interface IProps {
  searchConfig: {
    pageName: string,
    formItemList: IFormItem[]
    labelWidth?: string,
  }
}

const props = defineProps<IProps>();

const emit = defineEmits(['searchEvent', 'resetEvent']);

const formRef = ref<FormInstance>();

const initSearchFormData: any = {};
for (const item of props.searchConfig.formItemList) {
  initSearchFormData[item.prop] = item.initValue ?? undefined;
}
const searchForm = reactive(initSearchFormData);


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
:deep(.el-input__wrapper){
  width: 92%;
}
</style>
