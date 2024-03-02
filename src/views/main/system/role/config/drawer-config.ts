/**
 *
 * @author:ChenDW
 * @date:2023-02-14 20:27
 */
const drawerConfig = {
  pageName: 'role',
  header: {
    createTime: '新增角色',
    updateTime: '编辑角色'
  },
  rules: {
    roleName: [{ required: true, message: '请输入角色名称' }],
    roleDescription: [{ required: true, message: '请输入角色描述' }]
  },
  formItemList: [
    {
      type: 'input',
      prop: 'roleName',
      label: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      type: 'input',
      prop: 'roleDescription',
      label: '角色描述',
      placeholder: '请输入角色描述'
    },
    {
      type: 'custom',
      slotName: 'menu-select'
    }
  ]
};

export default drawerConfig;
