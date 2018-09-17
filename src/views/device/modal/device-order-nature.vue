<template>
  <Modal title="设备使用记录" v-model="modal.deviceOrderModal.show" width="1000">
    <Table :columns="modal.deviceOrderModal.table.header" :data="modal.deviceOrderModal.table.body"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="modal.deviceOrderModal.table.args.totalCount"
              :current="modal.deviceOrderModal.table.args.currentPage"
              :page-size="modal.deviceOrderModal.table.args.length"
              show-total @on-change="changeTablePage"></Page>
      </div>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "device-order-nature",
    data() {
      return {
        modal: {
          deviceOrderModal: {
            show: false,
            deviceCode: '',
            table: {
              header: [
                {
                  title: '订单编号',
                  key: 'orderId',
                  align: 'center'
                },
                {
                  title: '预约时间',
                  key: 'startDate',
                  align: 'center'
                },
                {
                  title: '下单时间',
                  key: 'createDate',
                  align: 'center'
                },
                {
                  title: '门店名称',
                  key: 'shopName',
                  align: 'center'
                },
                {
                  title: '门店地址',
                  key: 'shopAddress',
                  align: 'center'
                },
                {
                  title: '设备编号',
                  key: 'deviceId',
                  align: 'center',
                  render: (h, params) => {
                    return h('a', {
                      attrs: {
                        href: 'javascript:;'
                      },
                      on: {
                        click: () => {
                          this.$refs.washModeNature = {
                            modal: {
                              washModeModal: {
                                show: true,
                                stepList: this.table.body[`${params.index}`],
                                currentIndex: params.index,
                                orderList: this.table.body
                              }
                            }
                          };
                        }
                      }
                    }, params.row.deviceId)
                  }
                },
                {
                  title: '洗涤方式',
                  key: 'deviceWorkModeName',
                  align: 'center'
                },
                {
                  title: '用户编号',
                  key: 'userId',
                  align: 'center',
                  render: (h, params) => {
                    return h('a', {
                      attrs: {
                        href: 'javascript:;'
                      },
                      on: {
                        click: () => {
                          this.$refs.userInfoNature.modal.userInfoModal.show = true;
                          this.$refs.userInfoNature.modal.userInfoModal.userId = params.row.userId;
                          this.$refs.userInfoNature.listUserInfo();
                        }
                      }
                    }, params.row.userId)
                  }
                },
                {
                  title: '订单当前状态',
                  key: 'orderState',
                  align: 'center'
                }
              ],
              body: [
                {
                  orderId: '234234234234234',
                  startDate: '2018-4-20 16:20:00',
                  createDate: '2018-4-19 16:20:00',
                  shopName: '1号店',
                  shopAddress: '杭州',
                  deviceId: '11',
                  deviceWorkModeName: '洗衣',
                  userId: 'f3434gsf234234',
                  orderState: '正在使用'
                }
              ],
              args: {
                start: 0,
                length: 8,
                currentPage: 1,
                totalCount: 0
              }
            }
          }
        }
      }
    },
    methods: {
      listOrder() {
        this.modal.deviceOrderModal.table.body = [];
        this.$axios.post(`${this.$api.listOrder}`, $.param({
          deviceCode: this.modal.deviceOrderModal.deviceCode,
          normalOrderState: '',
          prepareOrderState: '',
          orderId: '',
          shopId: '',
          userId: '',
          userName: '',
          shopName: '',
          start: this.modal.deviceOrderModal.table.args.start,
          length: this.modal.deviceOrderModal.table.args.length,
        })).then((res) => {
          if (res.data.success) {
            res.data.data.orderList.forEach((m) => {
              this.switchOrderState(m.isPrepareOrder === 0 ? 0 : 1, m);
            });
            this.modal.deviceOrderModal.table.body = res.data.data.orderList;
            this.modal.deviceOrderModal.table.args.totalCount = res.data.data.count;
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      changeTablePage(targetPage) {
        this.modal.deviceOrderModal.table.args.start = (targetPage - 1) * this.modal.deviceOrderModal.table.args.length;
        this.listOrder()
      },
      /**
       * 显示订单状态
       * @param type 0 普通单；1 预约单
       * @param m
       */
      switchOrderState(type, m) {
        switch (type === 0 ? m.normalOrderState : m.prepareOrderState) {
          case 0:
            m.orderState = '未支付';
            break;
          case 1:
            m.orderState = '已完成支付';
            break;
          case 2:
            m.orderState = '失效';
            break;
          case 3:
            m.orderState = '失效';
            break;
          case 4:
            m.orderState = '强制停止';
            break;
          case 5:
            m.orderState = '结束';
            break;
          case 6:
            m.orderState = type === 0 ? '' : '已预约';
            break;
          case 7:
            m.orderState = type === 0 ? '' : '正在运行';
            break;
          case 8:
            m.orderState = '正在运行';
            break;
          case 10:
            m.orderState = '退款中';
            break;
          case 11:
            m.orderState = '已退款';
            break;
          case 12:
            m.orderState = '退款失败';
            break;
        }
      },
    }
  }
</script>

