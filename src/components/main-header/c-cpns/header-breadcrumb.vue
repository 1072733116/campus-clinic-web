<template>
  <div class="header-breadcrumb">
    <el-breadcrumb :separator-icon="ArrowRight">
      <transition-group name="breadcrumb" mode="out-in">
        <template v-if="breadcrumbs">
          <el-breadcrumb-item :to="{ name: 'home' }" v-if="breadcrumbs[0].name !== '首页'">
            <div class="el-breadcrumb__inner is-link">
              <el-icon class="breadcrumb-icon">
                <HomeFilled />
              </el-icon>
              <span class="breadcrumb-title">首页</span>
            </div>
          </el-breadcrumb-item>
          <template v-for="item in breadcrumbs" :key="item.id">
            <el-breadcrumb-item :to="item.path">
              <div class="el-breadcrumb__inner is-link">
                <el-icon class="breadcrumb-icon">
                  <component :is="item.icon" />
                </el-icon>
                <span class="breadcrumb-title">{{ item.name }}</span>
              </div>
            </el-breadcrumb-item>
          </template>
        </template>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import useLoginStore from '@/store/login';
import { mapPathToBreadcrumbs } from '@/utils/menu';
import type { IBreadcrumb } from '@/utils/menu';
import type { IUserMenu } from '@/store/login/type';

const route = useRoute();
const loginStore = useLoginStore();
const userMenuList: IUserMenu[] = loginStore.userMenuList;
const breadcrumbs = computed<IBreadcrumb[]>(() => {
  const breadcrumbs = mapPathToBreadcrumbs(route.path, userMenuList);
  return breadcrumbs;
});
</script>

<style scoped lang="less">
.header-breadcrumb {
  display: flex;
  align-items: center;
  width: 260px;
  padding-right: 50px;
  overflow: hidden;

  .el-breadcrumb {
    white-space: nowrap;

    .el-breadcrumb__item {
      position: relative;
      display: inline-block;
      float: none;

      .el-breadcrumb__inner {
        display: inline-flex;

        .breadcrumb-icon {
          font-size: 16px;
          margin-top: 2px;
          margin-right: 3px;
        }

        .breadcrumb-title {
          margin-top: 3px;
        }

        :deep(.el-breadcrumb__separator) {
          position: relative;
          top: -1px;
        }
      }
    }
  }
}

.breadcrumb-enter-active {
  transition: all 1s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(15px);
}
</style>
