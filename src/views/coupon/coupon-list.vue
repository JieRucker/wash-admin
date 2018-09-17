<style lang="scss">
  .coupon-list-panel {
    .button-panel {
      margin-bottom: 10px;
    }
  }
</style>

<template>
  <div class="coupon-list-panel">
    <div class="button-panel">
      <Button type="primary" @click="createCoupon">添加优惠券</Button>
      <Button type="error" @click="multDeleteCoupon">批量删除</Button>
    </div>
    <div class="table-panel">
      <Table ref="couponTable" :columns="table.header" :data="table.body"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="table.args.totalCount" :current="table.args.currentPage" :page-size="table.args.length"
                show-total @on-change="changeCouponPage"></Page>
        </div>
      </div>
    </div>

    <coupon-nature ref="couponNature"></coupon-nature>
  </div>
</template>

<script>
  import couponNature from './modal/coupon-nature.vue';

  export default {
    name: "coupon-list",
    components: {
      couponNature
    },
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
              title: '优惠券类型',
              key: 'couponTypeName',
              align: 'center'
            },
            {
              title: '优惠券价格',
              key: 'couponValue',
              align: 'center'
            },
            {
              title: '优惠券有效时间',
              key: 'validMonth',
              align: 'center'
            },
            {
              title: '操作',
              key: 'todo',
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: '提示',
                          content: '<p>确定删除？</p>',
                          onOk: () => {
                            this.$axios.post(`${this.$api.deleteCoupon}`, $.param({
                              couponIdList: JSON.stringify([`${params.row.couponId}`]),
                            })).then((res) => {
                              if (res.data.success) {
                                this.$Message.info('删除成功');
                                this.listCoupon();
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
                  }, '删除')
                ]);
              }
            }
          ],
          body: [
            {
              couponTypeName: '外星人',
              couponValue: '￥12.00',
              validMonth: '1天'
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
      this.listCoupon();
    },
    methods: {
      listCoupon() {
        this.table.body = [];
        this.$axios.post(`${this.$api.listCoupon}`, $.param({
          start: this.table.args.start,
          length: this.table.args.length,
        })).then((res) => {
          if (res.data.success) {
            this.table.body = res.data.data.couponList;
            this.table.args.totalCount = res.data.data.count;

            console.log(this.table.body)
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      changeCouponPage(targetPage) {
        this.table.args.start = (targetPage - 1) * this.table.args.length;
        this.listCoupon();
      },
      createCoupon() {
        this.$refs.couponNature.modal.couponModal.show = true;
      },
      multDeleteCoupon() {
        if (this.$refs.couponTable.getSelection().length) {
          let couponIdList = [];
          this.$refs.couponTable.getSelection().forEach((m) => {
            couponIdList.push(m.couponId)
          });

          this.$Modal.confirm({
            title: '提示',
            content: '<p>确定删除？</p>',
            onOk: () => {
              this.$axios.post(`${this.$api.deleteCoupon}`, $.param({
                couponIdList: JSON.stringify(couponIdList),
              })).then((res) => {
                if (res.data.success) {
                  this.$Message.info('删除成功');
                  this.listCoupon();
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
        } else {
          this.$Message.info('请选择优惠券！');
        }
      }
    }
  }
</script>

