<style lang="scss">
  .user-list-coupon-modal {
    .main-panel {
      .upload-image {
        margin-bottom: 0;
        .ivu-form-item-content {
          display: flex;
        }
      }
      .shop-form {
        .ivu-form-item-content {
          margin-left: 72px;
        }
        .shop-list {
          li {
            float: left;
            margin-right: 5px;
            margin-bottom: 5px;
            &:last-child {
              margin: 2px 0;
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div>
    <Modal :title="modal.couponModal.modalTitle" v-model="modal.couponModal.show" width="650"
           class="user-list-coupon-modal" @on-ok="saveCouponNature">
      <div class="main-panel">
        <Form :model="modal.couponModal" class="coupon-box">
          <FormItem label="门店：" :label-width="50" class="shop-form">
            <div class="shop-list">
              <ul class="clearfix">
                <li v-for="(item,index) in modal.couponModal.shopList" v-if="modal.couponModal.shopList.length">
                  <Tag type="dot" closable @on-close="deleteShop(index)">{{item.label}}</Tag>
                </li>
                <li v-if="!modal.couponModal.shopList.length">无</li>
                <li>
                  <Button type="dashed" long @click="addShopModal" icon="plus-round">添加门店</Button>
                </li>
              </ul>
            </div>
          </FormItem>
          <FormItem>
            <Table ref="couponNatureTable" :show-header="modal.couponModal.table.showHeader"
                   :height="modal.couponModal.table.body.length > 6 ? 315 : ''"
                   :size="modal.couponModal.table.tableSize"
                   :data="modal.couponModal.table.body"
                   :columns="modal.couponModal.table.header">
            </Table>
          </FormItem>
          <FormItem>
            <Row>
              <Col span="3">
                <Button type="dashed" long @click="addSelectCouponModal" icon="plus-round">添加</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <shop-nature ref="shopNature"></shop-nature>
    <select-coupon-nature ref="selectCouponNature"></select-coupon-nature>
  </div>

</template>

<script>
  import shopNature from './shop-nature.vue';
  import selectCouponNature from './select-coupon-nature.vue';

  export default {
    name: "coupon-nature",
    components: {
      shopNature,
      selectCouponNature
    },
    data() {
      return {
        modal: {
          couponModal: {
            show: false,
            modalTitle: '添加优惠券',
            shopList: [],
            table: {
              showHeader: true,
              fixedHeader: true,
              tableSize: 'small',
              header: [
                {
                  title: '类型',
                  key: 'couponTypeName',
                  align: 'center'
                },
                {
                  title: '价格（元）',
                  key: 'couponValue',
                  align: 'center'
                },
                {
                  title: '有效时间（月）',
                  key: 'validMonth',
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
                          let index = params.index;
                          this.modal.couponModal.table.body.splice(index, 1);
                        }
                      }
                    }, '删除')
                  }
                }
              ],
              body: [],
              userId: ''
            }
          },
        }
      }
    },
    methods: {
      addShopModal() {
        this.$refs.shopNature.$refs.addressPicker.listProvince();
        this.$refs.shopNature.listShop();
        this.$refs.shopNature.modal.shopModal.show = true;
      },
      addSelectCouponModal() {
        this.$refs.selectCouponNature.modal.selectCouponModal.show = true;
        this.$refs.selectCouponNature.listCoupon();
      },
      deleteShop(index) {
        this.modal.couponModal.shopList.splice(index, 1);
      },
      saveCouponNature() {
        let couponNatureTable = this.$refs.couponNatureTable.getSelection();
        let couponIdList = [];
        let shopIdList = [];

        if (this.modal.couponModal.shopList.length > 0) {
          this.modal.couponModal.shopList.forEach((m) => {
            shopIdList.push(m.shopId)
          });
        } else {
          return this.$Message.info('请添加门店！');
        }

        if (this.modal.couponModal.table.body.length > 0) {
          this.modal.couponModal.table.body.forEach((m) => {
            couponIdList.push(m.couponId)
          });
        } else {
          return this.$Message.info('请添加优惠券！');
        }

        this.$axios.post(`${this.$api.bindUserCoupon}`, $.param({
          userId: this.modal.couponModal.table.userId,
          couponIdList: JSON.stringify(couponIdList),
          shopIdList: JSON.stringify(shopIdList)
        })).then((res) => {
          if (res.data.success) {
            this.$Message.info('成功');
            this.$parent.listUser();
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


