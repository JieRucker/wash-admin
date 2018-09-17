<style lang="scss">
  .order-list-panel {
    .header-panel {

    }
  }
</style>

<template>
  <div class="order-list-panel">
    <div class="header-panel">
      <Form :model="searchItem" inline>
        <FormItem label="订单编号" :label-width="70">
          <Input v-model="searchItem.orderId" placeholder="请输入" style="width: 150px"></Input>
        </FormItem>
        <FormItem label="门店选择" :label-width="70">
          <Select v-model="searchItem.selectShop" placeholder="请选择" style="width:150px"
                  @click.native="showShopModal">
            <Option v-for="item in searchItem.shopList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="用户编号" :label-width="70">
          <Input v-model="searchItem.userId" placeholder="请输入" style="width: 150px"></Input>
        </FormItem>
        <FormItem label="设备编号" :label-width="70">
          <Input v-model="searchItem.deviceId" placeholder="请输入" style="width: 150px"></Input>
        </FormItem>
        <FormItem label="订单状态" :label-width="70">
          <Select v-model="searchItem.selectOrderState" placeholder="请选择" style="width:150px">
            <Option v-for="item in searchItem.orderStateList" :value="item.value" :key="item.value">{{item.label}}
            </Option>
          </Select>
        </FormItem>
        <FormItem class="search-item">
          <Button type="primary" @click="handleSearch">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div class="table-panel">
      <Table :columns="table.header" :data="table.body"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="table.args.totalCount" :current="table.args.currentPage" :page-size="table.args.length"
                show-total @on-change="changeTablePage"></Page>
        </div>
      </div>
    </div>

    <shop-nature ref="shopNature" @save-shop-nature="saveShopNature"></shop-nature>
    <wash-mode-nature ref="washModeNature"></wash-mode-nature>
    <user-info-nature ref="userInfoNature"></user-info-nature>
  </div>
</template>

<script>
  import shopNature from './modal/shop-nature.vue';
  import washModeNature from './modal/wash-mode-nature.vue';
  import userInfoNature from './modal/user-info-nature.vue';

  export default {
    name: "order-list",
    components: {
      shopNature,
      washModeNature,
      userInfoNature
    },
    data() {
      return {
        searchItem: {
          orderId: '',
          selectShop: '',
          userId: '',
          deviceId: '',
          selectOrderState: '',
          shopList: [
            {
              label: '一号店',
              value: '001'
            }
          ],
          orderStateList: [
            {
              value: '',
              label: '全部'
            },
            {
              value: 0,
              label: '未支付'
            },
            {
              value: 1,
              label: '已完成支付'
            },
            {
              value: 2,
              label: '失效'
            },
            /*{
              value: 3,
              label: '失效'
            },*/
            {
              value: 4,
              label: '强制停止'
            },
            {
              value: 5,
              label: '结束'
            },
            {
              value: 6,
              label: '已预约'
            },
            {
              value: 7,
              label: '正在运行'
            },
            /*{
              value: 8,
              label: '正在运行'
            },*/
            {
              value: 10,
              label: '退款中'
            },
            {
              value: 11,
              label: '已退款'
            },
            {
              value: 12,
              label: '退款失败'
            }
          ]
        },
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
            },
            {
              title: '操作',
              key: 'todo',
              align: 'center',
              render: (h, params) => {
                return h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '提示',
                        content: '<p>是否进行退款操作？</p>',
                        onOk: () => {
                          this.$axios.post(`${this.$api.orderRefund}`, $.param({
                            orderId: params.row.orderId,
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
                }, '退款')
              }
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
            length: 10,
            currentPage: 1,
            totalCount: 0
          }
        }
      }
    },
    mounted() {
      this.listOrder();
    },
    methods: {
      listOrder() {
        this.table.body = [];
        this.$axios.post(`${this.$api.listOrder}`, $.param({
          deviceCode: this.searchItem.deviceId,
          normalOrderState: this.searchItem.selectOrderState,
          prepareOrderState: this.searchItem.selectOrderState,
          orderId: this.searchItem.orderId,
          shopId: this.searchItem.selectShop,
          userId: this.searchItem.userId,
          userName: '',
          shopName: '',
          start: this.table.args.start,
          length: this.table.args.length,
        })).then((res) => {
          if (res.data.success) {
            res.data.data.orderList.forEach((m) => {
              this.switchOrderState(m.isPrepareOrder === 0 ? 0 : 1, m);
            });
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
      /**
       * 分页
       * @params {targetPage} 当前页
       */
      changeTablePage(targetPage) {
        this.table.args.start = (targetPage - 1) * this.table.args.length;
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
      showShopModal() {
        this.$refs.shopNature.$refs.addressPicker.listProvince();
        this.$refs.shopNature.listShop();
        this.$refs.shopNature.modal.shopModal.show = true;
      },
      /**
       * 查询
       */
      handleSearch() {
        this.listOrder();
      },
      saveShopNature(body) {
        this.searchItem.shopList = [];
        body.forEach((m) => {
          if (m.selected) {
            this.searchItem.shopList.push({
              label: m.shopName,
              value: m.shopId
            })
          }
        });

        this.searchItem.selectShop = this.searchItem.shopList.length ? this.searchItem.shopList[0].value : ''
      }
    }
  }
</script>

