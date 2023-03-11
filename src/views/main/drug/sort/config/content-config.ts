/**
 *
 * @author:ChenDW
 * @date:2023-02-14 12:13
 */
const contentConfig = {
  pageName: 'medicine/type',
  propList: [
    {
      type: 'index',
      label: '序号',
      width: '100'
    },
    {
      prop: 'name',
      label: '类型',
      width: '300'
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
      width: '250'
    }
  ],
  header: {
    title: '药品类型列表',
    btnTitle: '新建类型'
  }
};

export default contentConfig;
