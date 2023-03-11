/**
 *
 * @author:ChenDW
 * @date:2023-02-06 19:42
 */
interface IDrugState {
  total: number
  pages: number
  size: number
  current: number
  medicineList: IMedicine[] | any,
  medicineTypeList: IMedicineType[] | any;
}

interface IPageData<T = any> {
  total: number //数据总数
  size: number //一页展示的数据
  current: number //当前页码
  pages: number //数据页数
  records: T[] //数据
}

interface IMedicine {
  id: number
  brand: string
  name: string
  specs: string
  type: number
  typeName: string
  suit: string
  price: number
  stock: number
  description: string
}

interface IMedicineType {
  id: number,
  name: string
}

export type{
  IDrugState,
  IMedicine,
  IPageData
};

