/**
 *
 * @author:ChenDW
 * @date:2023-02-13 00:39
 */
const searchConfig = {
  pageName: 'medicine',
  formItemList: [
    {
      type: 'input',
      prop: 'brand',
      label: '药品品牌',
      placeholder: '请输入药品品牌'
    },
    {
      type: 'input',
      prop: 'name',
      label: '药品名称',
      placeholder: '请输入药品名称'
    },
    {
      type: 'input',
      prop: 'suit',
      label: '适用人群',
      placeholder: '请输入适用人群'
    },
    {
      type: 'select',
      prop: 'type',
      label: '药品类型',
      placeholder: '请输入药品类型',
      options: []
    },
    {
      type: 'input',
      prop: 'description',
      label: '药品描述',
      placeholder: '请输入药品描述'
    }
  ]
};

export default searchConfig;
