<template>
  <Modal :title="modal.deviceModal.modalTitle" v-model="modal.deviceModal.show" @on-ok="saveDeviceNature" width="950"
         class="shop-list-device-modal">
    <div class="main-panel">
      <Form :model="modal.deviceModal" class="device-box">
        <FormItem label="设备编号：" :label-width="80">
          <Input v-model="modal.deviceModal.deviceCode" placeholder="请输入" style="width: 200px"></Input>
          <Button type="primary" @click="deviceSearch">搜索</Button>
        </FormItem>
        <FormItem>
          <Table ref="deviceTable" :columns="modal.deviceModal.table.header" :data="modal.deviceModal.table.body"
                 :size="modal.deviceModal.table.tableSize"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="modal.deviceModal.table.args.totalCount"
                    :current="modal.deviceModal.table.args.currentPage"
                    :page-size="modal.deviceModal.table.args.length"
                    show-total @on-change="changeDeviceListPage"></Page>
            </div>
          </div>
        </FormItem>
      </Form>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "device-nature",
    data() {
      return {
        modal: {
          deviceModal: {
            show: false,
            modalTitle: '选择设备',
            deviceCode: '',
            table: {
              tableSize: 'small',
              header: [
                {
                  type: 'selection',
                  width: 60,
                  align: 'center'
                },
                {
                  title: '设备类型',
                  key: 'deviceTypeName',
                  align: 'center'
                },
                {
                  title: '设备编号',
                  key: 'deviceCode',
                  align: 'center'
                }
              ],
              body: [
                {
                  deviceTypeName: '洗衣机',
                  deviceCode: '11',
                }
              ],
              args: {
                start: 0,
                length: 5,
                currentPage: 1,
                totalCount: 0
              }
            }
          },
        }
      }
    },
    mounted() {
      this.listDevice();
    },
    methods: {
      listDevice() {
        this.modal.deviceModal.table.body = [];
        this.$axios.post(`${this.$api.listDevice}`, $.param({
          provinceId: '',
          cityId: '',
          countyId: '',
          companyName: '',
          deviceCode: this.modal.deviceModal.deviceCode,//设备编号
          deviceState: '',//设备状态
          deviceType: '',//1洗衣机 2烘干机
          isBindShop: '',//是否绑定门店 0否 1是
          shopName: '',
          shopAddress: '',
          start: this.modal.deviceModal.table.args.start,
          length: this.modal.deviceModal.table.args.length,
        })).then((res) => {
          if (res.data.success) {
            this.modal.deviceModal.table.body = res.data.data.deviceList;
            this.modal.deviceModal.table.args.totalCount = res.data.data.count;
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      changeDeviceListPage(targetPage) {
        this.modal.deviceModal.table.args.start = (targetPage - 1) * this.modal.deviceModal.table.args.length;
        this.listDevice();
      },
      saveDeviceNature() {
        let items = this.$refs.deviceTable.getSelection()
        items.forEach((m) => {
          this.$parent.modal.shopModal.deviceList.push({
            label: `${m.deviceTypeName}：${m.deviceCode}`,
            value: m.deviceId
          })
        })
      },
      deviceSearch() {
        this.listDevice();
      },
    }
  }
</script>
