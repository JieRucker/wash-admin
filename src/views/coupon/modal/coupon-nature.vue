<template>
  <Modal :title="modal.couponModal.modalTitle" v-model="modal.couponModal.show" width="650"
         class="coupon-list-coupon-modal" @on-ok="saveCouponModal">
    <div class="main-panel">
      <Form :model="modal.couponModal" class="coupon-box">
        <FormItem>
          <Table :show-header="modal.couponModal.table.showHeader"
                 :height="modal.couponModal.table.body.length > 6 ? 315 : ''"
                 :size="modal.couponModal.table.tableSize"
                 :data="modal.couponModal.table.body"
                 :columns="modal.couponModal.table.header">
          </Table>
        </FormItem>
        <FormItem>
          <Row>
            <Col span="3">
              <Button type="dashed" long @click="addCouponItem" icon="plus-round">添加</Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </div>
  </Modal>
</template>

<script>
    export default {
        name: "coupon-nature",
      data(){
          return{
            modal: {
              couponModal: {
                show: false,
                modalTitle: '添加优惠券',

                table: {
                  showHeader: true,
                  fixedHeader: true,
                  tableSize: 'small',
                  header: [
                    {
                      title: '优惠券类型',
                      key: 'couponTypeList',
                      align: 'center',
                      render: (h, params) => {
                        return h('Select', {
                          props: {
                            placeholder: '请选择',
                            value: params.row.couponType
                          },
                          style: {
                            width: '100px'
                          }
                        }, params.row.couponTypeList.map((item) => {
                          return h('Option', {
                            props: {
                              value: item.value,
                              key: item.value
                            },
                            nativeOn: {
                              click: (e) => {
                                let index = params.index;
                                this.modal.couponModal.table.body[index].couponType = e.target.__vue__.value;
                              },
                              change: () => {
                                console.log(444)
                              }
                            }
                          }, item.label)
                        }))
                      }
                    },
                    {
                      title: '优惠券价格',
                      key: 'couponValue',
                      align: 'center',
                      render: (h, params) => {
                        return h('Input', {
                          props: {
                            placeholder: '请输入',
                            value: params.row.couponValue
                          },
                          style: {
                            width: '60px'
                          },
                          on: {
                            input: (value) => {
                              setTimeout(() => {
                                let index = params.index;
                                this.modal.couponModal.table.body[index].couponValue = value;
                              }, 1000)
                            }
                          }
                        })
                      }
                    },
                    {
                      title: '有效时间',
                      key: 'validMonth',
                      align: 'center',
                      render: (h, params) => {
                        return h('div', [
                          h('Input', {
                            props: {
                              placeholder: '请输入',
                              value: params.row.validMonth
                            },
                            style: {
                              width: '60px'
                            },
                            on: {
                              input: (value) => {
                                setTimeout(() => {
                                  let index = params.index;
                                  this.modal.couponModal.table.body[index].validMonth = value;
                                }, 1000)
                              }
                            }
                          }),
                          h('span', ' 天')
                        ])
                      }
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
                              this.modal.couponModal.table.body.splice(params.index, 1)
                            }
                          }
                        }, '删除')
                      }
                    }
                  ],
                  body: [
                    {
                      couponTypeList: [
                        {
                          label: '洗衣券',
                          value: 1
                        },
                        {
                          label: '烘干券',
                          value: 2,
                        }
                      ],
                      couponName: '',
                      couponType: '',
                      couponValue: '',
                      isUniversal: '',//是否是通用券 0 false 1 true
                      validMonth: '',//有效月份
                    }
                  ]
                }
              }
            }
          }
      },
      methods:{
        addCouponItem() {
          this.modal.couponModal.table.body.push({
            couponTypeList: [
              {
                label: '洗衣券',
                value: 1
              },
              {
                label: '烘干券',
                value: 2,
              }
            ],
            couponName: '',
            couponType: '',
            couponValue: '',
            isUniversal: '',
            validMonth: ''
          })
        },
        saveCouponModal() {
          let valid = [];

          this.modal.couponModal.table.body.forEach((m) => {
            if (this.$Global.isBlank(m.couponType)) {
              return this.$Message.info('请选择优惠券类型！');
            } else if (this.$Global.isBlank(m.couponValue)) {
              return this.$Message.info('请输入优惠券价格！');
            } else if (this.$Global.isBlank(m.validMonth)) {
              return this.$Message.info('请输入有效时间！');
            } else {
              valid.push(true);
            }
          });

          if (valid.length == this.modal.couponModal.table.body.length) {
            this.$axios.post(`${this.$api.addCoupon}`, $.param({
              couponList: JSON.stringify(this.modal.couponModal.table.body)
            })).then((res) => {
              if (res.data.success) {
                this.$Message.info('添加成功！');
                this.$parent.listCoupon();
              } else {
                this.$Message.info(res.data.retMsg);
              }
            }).catch((err) => {
              console.log(err)
            })
          }
        }
      }
    }
</script>
