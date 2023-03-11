/**
 *
 * @author:ChenDW
 * @date:2023-02-14 20:11
 */
const searchConfig = {
  pageName:"role",
  formItemList:[
    {
      type:"input",
      prop:"roleName",
      label:"角色名称",
      placeholder: '请输入角色名称'
    },
    {
      type:"input",
      prop:"roleDescription",
      label: "角色描述",
      placeholder: '请输入角色描述'
    }
  ]
};

export default searchConfig;
