/**
 *
 * @author:ChenDW
 * @date:2023-02-13 00:18
 */

interface IFormItem {
  type: string;
  prop: string;
  label: string;
  placeholder?: string;
  options?: IOptions[];
  initValue?: any;
}

interface IOptions {
  label: string;
  value: any;
}

export type { IFormItem };
