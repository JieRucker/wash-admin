<style lang="scss">
  .price-list-panel {
    .button-panel {
      margin-bottom: 10px;
    }
    .item-list-panel {
      margin-top: 10px;
      .card-item {
        float: left;
        margin-right: 10px;
        margin-bottom: 10px;
        .tpl-name {
          width: 45%;
        }
        .weekday {
          text-align: center;
          background-color: #ff965d;
          width: 20%;
          color: #fff;
          border-radius: 3px;
          font-size: 12px;
        }
        &:last-child {
          margin-right: 0;
        }
        .card-body {
          p {
            margin-bottom: 5px;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="price-list-panel">
    <div class="header-panel">
      <Form :model="searchItem" inline>
        <address-picker ref="addressPicker" :is-render-province="searchItem.isRenderProvince"></address-picker>
        <FormItem label="模板名称" :label-width="70">
          <Input v-model="searchItem.templateName" placeholder="请输入" style="width: 150px"></Input>
        </FormItem>
        <FormItem class="search-item">
          <Button type="primary" @click="handleSearch">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div class="button-panel">
      <div>
        <Button type="primary" @click="createPriceTemplate">添加价格模板</Button>
      </div>
    </div>

    <div class="tab-panel">
      <Tabs :animated="false" value="1" @on-click="switchPanelDate">
        <TabPane :label="item.label" :name="item.name" v-for="(item,index) in table.body" :key="index">
          <div class="item-list-panel clearfix">
            <Card style="width:400px" v-for="(card,cardIndex) in item.templateList" :key="cardIndex" class="card-item">
              <p slot="title" class="tpl-name" style="width: 80%">模板名称：{{card.templateName}}</p>
              <a href="javascript:;" slot="extra">
                <span v-if="card.templateType == 1">类型：洗衣机</span>
                <span v-if="card.templateType == 2">类型：烘干机</span>
                <Icon type="trash-a" @click.native="deleteTemplate(index,cardIndex)"></Icon>
              </a>
              <div class="card-body">
                <div class="address">
                  <p>
                    <span>省份：{{card.province}}</span>
                    <span style="margin-left: 20px">市：{{card.city}}</span>
                    <span style="margin-left: 20px">区：{{card.area}}</span>
                    <a href="javascript:;" style="margin-left: 20px"
                       @click="showShopLinkModal(index,cardIndex)">关联的门店</a>
                  </p>
                </div>
                <div class="table">
                  <Table ref="tableSelection" :columns="card.table.header" :data="card.table.body"></Table>
                </div>
              </div>
            </Card>
          </div>
        </TabPane>
      </Tabs>
    </div>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="table.args.totalCount" :current="table.args.currentPage" :page-size="table.args.length"
              show-total @on-change="changeServicePricePage"></Page>
      </div>
    </div>

    <shop-link-nature ref="shopLinkNature"></shop-link-nature>
    <price-nature ref="priceNature"></price-nature>
  </div>
</template>

<script>
  import addressPicker from '@/components/addressPicker/addressPicker.vue';
  import priceNature from './modal/price-nature.vue';
  import shopLinkNature from './modal/shop-link-nature.vue';

  export default {
    name: "price-list",
    components: {
      addressPicker,
      priceNature,
      shopLinkNature
    },
    data() {
      return {
        searchItem: {
          isRenderProvince: true,
          templateName: ''
        },
        table: {
          body: [
            {
              label: '星期一',
              name: '1',
              templateList: [
                {
                  templateName: '001',
                  province: '浙江省',
                  city: '杭州市',
                  area: '西湖区',
                  table: {
                    header: [
                      {
                        title: '时间段',
                        key: 'date',
                        align: 'center'
                      },
                      {
                        title: '柔和洗涤',
                        key: 'lowMode',
                        align: 'center'
                      },
                      {
                        title: '普通洗涤',
                        key: 'middleMode',
                        align: 'center'
                      },
                      {
                        title: '加强洗涤',
                        key: 'highMode',
                        align: 'center'
                      }
                    ],
                    body: [
                      {
                        date: '10:00:00-12:00:00',
                        lowMode: '￥3.00',
                        middleMode: '￥3.00',
                        highMode: '￥3.00'
                      },
                      {
                        date: '10:00:00-12:00:00',
                        lowMode: '￥3.00',
                        middleMode: '￥3.00',
                        highMode: '￥3.00'
                      }
                    ]
                  }
                }
              ],
            },
            {
              label: '星期二',
              name: '2',
              templateList: [],
            },
            {
              label: '星期三',
              name: '3',
              templateList: []
            },
            {
              label: '星期四',
              name: '4',
              templateList: []
            },
            {
              label: '星期五',
              name: '5',
              templateList: []
            },
            {
              label: '星期六',
              name: '6',
              templateList: []
            },
            {
              label: '星期日',
              name: '7',
              templateList: []
            }
          ],
          args: {
            start: 0,
            length: 10,
            currentPage: 1,
            totalCount: 0,
            currentTargetDay: 1
          }
        }
      }
    },
    mounted() {
      this.listServicePrice();
    },
    methods: {
      listServicePrice() {
        this.table.body[this.table.args.currentTargetDay - 1].templateList = [];
        this.$axios.post(`${this.$api.listServicePrice}`, $.param({
          provinceId: this.$refs.addressPicker.address.selectProvince,
          cityId: this.$refs.addressPicker.address.selectCity,
          countyId: this.$refs.addressPicker.address.selectArea,
          shopPriceTemplateName: this.searchItem.templateName,
          strDayOfWeek: this.table.args.currentTargetDay,//星期1-7 默认 1
          start: this.table.args.start,
          length: this.table.args.length,
        })).then((res) => {
          if (res.data.success) {
            res.data.data.dayServicePriceList.forEach((m) => {
              this.table.body[this.table.args.currentTargetDay - 1].templateList.push({
                templateName: m.shopPriceTemplateName,
                province: m.provinceName,
                city: m.cityName,
                area: m.countyName,
                priceTemplateType: m.priceTemplateType,
                shopPriceTemplateId: m.shopPriceTemplateId,
                templateType: m.templateType,
                table: {
                  header: (() => {
                    if (m.priceTemplateType === 1) {
                      let result;
                      result = [
                        {
                          title: '时间段',
                          key: 'date',
                          align: 'center'
                        },
                        {
                          title: '柔和洗涤',
                          key: 'lowMode',
                          align: 'center'
                        },
                        {
                          title: '普通洗涤',
                          key: 'middleMode',
                          align: 'center'
                        },
                        {
                          title: '加强洗涤',
                          key: 'highMode',
                          align: 'center'
                        }
                      ];
                      return result;
                    } else if (m.priceTemplateType === 2) {
                      let result;
                      result = [
                        {
                          title: '时间段',
                          key: 'date',
                          align: 'center'
                        },
                        {
                          title: '烘干52度',
                          key: 'dryLowMode',
                          align: 'center'
                        },
                        {
                          title: '烘干60度',
                          key: 'dryMiddleMode',
                          align: 'center'
                        },
                        {
                          title: '烘干68度',
                          key: 'dryHighMode',
                          align: 'center'
                        }
                      ];
                      return result;
                    }
                  })(),
                  body: (() => {
                    let result = [];
                    m.dayDetailServicePriceList.forEach((c) => {
                      result.push({
                        date: `${c.serviceStartTime}-${c.serviceEndTime}`,
                        lowMode: (() => {
                          let result = null;
                          c.detailServicePriceList.forEach((t) => {
                            if (t.deviceWorkModeType === 0) {
                              result = t.price;
                            }
                          });
                          return result;
                        })(),
                        middleMode: (() => {
                          let result = null;
                          c.detailServicePriceList.forEach((t) => {
                            if (t.deviceWorkModeType === 1) {
                              result = t.price;
                            }
                          });
                          return result;
                        })(),
                        highMode: (() => {
                          let result = null;
                          c.detailServicePriceList.forEach((t) => {
                            if (t.deviceWorkModeType === 2) {
                              result = t.price;
                            }
                          });
                          return result;
                        })(),
                        dryLowMode: (() => {
                          let result = null;
                          c.detailServicePriceList.forEach((t) => {
                            if (t.deviceWorkModeType === 3) {
                              result = t.price;
                            }
                          });
                          return result;
                        })(),
                        dryMiddleMode: (() => {
                          let result = null;
                          c.detailServicePriceList.forEach((t) => {
                            if (t.deviceWorkModeType === 4) {
                              result = t.price;
                            }
                          });
                          return result;
                        })(),
                        dryHighMode: (() => {
                          let result = null;
                          c.detailServicePriceList.forEach((t) => {
                            if (t.deviceWorkModeType === 5) {
                              result = t.price;
                            }
                          });
                          return result;
                        })(),
                      })
                    });
                    console.log(result)

                    return result;
                  })()
                }
              })
            });

            this.table.args.totalCount = res.data.data.count;
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      switchPanelDate(value) {
        this.table.args.currentTargetDay = value;
        this.listServicePrice();
      },
      showShopLinkModal(index, cardIndex) {
        this.$refs.shopLinkNature.modal.shopLinkModal.shopPriceTemplateId = this.table.body[index].templateList[cardIndex].shopPriceTemplateId;
        console.log(this.table.body[index].templateList[cardIndex].shopPriceTemplateId)
        this.$refs.shopLinkNature.listShop();
        this.$refs.shopLinkNature.modal.shopLinkModal.show = true;
      },
      handleSearch() {
        this.listServicePrice();
      },
      changeServicePricePage(targetPage) {
        this.table.args.start = (targetPage - 1) * this.table.args.length;
        this.listServicePrice();
      },
      createPriceTemplate() {
        this.$refs.priceNature.$refs.addressPicker.listProvince();
        this.$refs.priceNature.modal.priceModal.show = true;
      },
      deleteTemplate(index, cardIndex) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>是否删除该模板？</p>',
          onOk: () => {
            this.$axios.post(`${this.$api.deleteServicePrice}`, $.param({
              shopPriceTemplateIdList: JSON.stringify([`${this.table.body[index].templateList[cardIndex].shopPriceTemplateId}`]),
            })).then((res) => {
              if (res.data.success) {
                this.$Message.info('成功！');
                this.$parent.listServicePrice();
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
  }
</script>

