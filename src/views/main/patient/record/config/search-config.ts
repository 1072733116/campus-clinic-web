/**
 *
 * @author:ChenDW
 * @date:2023-03-11 12：50
 */
const searchConfig = {
  pageName: 'record',
  formItemList: [
    {
      type: 'input',
      prop: 'usNumber',
      label: '学号/工号',
      placeholder: '请输入患者学号/工号'
    },
    {
      type: 'input',
      prop: 'usName',
      label: '患者姓名',
      placeholder: '请输入患者姓名'
    },
    {
      type: 'input',
      prop: 'usCollege',
      label: '学院',
      placeholder: '请输入学院'
    },
    {
      type: 'input',
      prop: 'usMajor',
      label: '专业班级',
      placeholder: '请输入专业班级'
    },
    {
      type: 'date',
      prop: 'preDate',
      label: '就诊日期',
      placeholder: '请选择就诊日期'
    },
    {
      type: 'input',
      prop: 'dcName',
      label: '就诊医生',
      placeholder: '请输入就诊医生'
    }
  ]
};

export default searchConfig;
