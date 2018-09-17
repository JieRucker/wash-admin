<template>
  <Modal :title="modal.selectCouponModal.modalTitle" v-model="modal.selectCouponModal.show" width="950"
         class="select-coupon-nature" @on-ok="saveSelectCouponNature">
    <div class="main-panel">
      <Form :model="modal.selectCouponModal" class="select-coupon-box">
        <Form inline>
          <FormItem :label="item.label" :label-width="40"
                    v-for="(item,index) in modal.selectCouponModal.couponTypeList"
                    :key="index">
            <Select v-model="item.selectCouponType" placeholder="请选择" style="width:150px"
                    @on-change="changeSelectCouponType">
              <Option v-for="option in item.options" :value="option.value" :key="option.value">{{option.label}}
              </Option>
            </Select>
          </FormItem>
        </Form>

        <FormItem>
          <Table ref="selectCouponTable" :columns="modal.selectCouponModal.table.header"
                 :data="modal.selectCouponModal.table.body"
                 :size="modal.selectCouponModal.table.tableSize"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="modal.selectCouponModal.table.args.totalCount"
                    :current="modal.selectCouponModal.table.args.currentPage"
                    :page-size="modal.selectCouponModal.table.args.length"
                    show-total @on-change="changeSelectCouponNaturePage"></Page>
            </div>
          </div>
        </FormItem>

      </Form>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "select-coupon-nature",
    data() {
      return {
        modal: {
          selectCouponModal: {
            show: false,
            modalTitle: '选择优惠券',
            couponTypeList: [
              {
                label: '类型',
                selectCouponType: '',
                options: [
                  {
                    label: '全部',
                    value: ''
                  },
                  {
                    label: '洗衣券',
                    value: '1'
                  },
                  {
                    label: '烘干券',
                    value: '2'
                  }
                ],
              }
            ],

            table: {
              tableSize: 'small',
              header: [
                {
                  type: 'selection',
                  width: 60,
                  align: 'center'
                },
                {
                  title: '优惠券类型',
                  key: 'couponTypeName',
                  align: 'center'
                },
                {
                  title: '优惠券价格（元）',
                  key: 'couponValue',
                  align: 'center'
                },
                {
                  title: '优惠券有效时间（月）',
                  key: 'validMonth',
                  align: 'center'
                },
                {
                  title: '需关联数量',
                  key: 'linkCount',
                  align: 'center',
                  render: (h, params) => {
                    return h('Input', {
                      props: {
                        placeholder: '请输入',
                        value: params.row.linkCount
                      },
                      style: {
                        width: '60px'
                      },
                      on: {
                        input: (value) => {
                          this.modal.selectCouponModal.table.body[`${params.index}`]._linkCount = value;
                        }
                      }
                    })
                  }
                }
              ],
              body: [
                {
                  couponType: '洗衣机',
                  couponTypeName: '洗衣机',
                  couponValue: '￥15.00',
                  validMonth: '1',
                  linkCount: '1'
                }
              ],
              args: {
                start: 0,
                length: 5,
                currentPage: 1,
                totalCount: 0
              }
            }
          }
        }
      }
    },
    methods: {
      listCoupon() {
        this.modal.selectCouponModal.table.body = [];
        this.$axios.post(`${this.$api.listCoupon}`, $.param({
          couponType: this.modal.selectCouponModal.couponTypeList[0].selectCouponType,
          start: this.modal.selectCouponModal.table.args.start,
          length: this.modal.selectCouponModal.table.args.length,
        })).then((res) => {
          if (res.data.success) {
            res.data.data.couponList.forEach((m) => {
              m.linkCount = 1
            });
            this.modal.selectCouponModal.table.body = res.data.data.couponList;
            this.modal.selectCouponModal.table.args.totalCount = res.data.data.count;
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      saveSelectCouponNature() {
        console.log(this.$refs.selectCouponTable.getSelection())

        let selectCouponTable = this.$refs.selectCouponTable.getSelection();
        if (selectCouponTable.length) {

          const loopQuery = (m) => {
            let tempCount = m._linkCount ? m._linkCount : m.linkCount;

            const loopPush = (m) => {
              this.$parent.modal.couponModal.table.body.push({
                couponId: m.couponId,
                couponType: m.couponType,
                couponTypeName: m.couponTypeName,
                couponValue: m.couponValue,
                validMonth: m.validMonth
              })
            };

            if (!this.$Global.isBlank(tempCount) && tempCount > 0) {
              for (let i = 1; i <= tempCount; i++) {
                loopPush(m)
              }
            } else {
              loopPush(m)
            }
          };

          selectCouponTable.forEach((m, key) => {
            loopQuery(m)
          })
        } else {
          return this.$Message.info('请选择优惠券！');
        }
      },
      changeSelectCouponType(value) {
        this.listCoupon();
      },
      changeSelectCouponNaturePage(targetPage) {
        this.modal.selectCouponModal.table.args.start = (targetPage - 1) * this.modal.selectCouponModal.table.args.length;
        this.listCoupon()
      },
    }
  }
</script>

