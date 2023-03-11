/**
 *
 * @author:ChenDW
 * @date:2023-02-14 20:23
 */
const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
  },
  propList: [
    {
      type: 'index',
      label: '序号',
      width: '100'
    },
    {
      prop: 'roleName',
      label: '名称',
      width: '200'
    },
    {
      prop: 'roleDescription',
      label: '描述',
      width: '200'
    },
    {
      prop: 'createTime',
      label: '创建时间'
    },
    {
      prop: 'updateTime',
      label: '更新时间'
    },
    {
      type: 'handle',
      label: '操作',
      width: '250'
    }
  ]
};

export default contentConfig;
