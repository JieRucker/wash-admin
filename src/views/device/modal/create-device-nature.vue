<template>
  <Modal title="添加设备" v-model="modal.createDeviceModal.show" width="600" @on-ok="createDeviceModal">
    <Form :model="modal.createDeviceModal" inline>
      <FormItem label="设备编号" :label-width="70">
        <Input v-model="modal.createDeviceModal.deviceCode" placeholder="请输入对应设备编号" style="width: 150px"></Input>
      </FormItem>
      <FormItem>
        <Select v-model="modal.createDeviceModal.selectDeviceType" placeholder="请选择" style="width:150px">
          <Option v-for="item in modal.createDeviceModal.deviceType" :value="item.value" :key="item.value">
            {{item.label}}
          </Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
  export default {
    name: "create-device-nature",
    data() {
      return {
        modal: {
          createDeviceModal: {
            show: false,
            deviceCode: '',
            selectDeviceType: '',
            deviceType: [
              {
                label: '请选择',
                value: ''
              },
              {
                label: '洗衣机',
                value: 1
              },
              {
                label: '烘干机',
                value: 2
              }
            ]
          }
        },
      }
    },
    methods: {
      /**
       * 添加设备
       */
      createDeviceModal() {
        if (this.$Global.isBlank(this.modal.createDeviceModal.deviceCode)) {
          return this.$Message.info('请选择设备编号！');
        } else if (this.$Global.isBlank(this.modal.createDeviceModal.selectDeviceType)) {
          return this.$Message.info('请选择设备类型！');
        }

        this.$axios.post(`${this.$api.addDevice}`, $.param({
          deviceCode: this.modal.createDeviceModal.deviceCode,
          deviceType: this.modal.createDeviceModal.selectDeviceType,
          shopId: ''
        })).then((res) => {
          if (res.data.success) {
            this.$Message.info('添加成功！');
            this.$parent.listDevice();
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        });
      }
    }
  }
</script>

