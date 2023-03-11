/**
 *
 * @author:ChenDW
 * @date:2023-02-13 12:18
 */
const contentConfig = {
  pageName: 'medicine',
  header: {
    title: '药品列表',
    btnTitle: '新建药品'
  },
  propList: [
    {
      type: 'index',
      label: '序号',
      width: '60'
    },
    {
      prop: 'brand',
      label: '品牌',
      width: '110'
    },
    {
      prop: 'name',
      label: '名称',
      width: '170'
    },
    {
      prop: 'specs',
      label: '规格',
      width: '120'
    },
    {
      prop: 'typeName',
      label: '类型',
      width: '100'
    },
    {
      prop: 'suit',
      label: '适用人群',
      width: '120'
    },
    {
      prop: 'price',
      label: '价格',
      width: '100'
    },
    {
      prop: 'stock',
      label: '库存',
      width: '80'
    },
    {
      prop: 'description',
      label: '描述'
    },
    {
      type: 'handle',
      label: '操作',
      width: '160'
    }
  ]
};

export default contentConfig;
