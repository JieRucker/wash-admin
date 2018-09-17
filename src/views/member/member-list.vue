<style lang="scss">
  .member-list-panel {
    .button-panel {
      margin-bottom: 10px;
      .delete-menber-button {
        margin-left: 5px;
      }
    }
  }

</style>

<template>
  <div class="member-list-panel">
    <div class="button-panel">
      <Button type="primary" @click="createMenberCard">添加会员卡</Button>
      <Button type="primary" class="delete-menber-button" @click="deleteMenberCard">批量删除</Button>
    </div>
    <div class="table-panel">
      <Table ref="memberTable" :columns="table.header" :data="table.body"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="table.args.totalCount" :current="table.args.currentPage" :page-size="table.args.length"
                show-total @on-change="changeMemberListPage"></Page>
        </div>
      </div>
    </div>

    <member-card-nature ref="memberCardNature"></member-card-nature>
  </div>
</template>

<script>
  import memberCardNature from './modal/member-card-nature.vue';

  export default {
    name: "member-list",
    components: {
      memberCardNature
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
              title: '会员卡名称',
              key: 'vipName',
              align: 'center'
            },
            {
              title: '会员卡购买价格（元）',
              key: 'price',
              align: 'center'
            },
            {
              title: '优惠程度（折）',
              key: 'discount',
              align: 'center',
              render: (h, params) => {
                return h('span', params.row.discount / 10)
              }
            },
            {
              title: '购买人数（人）',
              key: 'purchaseNumber',
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
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {

                        this.assign({
                          memberName: params.row.vipName,
                          memberDesc: params.row.vipDesc,
                          urlAddress: params.row.vipUrl,
                          memberPrice: params.row.price,
                          selectDiscount: params.row.discount,
                          selectValidMonth: params.row.validMonth
                        });
                        this.$refs.memberCardNature.modal.memberCardModal.vipCardId = params.row.vipCardId;
                        this.$refs.memberCardNature.modal.memberCardModal.modalType = 'update';
                        this.$refs.memberCardNature.modal.memberCardModal.show = true;
                      }
                    }
                  }, '编辑'),
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
                            this.$axios.post(`${this.$api.deleteVipCard}`, $.param({
                              vipCardIdList: JSON.stringify([`${params.row.vipCardId}`]),
                            })).then((res) => {
                              if (res.data.success) {
                                this.$Message.info('删除成功！');
                                this.listVipCard();
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
              vipName: '会员卡名称',
              price: '￥12.00',
              discount: '6折',
              purchaseNumber: '23423',
            }
          ],
          args: {
            start: 0,
            length: 10,
            currentPage: 1,
            totalCount: 0
          }
        },
      }
    },
    mounted() {
      this.listVipCard();
    },
    methods: {
      listVipCard() {
        this.table.body = [];
        this.$axios.post(`${this.$api.listVipCard}`, $.param({
          start: this.table.args.start,
          length: this.table.args.length,
        })).then((res) => {
          if (res.data.success) {
            this.table.body = res.data.data.vipCardList;
            this.table.args.totalCount = res.data.data.count;
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      assign(params, type) {
        this.$refs.memberCardNature.modal.memberCardModal.memberName = type === 'clear' ? '' : params.memberName;
        this.$refs.memberCardNature.modal.memberCardModal.memberDesc = type === 'clear' ? '' : params.memberDesc;
        this.$refs.memberCardNature.modal.memberCardModal.urlAddress = type === 'clear' ? '' : params.urlAddress;
        this.$refs.memberCardNature.modal.memberCardModal.memberPrice = type === 'clear' ? '' : params.memberPrice;
        this.$refs.memberCardNature.modal.memberCardModal.selectDiscount = type === 'clear' ? '' : params.selectDiscount;
        this.$refs.memberCardNature.modal.memberCardModal.selectValidMonth = type === 'clear' ? '' : params.selectValidMonth;
      },
      createMenberCard() {
        this.assign('clear');
        this.$refs.memberCardNature.modal.memberCardModal.show = true;
      },
      deleteMenberCard() {
        if (this.$refs.memberTable.getSelection().length) {
          let vipCardIdList = [];
          this.$refs.memberTable.getSelection().forEach((m) => {
            vipCardIdList.push(m.vipCardId)
          });

          this.$Modal.confirm({
            title: '提示',
            content: '<p>确定删除？</p>',
            onOk: () => {
              this.$axios.post(`${this.$api.deleteVipCard}`, $.param({
                vipCardIdList: JSON.stringify(vipCardIdList),
              })).then((res) => {
                if (res.data.success) {
                  this.$Message.info('删除成功！');
                  this.listVipCard();
                } else {
                  this.$Message.info(res.data.retMsg);
                }
              }).catch((err) => {
                console.log(err)
              })
            },
            onCancel: () => {

            }
          });
        } else {
          this.$Message.info('请选择会员卡');
        }


        console.log(this.$refs.memberTable.getSelection())
      },
      changeMemberListPage(targetPage) {
        this.table.args.start = (targetPage - 1) * this.table.args.length;
        this.listVipCard();
      }
    }
  }

</script>

