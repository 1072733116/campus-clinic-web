/**
 *
 * @author:ChenDW
 * @date:2023-02-13 16:06
 */
const drawerConfig = {
  pageName: 'medicine',
  header:{
    createTitle:"新增药品",
    updateTitle:"编辑药品"
  },
  rules: {
    brand: [{ required: true, message: '请输入药品品牌' }],
    name: [{ required: true, message: '请输入药品名称' }],
    specs: [{ required: true, message: '请输入药品规格' }],
    type: [{ required: true, message: '请选择药品类型' }],
    suit: [{ required: true, message: '请输入适用人群' }],
    price: [{ required: true, message: '请输入药品价格' }],
    stock: [{ required: true, message: '请输入药品库存' }],
    description: [{ required: true, message: '请输入药品描述' }]
  },
  formItemList: [
    {
      type: 'input',
      prop: 'brand',
      label: '药品品牌',
      placeholder: '请输入药品品牌'
    },
    {
      type: 'input',
      prop: 'name',
      label: '药品名称',
      placeholder: '请输入药品名称'
    },
    {
      type: 'input',
      prop: 'specs',
      label: '药品规格',
      placeholder: '请输入药品规格'
    },
    {
      type: 'select',
      prop: 'type',
      label: '药品类型',
      placeholder: '请选择药品类型',
      options: []
    },
    {
      type: 'input',
      prop: 'suit',
      label: '适用人群',
      placeholder: '请输入适用人群'
    },
    {
      type: 'input',
      prop: 'price',
      label: '药品价格',
      placeholder: '请输入药品价格'
    },
    {
      type: 'input',
      prop: 'stock',
      label: "药品库存",
      placeholder: '请输入药品库存'
    },
    {
      type: 'textarea',
      prop: 'description',
      label: "药品描述",
      placeholder: '请输入药品描述'
    }
  ]
};

export default drawerConfig;
