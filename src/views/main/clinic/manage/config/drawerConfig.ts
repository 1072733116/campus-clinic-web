/**
 *
 * @author:ChenDW
 * @date:2023-02-15 19:33
 */
const drawerConfig = {
  pageName: 'doctor',
  header: {
    createTitle: '新增医生',
    updateTitle: '编辑医生'
  },
  rules: {
    account: [{ required: true, message: '请输入帐号' }],
    name: [{ required: true, message: '请输入姓名' }],
    phone: [{ required: true, message: '请输入手机号码' }],
    gender: [{ required: true, message: '请选择性别' }],
    roleId: [{ required: true, message: '请选择角色' }]
  },
  formItemList: [
    {
      type: 'input',
      prop: 'account',
      label: '帐号',
      placeholder: '请输入帐号'
    },
    {
      type: 'input',
      prop: 'name',
      label: '姓名',
      placeholder: '请输入姓名'
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
      prop: 'roleId',
      label: '角色名称',
      placeholder: '请选择角色',
      options: []
    }
  ]
};

export default drawerConfig;
