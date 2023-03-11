/**
 *
 * @author:ChenDW
 * @date:2023-02-14 15:42
 */
import PageDrawer from '@/components/page-drawer';
import { ref } from 'vue';

type ICallBackFn = (isCreate: boolean, data?: any) => void;

function usePageDrawer(callback?: ICallBackFn) {
  const pageDrawerRef = ref<InstanceType<typeof PageDrawer>>();
  //点击新增或者编辑按钮自定义事件处理
  const handleCreateOrUpdateEvent = (row?: any) => {
    pageDrawerRef.value?.setInitDrawerParam(!row, row);
    if (callback) callback(!row, row);
  };
  return {
    pageDrawerRef,
    handleCreateOrUpdateEvent
  };
}

export default usePageDrawer;
