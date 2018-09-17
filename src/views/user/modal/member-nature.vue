<template>
  <Modal :title="modal.memberModal.modalTitle" v-model="modal.memberModal.show" width="800" @on-ok="saveMemberNature">
    <div class="member-modal">
      <div class="table-panel">
        <Table ref="memberTable" :columns="modal.memberModal.table.header" :data="modal.memberModal.table.body"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="modal.memberModal.table.args.totalCount"
                  :current="modal.memberModal.table.args.currentPage"
                  :page-size="modal.memberModal.table.args.length"
                  show-total @on-change="changeMemberNaturePage"></Page>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "member-nature",
    data() {
      return {
        modal: {
          memberModal: {
            show: false,
            modalTitle: '选择会员卡',
            table: {
              header: [
                {
                  title: '选择',
                  key: 'selected',
                  align: 'left',
                  render: (h, params) => {
                    return h('Radio', {
                      props: {
                        value: params.row.selected
                      },
                      nativeOn: {
                        click: () => {
                          this.modal.memberModal.table.body.forEach((m) => {
                            m.selected = false;
                          });

                          this.modal.memberModal.table.body[`${params.index}`].selected = true;
                        }
                      }
                    })
                  }
                },
                {
                  title: '会员卡名称',
                  key: 'vipName',
                  align: 'center'
                },
                {
                  title: '会员卡购买价格',
                  key: 'price',
                  align: 'center'
                },
                {
                  title: '优惠程度',
                  key: 'discount',
                  align: 'center'
                },
              ],
              body: [],
              args: {
                start: 0,
                length: 10,
                currentPage: 1,
                totalCount: 0
              },
              userId: ''
            }
          },
        }
      }
    },
    methods: {
      listVipCard() {
        this.modal.memberModal.table.body = [];
        this.$axios.post(`${this.$api.listVipCard}`, $.param({
          start: this.modal.memberModal.table.args.start,
          length: this.modal.memberModal.table.args.length,
        })).then((res) => {
          if (res.data.success) {
            res.data.data.vipCardList.forEach((m) => {
              m.selected = false;
            });
            this.modal.memberModal.table.body = res.data.data.vipCardList;
            this.modal.memberModal.table.args.totalCount = res.data.data.count;
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      saveMemberNature() {
        let vipCardId = '';
        this.modal.memberModal.table.body.forEach((m) => {
          if (m.selected) {
            vipCardId = m.vipCardId;
          }
        });

        if (!this.$Global.isBlank(vipCardId)) {
          this.$axios.post(`${this.$api.bindUserVipCardRel}`, $.param({
            userId: this.modal.memberModal.table.userId,
            vipCardId: vipCardId,
          })).then((res) => {
            if (res.data.success) {
              this.$Message.info('绑定成功');
              this.$parent.listUser();
            } else {
              this.$Message.info(res.data.retMsg);
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          return this.$Message.info('请选择需要绑定的会员卡');
        }
      },
      changeMemberNaturePage(targetPage) {
        this.modal.memberModal.table.args.start = (targetPage - 1) * this.modal.memberModal.table.args.length;
        this.listVipCard()
      }
    }
  }
</script>

