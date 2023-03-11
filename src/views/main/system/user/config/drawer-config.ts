/**
 *
 * @author:ChenDW
 * @date:2023-03-11 10:36
 */
const drawerConfig = {
  pageName: 'user',
  header: {
    createTitle: '新增用户',
    updateTitle: '编辑用户'
  },
  rules: {
    account: [{ required: true, message: '请输入帐号/工号' }],
    name: [{ required: true, message: '请输入姓名' }],
    phone: [{ required: true, message: '请输入联系方式' }],
    college: [{ required: true, message: '请输入学院' }],
    gender:[{ required: true, message: '请选择性别' }]
  },
  formItemList:[
    {
      type:"input",
      prop:"account",
      label:"学号/工号",
      placeholder: '请输入学号/工号'
    },
    {
      type:"input",
      prop:"name",
      label:"用户姓名",
      placeholder: '请输入用户姓名'
    },
    {
      type: "input",
      prop:"phone",
      label:"联系方式",
      placeholder: '请输入联系方式'
    },
    {
      type: "input",
      prop:"college",
      label:"学院",
      placeholder: '请输入学院'
    },
    {
      type: "input",
      prop:"major",
      label:"专业班级",
      placeholder: '请输入专业班级'
    },
    {
      type: "select",
      prop:"gender",
      label:"用户性别",
      placeholder: '请选择用户性别',
      options: [
        {
          label: "男",
          value:0
        },
        {
          label: "女",
          value:1
        }
      ]
    },
  ]
};

export default drawerConfig;
