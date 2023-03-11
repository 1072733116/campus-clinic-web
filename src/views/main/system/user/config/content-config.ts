/**
 *
 * @author:ChenDW
 * @date:2023-03-11 10:36
 */
const contentConfig = {
  pageName: 'user',
  header: {
    title: '用户列表',
    btnTitle: '新建用户'
  },
  propList: [
    {
      type: 'index',
      label: '序号',
      width: '100'
    },
    {
      prop: 'account',
      label: '学号/工号',
      width: '200'
    },
    {
      prop: 'name',
      label: '用户姓名',
      width: '200'
    },
    {
      prop: 'phone',
      label: '联系方式'
    },
    {
      prop: 'college',
      label: '学院'
    },
    {
      prop: 'major',
      label: '专业班级'
    },
    {
      type: "custom",
      prop: 'gender',
      label: '性别',
      slotName: 'gender'
    },
    {
      type: 'handle',
      label: '操作',
      width: '250'
    }
  ]
};

export default contentConfig;
