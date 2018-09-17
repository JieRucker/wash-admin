<template>
  <Modal title="关联的门店" v-model="modal.shopLinkModal.show" width="800">

    <Table ref="shopTable" :columns="table.header" :data="table.body"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="table.args.totalCount" :current="table.args.currentPage" :page-size="table.args.length"
              show-total @on-change="changeShopListPage"></Page>
      </div>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "shop-link-nature",
    data() {
      return {
        modal: {
          shopLinkModal: {
            show: false,
            shopPriceTemplateId: ''
          }
        },
        table: {
          header: [
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
            length: 8,
            currentPage: 1,
            totalCount: 0
          }
        }
      }
    },
    methods: {
      listShop() {
        this.table.body = [];
        this.$axios.post(`${this.$api.listAssociatedShop}`, $.param({
          shopPriceTemplateId: this.modal.shopLinkModal.shopPriceTemplateId
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
      changeShopListPage(targetPage) {
        this.table.args.start = (targetPage - 1) * this.table.args.length;
        this.listShop();
      },
    }
  }
</script>

