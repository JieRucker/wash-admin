<style lang="scss">
  .shop-list-panel {
    .button-panel {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      .delete-shop-button {
        margin-left: 5px;
      }
    }
  }
</style>

<template>
  <div class="shop-list-panel">
    <div class="header-panel">
      <Form :model="searchItem" inline>
        <address-picker ref="addressPicker" :is-render-province="searchItem.isRenderProvince"></address-picker>
        <FormItem label="门店名称" :label-width="70">
          <Input v-model="searchItem.shopName" placeholder="请输入" style="width: 150px"></Input>
        </FormItem>
        <FormItem class="search-item">
          <Button type="primary" @click="handleSearch">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div class="button-panel">
      <div>
        <Button type="primary" @click="createShop">添加门店</Button>
        <Button type="error" class="delete-shop-button" @click="multDeleteShop">批量删除</Button>
      </div>
      <div>
        <Button type="primary" @click="importShop">导入门店</Button>
      </div>
    </div>
    <div class="table-panel">
      <Table ref="shopTable" :columns="table.header" :data="table.body"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="table.args.totalCount" :current="table.args.currentPage" :page-size="table.args.length"
                show-total @on-change="changeShopListPage"></Page>
        </div>
      </div>
    </div>

    <shop-nature ref="shopNature"></shop-nature>
  </div>
</template>

<script>
  import addressPicker from '@/components/addressPicker/addressPicker.vue';
  import shopNature from './modal/shop-nature.vue';

  export default {
    name: "shop-list",
    components: {
      addressPicker,
      shopNature
    },
    data() {
      return {
        searchItem: {
          isRenderProvince: true,
          shopName: ''
        },
        table: {
          header: [
            {
              type: 'selection',
              width: 60,
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
              title: '省',
              key: 'provinceName',
              align: 'center'
            },
            {
              title: '市',
              key: 'cityName',
              align: 'center'
            },
            {
              title: '区',
              key: 'countyName',
              align: 'center'
            },
            {
              title: '公司名称',
              key: 'companyName',
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
                        this.$refs.shopNature.modal.shopModal.priceList = [];
                        this.$refs.shopNature.modal.shopModal.companyList = [];
                        this.$refs.shopNature.modal.shopModal.deviceList = [];
                        this.$refs.shopNature.$refs.addressPicker.address.selectProvince = params.row.provinceId;
                        setTimeout(() => {
                          this.$refs.shopNature.$refs.addressPicker.address.selectCity = params.row.cityId;
                        }, 200);
                        setTimeout(() => {
                          this.$refs.shopNature.$refs.addressPicker.address.selectArea = params.row.countyId;
                        }, 500);

                        this.assign('update', {
                          shopName: params.row.shopName,
                          shopAddress: params.row.shopAddress
                        });

                        params.row.dayServicePriceTemplateList.forEach((m) => {
                          this.$refs.shopNature.modal.shopModal.priceList.push({
                            label: m.shopPriceTemplateName,
                            value: m.shopPriceTemplateId
                          })
                        });

                        params.row.deviceList.forEach((m) => {
                          this.$refs.shopNature.modal.shopModal.deviceList.push({
                            label: m.deviceCode,
                            value: m.deviceId
                          })
                        });

                        this.$refs.shopNature.modal.shopModal.shopId = params.row.shopId;
                        this.$refs.shopNature.modal.shopModal.companyId = params.row.companyId;
                        this.$refs.shopNature.modal.shopModal.modalType = 'update';
                        this.$refs.shopNature.modal.shopModal.show = true;
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
                            this.$axios.post(`${this.$api.deleteShop}`, $.param({
                              shopIdList: JSON.stringify([`${params.row.shopId}`]),
                            })).then((res) => {
                              if (res.data.success) {
                                this.$Message.info('删除成功！');
                                this.listShop();
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
                      }
                    }
                  }, '删除')
                ]);
              }
            }
          ],
          body: [
            {
              shopName: '一号店',
              shopAddress: 'jrucker',
              provinceName: '浙江省',
              cityName: '杭州市',
              countyName: '滨江区',
              companyName: '公司'
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
      this.listShop();
    },
    methods: {
      listShop() {
        this.table.body = [];
        this.$axios.post(`${this.$api.listShop}`, $.param({
          provinceId: this.$refs.addressPicker.address.selectProvince,
          cityId: this.$refs.addressPicker.address.selectCity,
          countyId: this.$refs.addressPicker.address.selectArea,
          shopName: this.searchItem.shopName,
          start: this.table.args.start,
          length: this.table.args.length,
        })).then((res) => {
          if (res.data.success) {
            this.table.body = res.data.data.shopList;
            this.table.args.totalCount = res.data.data.count;
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      handleSearch() {
        this.listShop();
      },
      assign(type, params) {
        this.$refs.shopNature.modal.shopModal.shopName = type === 'clear' ? '' : params.shopName;
        this.$refs.shopNature.modal.shopModal.shopAddress = type === 'clear' ? '' : params.shopAddress;
      },
      createShop() {
        this.assign('clear');
        this.$refs.shopNature.modal.shopModal.priceList = [];
        this.$refs.shopNature.modal.shopModal.companyList = [];
        this.$refs.shopNature.modal.shopModal.deviceList = [];
        this.$refs.shopNature.modal.shopModal.companyId = -1;
        this.$refs.shopNature.modal.shopModal.modalType = 'custom';

        this.$refs.shopNature.$refs.addressPicker.listProvince();
        this.$refs.shopNature.modal.shopModal.show = true;
      },
      multDeleteShop() {
        if (this.$refs.shopTable.getSelection().length) {
          let shopIdList = [];
          this.$refs.shopTable.getSelection().forEach((m) => {
            shopIdList.push(m.shopId)
          });

          this.$Modal.confirm({
            title: '提示',
            content: '<p>确定删除？</p>',
            onOk: () => {
              this.$axios.post(`${this.$api.deleteShop}`, $.param({
                shopIdList: JSON.stringify(shopIdList),
              })).then((res) => {
                if (res.data.success) {
                  this.$Message.info('删除成功');
                  this.listShop();
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
          this.$Message.info('请选择门店！');
        }
      },
      changeShopListPage(targetPage) {
        this.table.args.start = (targetPage - 1) * this.table.args.length;
        this.listShop();
      },
      importShop() {

      }
    }
  }
</script>

