<style lang="scss">
  .wash-mode-modal {
    .main-panel {
      margin: auto 100px;
      .step-item {
        &:first-child {
          margin-top: 0;
        }
        margin-top: 10px;
        .step-img {
          width: 70px;
          text-align: center;
          .vertical-arrow {
            width: 13px;
          }
        }
        .step-content {
          .step-name {
            font-size: 14px;
            font-weight: 700;
            display: inline-block;
            width: 70px;
            text-align: center;
            margin-right: 0;
          }
          .horizontal-arrow {
            width: 40px;
            vertical-align: middle;
            margin-bottom: 2px;
          }
        }
      }
    }
    .footer-panel {
      display: flex;
      justify-content: space-between;
    }
  }
</style>

<template>
  <Modal :title="modal.washModeModal.modalTitle" v-model="modal.washModeModal.show" width="600"
         class="wash-mode-modal">
    <div class="main-panel">
      <div class="step-item" v-for="(item,index) in modal.washModeModal.stepList">
        <div class="step-img" v-if="index != 0">
          <img class="vertical-arrow" :src="icon.verticalArrow">
        </div>
        <div class="step-content">
          <span class="step-name">{{item.stepName}}</span>
          <img class="horizontal-arrow" :src="icon.horizontalArrow">
          <span>{{item.createDate}}至{{item.endDate}}</span>
          <span>（用时{{item.time}}分钟）</span>
        </div>
      </div>
    </div>
    <div slot="footer">
      <div class="footer-panel">
        <Button type="primary" @click="prevOrder">上一单流程</Button>
        <Button type="primary" @click="nextOrder">下一单流程</Button>
      </div>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "wash-mode-nature",
    data() {
      return {
        modal: {
          washModeModal: {
            modalTitle: '柔和洗涤',
            show: false,
            stepList: [
              {
                stepName: '正在洗涤',
                createDate: '14:14:14',
                endDate: '16:16:16',
                time: '6'
              },
              {
                stepName: '漂洗',
                createDate: '14:14:14',
                endDate: '16:16:16',
                time: '6'
              },
              {
                stepName: '脱水',
                createDate: '14:14:14',
                endDate: '16:16:16',
                time: '7'
              },
              {
                stepName: '完成',
                createDate: '14:14:14',
                endDate: '16:16:16',
                time: '8'
              }
            ]
          }
        },
        icon: {
          horizontalArrow: require('assets/images/icon/horizontal-arrow.png'),
          verticalArrow: require('assets/images/icon/vertical-arrow.png')
        }
      }
    },
    methods: {
      prevOrder() {

      },
      nextOrder() {

      }
    }
  }
</script>

<style scoped>

</style>
