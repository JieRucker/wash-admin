<style lang="scss">
  .order-refund-panel {
    .tab-panel {

    }
    .button-panel {
      margin-bottom: 10px;
      .refuse-button {
        margin-left: 5px;
      }
    }
  }

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
  <div class="order-refund-panel">
    <div class="tab-panel">
      <Tabs :animated="false" value="prepare" @on-click="tabToggle">
        <TabPane label="预约退款" name="prepare">
          <div class="button-panel">
            <Button type="primary" @click="orderPass('prepare')">批量通过</Button>
            <Button type="primary" class="refuse-button" @click="orderRefuse('prepare')">批量拒绝</Button>
          </div>
          <div class="table-panel">
            <Table ref="prepareTable" :columns="table.header" :data="table.body"></Table>
            <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                <Page :total="table.args.totalCount" :current="table.args.currentPage" :page-size="table.args.length"
                      show-total @on-change="changePreparePage"></Page>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane label="普通退款" name="normal">
          <div class="button-panel">
            <Button type="primary" @click="orderPass('normal')">批量通过</Button>
            <Button type="primary" class="refuse-button" @click="orderRefuse('normal')">批量拒绝</Button>
          </div>
          <div class="table-panel">
            <Table ref="normalTable" :columns="table.header" :data="table.body"></Table>
            <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                <Page :total="table.args.totalCount" :current="table.args.currentPage" :page-size="table.args.length"
                      show-total @on-change="changeNormalPage"></Page>
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>

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
    <Modal :title="modal.userInfoModal.modalTitle" v-model="modal.userInfoModal.show" width="400"
           class="user-info-modal">
      <div class="main-panel">
        <Avatar icon="person" size="large" :src="modal.userInfoModal.avatar"/>
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
  </div>
</template>

<script>
  export default {
    name: "order-refund",
    data() {
      return {
        table: {
          header: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
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
              title: '申请退款时间',
              key: 'refundDate',
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
                      this.modal.washModeModal.show = true;
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
                      this.modal.userInfoModal.show = true;
                    }
                  }
                }, params.row.userId)
              }
            },
            {
              title: '操作',
              key: 'todo',
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: '提示',
                          content: '<p>是否通过退款？</p>',
                          onOk: () => {
                            this.$axios.post(`${this.$api.acceptOrderRefund}`, $.param({
                              orderIdList: JSON.stringify([`${params.row.orderId}`]),
                            })).then((res) => {
                              if (res.data.success) {
                                this.$Message.info('成功');
                              } else {
                                this.$Message.info(res.data.retMsg);
                              }
                            }).catch((err) => {
                              console.log(err)
                            })
                          }
                        });
                      }
                    }
                  }, '通过'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: '提示',
                          content: '<p>拒绝备注</p>',
                          render: (h) => {
                            return h('div', [
                              h('p', {
                                style: {
                                  marginTop: '10px'
                                }
                              }, '拒绝备注：'),
                              h('Input', {
                                style: {
                                  marginTop: '10px'
                                },
                                props: {
                                  value: this.remark,
                                  autofocus: true,
                                  placeholder: '请输入拒绝备注'
                                },
                                on: {
                                  input: (val) => {
                                    this.remark = val;
                                  }
                                }
                              })
                            ])
                          },
                          onOk: () => {
                            this.$axios.post(`${this.$api.refusedToOrderRefund}`, $.param({
                              orderIdList: JSON.stringify([`${params.row.orderId}`]),
                              refuseRefundReason: this.remark
                            })).then((res) => {
                              if (res.data.success) {
                                this.$Message.info('成功');
                              } else {
                                this.$Message.info(res.data.retMsg);
                              }
                            }).catch((err) => {
                              console.log(err)
                            })
                          },
                          onCancel: () => {
                            this.input = '';
                          }
                        });
                      }
                    }
                  }, '拒绝')
                ]);
              }
            }
          ],
          body: [
            {
              orderId: '234234234234234',
              startDate: '2018-4-20 16:20:00',
              createDate: '2018-4-19 16:20:00',
              refundDate: '2018-4-21 16:20:00',
              shopName: '1号店',
              shopAddress: '杭州',
              deviceId: '11',
              deviceWorkModeName: '洗衣',
              userId: 'f3434gsf234234',
            }
          ],
          args: {
            start: 0,
            length: 10,
            currentPage: 1,
            totalCount: 0
          }
        },
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
          },
          userInfoModal: {
            modalTitle: '用户明细',
            avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
            show: false,
            infoList: [
              {
                label: '用户名称：',
                value: 'JRucker'
              },
              {
                label: '用户编号：',
                value: '23423423423'
              },
              {
                label: '联系电话：',
                value: '13575356945'
              },
              {
                label: '信息来源：',
                value: '微信'
              }
            ],
            addressList: [
              {
                label: '省：',
                value: '浙江省'
              },
              {
                label: '市：',
                value: '杭州市'
              },
              {
                label: '区：',
                value: '滨江区'
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
    mounted() {
      this.listRefund('prepare');
    },
    methods: {
      listRefund(type) {
        this.table.body = [];
        this.$axios.post(`${type === 'prepare' ? this.$api.listPrepareRefundingOrder : this.$api.listNormalRefundingOrder}`, $.param({
          deviceCode: '',
          orderId: '',
          shopId: '',
          userId: '',
          userName: '',
          shopName: '',
          start: this.table.args.start,
          length: this.table.args.length,
        })).then((res) => {
          if (res.data.success) {
            this.table.body = res.data.data.orderList;
            this.table.args.totalCount = res.data.data.count;

            console.log(this.table.body)
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      changePreparePage(targetPage) {
        this.table.args.start = (targetPage - 1) * this.table.args.length;
        this.listRefund('prepare');
      },
      changeNormalPage(targetPage) {
        this.table.args.start = (targetPage - 1) * this.table.args.length;
        this.listRefund('normal');
      },
      tabToggle(name) {
        switch (name) {
          case 'prepare':
            this.listRefund('prepare');
            break;
          case 'normal':
            this.listRefund('normal');
            break;
        }
      },
      orderPass(type) {
        const confirmModal = (orderIdList) => {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>是否进行批量通过？</p>',
            onOk: () => {
              this.$axios.post(`${this.$api.acceptOrderRefund}`, $.param({
                orderIdList: orderIdList,
              })).then((res) => {
                if (res.data.success) {
                  this.$Message.info('成功');
                  switch (type) {
                    case 'prepare':
                      this.listRefund('prepare');
                      break;
                    case 'normal':
                      this.listRefund('normal');
                      break;
                  }
                } else {
                  this.$Message.info(res.data.retMsg);
                }
              }).catch((err) => {
                console.log(err)
              })
            }
          });
        };

        switch (type) {
          case 'prepare':
            if (this.$refs.prepareTable.getSelection().length) {
              let orderIdGroup = [];
              this.$refs.prepareTable.getSelection().forEach((m) => {
                orderIdGroup.push(m.orderId)
              });

              confirmModal(JSON.stringify(orderIdGroup));
            } else {
              this.$Message.info('请选择订单');
            }
            break;
          case 'normal':
            if (this.$refs.normalTable.getSelection().length) {
              let orderIdGroup = [];
              this.$refs.normalTable.getSelection().forEach((m) => {
                orderIdGroup.push(m.orderId)
              });

              confirmModal(JSON.stringify(orderIdGroup));
            } else {
              this.$Message.info('请选择订单');
            }
            break;
        }
      },
      orderRefuse(type) {
        const confirmModal = (orderIdList) => {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>是否进行批量拒绝？</p>',
            onOk: () => {
              this.$axios.post(`${this.$api.refusedToOrderRefund}`, $.param({
                orderIdList: orderIdList,
              })).then((res) => {
                if (res.data.success) {
                  this.$Message.info('成功');
                  switch (type) {
                    case 'prepare':
                      this.listRefund('prepare');
                      break;
                    case 'normal':
                      this.listRefund('normal');
                      break;
                  }
                } else {
                  this.$Message.info(res.data.retMsg);
                }
              }).catch((err) => {
                console.log(err)
              })
            }
          });
        };

        switch (type) {
          case 'prepare':
            if (this.$refs.prepareTable.getSelection().length) {
              let orderIdGroup = [];
              this.$refs.prepareTable.getSelection().forEach((m) => {
                orderIdGroup.push(m.orderId)
              });

              confirmModal(JSON.stringify(orderIdGroup));
            } else {
              this.$Message.info('请选择订单');
            }
            break;
          case 'normal':
            if (this.$refs.normalTable.getSelection().length) {
              let orderIdGroup = [];
              this.$refs.normalTable.getSelection().forEach((m) => {
                orderIdGroup.push(m.orderId)
              });

              confirmModal(JSON.stringify(orderIdGroup));
            } else {
              this.$Message.info('请选择订单');
            }
            break;
        }
      },


      prevOrder() {

      },
      nextOrder() {

      }
    }
  }
</script>

