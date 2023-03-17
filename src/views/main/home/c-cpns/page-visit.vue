<template>
  <div class='visit'>
    <div class='header' @click='handleGoToAppointment'>
      <el-icon class='icon'>
        <ArrowLeftBold />
      </el-icon>
      <div>预约列表</div>
    </div>
    <div class='content'>
      <div class='desc'>
        <el-descriptions :column='3' border size='large'>
          <el-descriptions-item
            label='学号'
            label-align='center'
            :min-width='120'
          >{{ appointment.preNumber }}
          </el-descriptions-item
          >
          <el-descriptions-item
            label='就诊人'
            label-align='center'
            :min-width='120'
          >
            {{ appointment.preName }}
          </el-descriptions-item>
          <el-descriptions-item label='联系方式' label-align='center'>
            {{ appointment.prePhone }}
          </el-descriptions-item>
          <el-descriptions-item label='性别' label-align='center'>
            <div>
              {{ appointment.preGender === 0 ? '男' : '女' }}
            </div>
          </el-descriptions-item>
          <el-descriptions-item label='预约日期' label-align='center'>
            {{ appointment.preDate }}
          </el-descriptions-item>
          <el-descriptions-item label='预约时间' label-align='center'>
            {{ appointment.preTime }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div class='reDesc'>
        <span class='title'>就诊描述</span>
        <el-input
          v-model='desc'
          :autosize='{ minRows: 2}'
          type='textarea'
          placeholder='患者就诊描述'
        />
      </div>
      <div class='reMedicinal'>
        <span style='display: block;margin-bottom: 10px;'>选择药物</span>
        <el-select
          v-model='medicinalObj'
          size='large'
          multiple
          placeholder='Select'
          style='width: 300px;'
          @change='handleSelectMedicineChange'
        >
          <el-option
            v-for='medicine in medicineList'
            :key='medicine.id'
            :label='medicine.name'
            :value='medicine.id'
          >
            <span style='float: left'>{{ medicine.name }}</span>
            <span
              style='
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px; '>
              {{ medicine.brand }}
            </span>
          </el-option>
        </el-select>
      </div>
    </div>
    <div class='fee'>
      <div class='reFee'>
        <span>药物所需费用: </span>
        <span style='font-weight: 600;'>￥{{ fee }}</span>
      </div>
      <div class='discountFee'>
        <span>实际支付费用: </span>
        <span style='font-weight: 600;'>￥{{ discount }}</span>
      </div>
    </div>
    <div class='footer'>
      <el-button type='primary' size='large' style='width: 150px;margin-top: 30px;' @click='handleConfirmClick'>完成就诊
      </el-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useLoginStore from '@/store/login';
import useSystemStore from '@/store/main/system';
import useHomeStore from '../../../../store/main/home';
import { storeToRefs } from 'pinia';
import { ElMessage,ElMessageBox } from 'element-plus';

const loginStore = useLoginStore();
const systemStore = useSystemStore();
const { medicineList } = storeToRefs(systemStore);
const homeStore = useHomeStore();
const { appointmentList } = storeToRefs(homeStore);
const route = useRoute();
const router = useRouter();
onMounted(() => {
  systemStore.getAllMedicineListAction();
});
const appointment = computed(() => {
  const appointment = appointmentList.value.find(item => item.id = route.params.appointmentId);
  return appointment;
});
const desc = ref<string>('');
const medicinalObj = ref({});
const reMedicinalList = ref([]);
const fee = computed<number>(() => {
  let totalFee = 0;
  reMedicinalList.value.forEach((medicineId) => {
    const item = medicineList.value.find(item => item.id == medicineId);
    totalFee = totalFee + item.price;
  });
  return totalFee;
});
const discount = computed(() => {
  if (fee.value === 0) return 0;
  let discount = fee.value - (fee.value * 0.75);
  return discount.toFixed(2);
});

const handleSelectMedicineChange = (list) => {
  reMedicinalList.value = list;
};
const handleConfirmClick = () => {
  ElMessageBox.confirm('是否确认完成就诊', '完成就诊', {
    type: 'success',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  }).then((confirm) => {
    let appointmentId = appointment.value.id;
    let project = appointment.value.project;
    let usNumber = appointment.value.preNumber;
    let usName = appointment.value.preName;
    let usGender = appointment.value.preGender;
    let usCollege = appointment.value.preCollege;
    let usMajor = appointment.value.preMajor;
    let preDate = appointment.value.preDate;
    let preTime = appointment.value.preTime;
    let dcNumber = loginStore.loginUserInfo.account;
    let dcName = appointment.value.dcName;
    let dcPhone = appointment.value.dcPhone;
    let reDesc = desc.value;
    let reMedicinal = reMedicinalList.value.toString();
    let reFee = fee.value;
    let discountFee = discount.value;
    const record = {
      appointmentId, project, usNumber, usName, usGender, usCollege, usMajor, preDate,
      preTime, dcNumber, dcName, dcPhone, reDesc, reMedicinal, reFee, discountFee
    };
    homeStore.createRecordAction(record).then((res) => {
      ElMessage({
        message: '完成就诊',
        type: 'success',
        duration: 1000
      });
      router.replace('/main/home');
    }).catch((err) => {
        ElMessage.error(err);
      });
  }, (cancel) => {

  });
};
const handleGoToAppointment = () => {
  router.replace('/main/home');
};

</script>

<style lang='less' scoped>

.visit {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  background: #fff;

  .header {
    display: flex;
    align-content: center;
    margin-bottom: 15px;
    color: #666;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      color: #000;
    }

    .icon {
      position: relative;
      top: 2px;
    }
  }
}

.content {
  width: 100%;
  background: #fff;

  .goods {
    .title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
    }
  }

  .desc {
    margin-bottom: 15px;
  }

  .reDesc {
    width: 50%;
    font-size: 16px;
    margin-bottom: 15px;

    .title {
      display: inline-block;
      margin-bottom: 10px;
      flex-basis: 80px;
    }
  }
}

.fee {
  display: inline-flex;
  align-items: center;
  margin-top: 30px;

  .reFee {
    margin-right: 50px;
  }
}

.footer {
  width: 150px;
  margin: 0px auto;
  padding: 30px;
}
</style>
