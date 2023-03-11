/**
 *
 * @author:ChenDW
 * @date:2023-02-15 19:32
 */
const contentConfig = {
  pageName: 'doctor',
  header: {
    title: '医生列表',
    btnTitle: '新建医生'
  },
  propList: [
    {
      type: 'index',
      label: '序号',
      width: '80'
    },
    {
      prop: 'account',
      label: '帐号',
      width: '120'
    },
    {
      prop: 'name',
      label: '姓名',
      width: '120'
    },
    {
      prop: 'phone',
      label: '手机号码',
      width: '150'
    },
    {
      type: 'custom',
      prop: 'gender',
      label: '性别',
      width: '100',
      slotName: 'gender'
    },
    {
      type: 'custom',
      prop: 'status',
      label: '状态',
      width: '130',
      slotName: 'status'
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
      width: '160'
    }
  ]
};

export default contentConfig;
