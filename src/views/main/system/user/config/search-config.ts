/**
 *
 * @author:ChenDW
 * @date:2023-03-11 10:36
 */
const searchConfig = {
  pageName: 'user',
  formItemList: [
    {
      type: 'input',
      prop: 'account',
      label: '学号/工号',
      placeholder: '请输入学号/工号'
    },
    {
      type: 'input',
      prop: 'name',
      label: '用户姓名',
      placeholder: '请输入用户姓名'
    },
    {
      type: 'input',
      prop: 'college',
      label: '学院',
      placeholder: '请输入学院'
    },
    {
      type: 'input',
      prop: 'major',
      label: '专业班级',
      placeholder: '请输入专业班级'
    },
    {
      type: 'select',
      prop: 'gender',
      label: '用户性别',
      placeholder: '请选择用户性别',
      options: [
        {
          label: '男',
          value: '0'
        },
        {
          label: '女',
          value: '1'
        }
      ]
    }
  ]
};

export default searchConfig;
