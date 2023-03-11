/**
 *
 * @author:ChenDW
 * @date:2023-02-15 19:31
 */
const searchConfig = {
  pageName: 'doctor',
  formItemList: [
    {
      type: 'input',
      prop: 'account',
      label: '医生帐号',
      placeholder: '请输入医生帐号'
    },
    {
      type: 'input',
      prop: 'name',
      label: '医生姓名',
      placeholder: '请输入医生姓名'
    },
    {
      type: 'input',
      prop: 'phone',
      label: '手机号码',
      placeholder: '请输入手机号码'
    },
    {
      type: 'select',
      prop: 'gender',
      label: '性别',
      placeholder: '请选择性别',
      options: [
        {
          label: '男',
          value: 0
        },
        {
          label: '女',
          value: 1
        }
      ]
    },
    {
      type: 'select',
      prop: 'status',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        {
          label: '在线',
          value: '在线'
        },
        {
          label: '休息',
          value: '休息'
        }
      ]
    }
  ]
};

export default searchConfig;
