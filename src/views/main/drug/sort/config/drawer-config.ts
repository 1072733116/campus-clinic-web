/**
 *
 * @author:ChenDW
 * @date:2023-02-14 12:54
 */
const DrawerConfig = {
  pageName: 'medicine/type',
  header: {
    createTime: '新增类型',
    updateTime: '编辑类型'
  },
  rules: {
    name: [{ required: true, message: '请输入药品类型' }]
  },
  formItemList: [
    {
      type: 'input',
      prop: 'name',
      label: '药品类型',
      placeholder: '请输入药品类型'
    }
  ]
};

export default DrawerConfig;
