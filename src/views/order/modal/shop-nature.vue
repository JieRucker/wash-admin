<template>
  <Modal :title="modal.shopModal.modalTitle" v-model="modal.shopModal.show" width="1000"
         class="user-list-shop-modal" @on-ok="saveShopNature">
    <div class="main-panel">
      <div class="header-panel">
        <Form :model="searchItem" inline>
          <address-picker ref="addressPicker"></address-picker>
          <FormItem label="门店名称" :label-width="70">
            <Input v-model="searchItem.shopName" placeholder="请输入" style="width: 150px"></Input>
          </FormItem>
          <FormItem class="search-item">
            <Button type="primary" @click="handleSearch">搜索</Button>
          </FormItem>
        </Form>
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
    </div>
  </Modal>
</template>

<script>
  import addressPicker from '@/components/addressPicker/addressPicker.vue';

  export default {
    name: "shop-nature",
    components: {
      addressPicker
    },
    data() {
      return {
        modal: {
          shopModal: {
            show: false,
            modalTitle: '选择门店'
          },
        },
        searchItem: {
          shopName: ''
        },
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
                      this.table.body.forEach((m) => {
                        m.selected = false;
                      });

                      this.table.body[`${params.index}`].selected = true;
                    }
                  }
                })
              }
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
            length: 5,
            currentPage: 1,
            totalCount: 0
          }
        }
      }
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
            res.data.data.shopList.forEach((m) => {
              m.selected = false;
            });
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
      assign(params, type) {
        this.$refs.shopNature.modal.shopModal.shopName = type === 'clear' ? '' : params.shopName;
        this.$refs.shopNature.modal.shopModal.shopAddress = type === 'clear' ? '' : params.shopAddress;
      },
      changeShopListPage(targetPage) {
        this.table.args.start = (targetPage - 1) * this.table.args.length;
        this.listShop();
      },
      saveShopNature() {
        this.$emit('save-shop-nature',this.table.body);
      }
    }
  }
</script>

