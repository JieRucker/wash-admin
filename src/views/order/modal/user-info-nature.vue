<style lang="scss">
  .user-info-modal {
    .main-panel {
      padding: 0 15px;
      .ivu-avatar-large {
        width: 60px;
        height: 60px;
        line-height: 60px;
        border-radius: 40px;
      }
      .user-box {
        margin-top: 10px;
        .ivu-form-item {
          margin-bottom: 7px;
        }
      }
    }
  }
</style>

<template>
  <Modal :title="modal.userInfoModal.modalTitle" v-model="modal.userInfoModal.show" width="400"
         class="user-info-modal">
    <div class="main-panel">
      <Avatar icon="person" size="large" :src="modal.userInfoModal.headUrl"/>
      <Form :model="modal.userInfoModal" class="user-box">
        <FormItem :label="item.label" :label-width="72" v-for="(item,index) in modal.userInfoModal.infoList"
                  :key="index">
          {{item.value}}
        </FormItem>
      </Form>
      <Form :model="modal.userInfoModal" inline>
        <FormItem :label="item.label" :label-width="40" v-for="(item,index) in modal.userInfoModal.addressList"
                  :key="index">
          {{item.value}}
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "user-info-nature",
    data() {
      return {
        modal: {
          userInfoModal: {
            modalTitle: '用户明细',
            headUrl: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
            show: false,
            infoList: [
              {
                key: 'userName',
                label: '用户名称：',
                value: 'JRucker'
              },
              {
                key: 'userId',
                label: '用户编号：',
                value: '23423423423'
              },
              {
                key: 'phoneNum',
                label: '联系电话：',
                value: '13575356945'
              },
              {
                key: 'appTypeName',
                label: '信息来源：',
                value: '微信'
              }
            ],
            addressList: [
              {
                key: 'province',
                label: '省：',
                value: ''
              },
              {
                key: 'city',
                label: '市：',
                value: ''
              },
              {
                key: 'county',
                label: '区：',
                value: ''
              }
            ],
            userId: ''
          }
        }
      }
    },
    methods: {
      listUserInfo() {
        this.$axios.post(`${this.$api.getUserByUserId}`, $.param({
          userId: this.modal.userInfoModal.userId,
        })).then((res) => {
          if (res.data.success) {
            this.modal.userInfoModal.headUrl = res.data.data.headUrl;
            this.modal.userInfoModal.infoList.forEach((m) => {
              switch (m.key) {
                case 'userName':
                  m.value = res.data.data.userName;
                  break;
                case 'userId':
                  m.value = res.data.data.userId;
                  break;
                case 'phoneNum':
                  m.value = res.data.data.phoneNum;
                  break;
                case 'appTypeName':
                  m.value = res.data.data.appTypeName;
                  break;
              }
            })

            this.modal.userInfoModal.addressList.forEach((m) => {
              switch (m.key) {
                case 'province':
                  m.value = res.data.data.province ? res.data.data.province : '无';
                  break;
                case 'city':
                  m.value = res.data.data.city ? res.data.data.city : '无';
                  break;
                case 'county':
                  m.value = res.data.data.county ? res.data.data.county : '无';
                  break;
              }
            })
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
