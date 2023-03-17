/**
 *
 * @author:ChenDW
 * @date:2023-03-11 12：50
 */
const searchConfig = {
  pageName: 'appointment',
  formItemList: [
    {
      type: 'date',
      prop: 'preDate',
      label: '预约日期',
      placeholder: '请输入预约日期'
    },
    {
      type: 'select',
      prop: 'preTime',
      label: '预约时间',
      placeholder: '请选择预约时间',
      options: [
        {
          label: '08:40-09:00',
          value: '08:40-09:00'
        },
        {
          label: '09:00-9:20',
          value: '09:00-9:20'
        },
        {
          label: '09:20-09:40',
          value: '09:20-09:40'
        },
        {
          label: '09:40-10:00',
          value: '09:40-10:00'
        },
        {
          label: '10:00-10:20',
          value: '10:00-10:20'
        },
        {
          label: '10:00-10:20',
          value: '10:00-10:20'
        },
        {
          label: '10:00-10:20',
          value: '10:00-10:20'
        },
        {
          label: '10:20-10:40',
          value: '10:20-10:40'
        },
        {
          label: '10:40-11:00',
          value: '10:40-11:00'
        },
        {
          label: '11:00-11:20',
          value: '11:00-11:20'
        },
        {
          label: '11:20-11:40',
          value: '11:20-11:40'
        },
        {
          label: '11:40-12:00',
          value: '11:40-12:00'
        },
        {
          label: '14:20-14:40',
          value: '14:20-14:40'
        },
        {
          label: '14:40-15:00',
          value: '14:40-15:00'
        },
        {
          label: '15:00-15:20',
          value: '15:00-15:20'
        },
        {
          label: '15:20-15:40',
          value: '15:20-15:40'
        },
        {
          label:'15:40-16:00',
          value: '15:40-16:00'
        },
        {
          label: '16:00-16:20',
          value: '16:00-16:20'
        },
        {
          label: '16:20-16:40',
          value: '16:20-16:40'
        },
        {
          label:'16:40-17:00',
          value: '16:40-17:00'
        },
        {
          label:'17:00-17:20',
          value: '17:00-17:20'
        }
      ]
    },
    {
      type: 'select',
      prop: 'preStatus',
      label: '预约状态',
      placeholder: '请选择预约状态',
      options: [
        {
          label: '预约中',
          value: '预约中'
        },
        {
          label: '已到达',
          value: '已到达'
        },
        {
          label: '已完成',
          value: '已完成'
        },
        {
          label: '已取消',
          value: '已取消'
        }
      ]
    }
  ]
};

export default searchConfig;
