/**
 *
 * @author:ChenDW
 * @date:2023-03-11 10:36
 */
const drawerConfig = {
  pageName: 'record',
  header: {
    createTitle: '新增就诊记录',
    updateTitle: '编辑就诊记录'
  },
  rules: {
    project: [{ required: true, message: '请输入就诊项目' }],
    usNumber: [{ required: true, message: '请输入帐号/工号' }],
    usName: [{ required: true, message: '请输入姓名' }],
    usGender:[{ required: true, message: '请选择性别' }],
    usCollege: [{ required: true, message: '请输入学院' }],
    preDate: [{ required: true, message: '请输入就诊日期' }],
    preTime: [{ required: true, message: '请输入就诊时间' }],
    dcNumber: [{ required: true, message: '请输入医生工号' }],
    dcName: [{ required: true, message: '请输入医生姓名' }],
    dcPhone: [{ required: true, message: '请输入联系方式' }],
    reDesc: [{ required: true, message: '请输入就诊描述' }],
    reMedicinal: [{ required: true, message: '请输入就诊药物' }],
    reFee: [{ required: true, message: '请输入药物费用' }],
    discountFee: [{ required: true, message: '请输入实际费用' }]
  },
  formItemList:[
    {
      type:"input",
      prop:"project",
      label:"就诊项目",
      placeholder: '请输入就诊项目'
    },
    {
      type:"input",
      prop:"usNumber",
      label:"学号/工号",
      placeholder: '请输入学号/工号'
    },
    {
      type:"input",
      prop:"usName",
      label:"用户姓名",
      placeholder: '请输入用户姓名'
    },
    {
      type: "select",
      prop:"usGender",
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
    {
      type: "input",
      prop:"usCollege",
      label:"学院",
      placeholder: '请输入学院'
    },
    {
      type: "input",
      prop:"usMajor",
      label:"专业班级",
      placeholder: '请输入专业班级'
    },
    {
      type: "input",
      prop:"preDate",
      label:"就诊日期",
      placeholder: '请输入就诊日期(输入格式为例:2023-03-28)'
    },
    {
      type: "input",
      prop:"preTime",
      label:"就诊时间",
      placeholder: '请输入就诊时间(输入格式为例:09:20-09:40)'
    },
    {
      type: "input",
      prop:"dcNumber",
      label:"医生工号",
      placeholder: '请输入医生工号'
    },
    {
      type: "input",
      prop:"dcName",
      label:"医生姓名",
      placeholder: '请输入医生姓名'
    },
    {
      type: "input",
      prop:"dcPhone",
      label:"医生电话",
      placeholder: '请输入医生电话'
    },
    {
      type: "textarea",
      prop:"reDesc",
      label:"就诊描述",
      placeholder: '请输入就诊描述'
    },
    {
      type: "textarea",
      prop:"reMedicinal",
      label:"就诊药物",
      placeholder: '请输入就诊药物'
    },
    {
      type: "input",
      prop:"reFee",
      label:"药物费用",
      placeholder: '请输入药物费用'
    },
    {
      type: "input",
      prop:"discountFee",
      label:"实际费用",
      placeholder: '请输入实际费用'
    }
  ]
};

export default drawerConfig;
