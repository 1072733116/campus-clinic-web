/**
 *
 * @author:ChenDW
 * @date:2023-03-11 10:36
 */
const contentConfig = {
  pageName: 'record',
  header: {
    title: '就诊记录列表',
    btnTitle: '新建就诊记录'
  },
  propList: [
    {
      type: 'index',
      label: '序号',
      width: '60',
      fixed: true
    },
    {
      prop: 'project',
      label: '就诊项目',
      width: '85',
      fixed: true
    },
    {
      prop: 'usNumber',
      label: '学号/工号',
      width: '125'
    },
    {
      prop: 'usName',
      label: '患者姓名',
      width: '85'
    },
    {
      type: 'custom',
      prop: 'usGender',
      label: '性别',
      slotName: 'gender',
      width: '55'
    },
    {
      prop: 'usCollege',
      label: '学院',
      width: '85'
    },
    {
      prop: 'usMajor',
      label: '专业班级',
      width: '105'
    },
    {
      prop: 'preDate',
      label: '就诊日期'
    },
    {
      prop: 'preTime',
      label: '就诊时间'
    },
    {
      prop: 'dcNumber',
      label: '医生工号',
    },
    {
      prop: 'dcName',
      label: '医生姓名'
    },
    {
      prop: 'reDesc',
      label: '就诊描述'
    },
    {
      prop: 'reMedicinal',
      label: '就诊药物',
      width: "85"
    },
    {
      prop: 'reFee',
      label: '价格',
      width: "65"
    },
    {
      prop: 'discountFee',
      label: '费用',
      width: "65"
    },
    {
      type: 'handle',
      label: '操作',
      width: '90',
      fixed: "right"
    }
  ]
};

export default contentConfig;
