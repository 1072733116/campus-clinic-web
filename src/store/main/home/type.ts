/**
 *
 * @author:ChenDW
 * @date:2023-02-04 15:41
 */
interface IHomeState {
  appointmentList:any[],
  total:number,
  pages: number,
  size: number,
  current: number,
}

export type {
  IHomeState
};
