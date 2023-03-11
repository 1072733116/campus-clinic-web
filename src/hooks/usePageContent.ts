/**
 *
 * @author:ChenDW
 * @date:2023-02-14 15:30
 */
import PageContent from '@/components/page-content';
import { ref } from 'vue';

const usePageContent = () => {
  const pageContentRef = ref<InstanceType<typeof PageContent>>();

  //点击搜索按钮处理
  const handleSearchEvent = (formData: any) => {
    pageContentRef.value?.fetchPageListDataAction(formData);
  };
  //点击重置按钮处理
  const handleResetEvent = () => {
    pageContentRef.value?.fetchPageListDataAction({});
  };
  //新增or编辑完成之后重新请求
  const handleCreateOrUpdateDoneEvent = () => {
    pageContentRef.value?.fetchPageListDataAction();
  };

  return {
    pageContentRef,
    handleSearchEvent,
    handleResetEvent,
    handleCreateOrUpdateDoneEvent
  }

};
export default usePageContent;
