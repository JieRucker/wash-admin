<style lang="scss">
  .present-list-panel {
    .button-panel {
      margin-bottom: 10px;
      .delete-present-btn {
        margin-left: 5px;
      }
    }
  }

</style>

<template>
  <div class="present-list-panel">
    <div class="button-panel">
      <Button type="primary" @click="createPresent">添加礼包</Button>
      <Button type="error" class="delete-present-btn" @click="multDeletePresent">批量删除</Button>
    </div>
    <div class="table-panel">
      <Table ref="presentTable" :columns="table.header" :data="table.body"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="table.args.totalCount" :current="table.args.currentPage" :page-size="table.args.length"
                show-total @on-change="changePresentPage"></Page>
        </div>
      </div>
    </div>

    <present-nature ref="presentNature"></present-nature>
  </div>
</template>

<script>
  import presentNature from './modal/present-nature.vue';

  export default {
    name: "present-list",
    components: {
      presentNature
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
              title: '礼包名称',
              key: 'giftPacksName',
              align: 'center'
            },
            {
              title: '礼包类型',
              key: 'giftPacksType',
              align: 'center'
            },
            {
              title: '礼包数量',
              key: 'couponNumber',
              align: 'center'
            },
            {
              title: '领取人数',
              key: 'receiveNumber',
              align: 'center'
            },
            {
              title: '所属门店',
              key: 'shopNameList',
              align: 'center',
              render: (h, params) => {
                return h('div', {
                  domProps: {
                    title: params.row.shopNameList
                  },
                  style: {
                    'overflow': 'hidden',
                    'text-overflow': 'ellipsis',
                    'white-space': 'nowrap'
                  }
                }, JSON.stringify(params.row.shopNameList).replace(/\"/g, '').replace(/\[/g, '').replace(/\]/g, ''))
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
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: '提示',
                          content: `<p>确定${this.$Global.int2Bool(params.row.state) ? '禁用' : '启用'}？</p>`,
                          onOk: () => {

                            console.log(this.$Global)

                            this.$axios.post(`${this.$api.modifyGiftPacksState}`, $.param({
                              giftPacksId: params.row.giftPacksId,
                              state: this.$Global.int2Bool(params.row.state) ? 0 : 1
                            })).then((res) => {
                              if (res.data.success) {
                                this.listPresent();
                                this.$Message.info('成功！');
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
                  }, params.row.state == 0 ? '启用' : '禁用'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    attr: {
                      title: '3434'
                    },
                    style: {
                      marginLeft: '5px'
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: '提示',
                          content: '<p>是否删除？</p>',
                          onOk: () => {
                            this.$axios.post(`${this.$api.deleteCouponGiftPack}`, $.param({
                              giftPacksIdList: JSON.stringify([`${params.row.giftPacksId}`])
                            })).then((res) => {
                              if (res.data.success) {
                                this.$Message.info('成功');
                                this.listPresent();
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
                  }, '删除'),
                ]);
              }
            }
          ],
          body: [
            {
              giftPacksName: '外星人',
              giftPacksType: '新人礼包',
              couponNumber: '14张',
              receiveNumber: '10',
              shopNameList: ['6号店', '7号店', '8号店', '9号店']
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
      this.listPresent();
    },
    methods: {
      listPresent() {
        this.table.body = [];
        this.$axios.post(`${this.$api.listCouponGiftPack}`, $.param({
          start: this.table.args.start,
          length: this.table.args.length,
        })).then((res) => {
          if (res.data.success) {
            res.data.data.giftPacksSelfList.forEach((m) => {
              switch (m.giftPacksType) {
                case 1:
                  m.giftPacksType = '通用礼包';
                  break;
                case 2:
                  m.giftPacksType = '新人礼包';
                  break;
              }
            });

            this.table.body = res.data.data.giftPacksSelfList;
            this.table.args.totalCount = res.data.data.count;

            console.log(this.table.body)
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      changePresentPage(targetPage) {
        this.table.args.start = (targetPage - 1) * this.table.args.length;
        this.listPresent();
      },
      createPresent() {
        this.$refs.presentNature.modal.presentModal.show = true;
      },
      multDeletePresent() {
        if (this.$refs.presentTable.getSelection().length) {
          let giftPacksIdList = [];
          this.$refs.presentTable.getSelection().forEach((m) => {
            giftPacksIdList.push(m.giftPacksId)

            this.$Modal.confirm({
              title: '提示',
              content: '<p>是否进行批量删除？</p>',
              onOk: () => {
                this.$axios.post(`${this.$api.deleteCouponGiftPack}`, $.param({
                  giftPacksIdList: JSON.stringify(giftPacksIdList),
                })).then((res) => {
                  if (res.data.success) {
                    this.$Message.info('成功');
                    this.listPresent();
                  } else {
                    this.$Message.info(res.data.retMsg);
                  }
                }).catch((err) => {
                  console.log(err)
                })
              }
            });
          });


        } else {
          this.$Message.info('请选择礼包');
        }


        console.log(this.$refs.presentTable.getSelection())
      }
    }
  }
</script>
