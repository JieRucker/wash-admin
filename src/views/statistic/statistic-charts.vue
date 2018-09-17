<style lang="scss">
  .statistic-charts {
    .info-card {
      margin-top: 10px;
      .ivu-card-head {
        .card-title {
          height: initial;
          line-height: initial;
        }
      }
      .ivu-card-bordered {
        border: 1px solid #eee;;
      }
    }
    .chart-card {
      margin-top: 10px;
    }
  }
</style>

<template>
  <div class="statistic-charts">
    <div class="shop-select">
      <!--<Form :model="searchItem" inline>
        <address-picker ref="addressPicker" :is-render-province="searchItem.isRenderProvince"></address-picker>
        <FormItem class="search-item">
          <Button type="primary" @click="handleSearch">搜索</Button>
        </FormItem>
      </Form>-->
      <Form :model="searchItem" inline>
        <FormItem label="选择门店" :label-width="70">
          <Select v-model="searchItem.selectShop" placeholder="选择门店" style="width:150px" @click.native="showShopModal">
            <Option v-for="item in searchItem.shopList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="选择设备" :label-width="70">
          <Select v-model="searchItem.selectSeviceType" placeholder="选择设备" style="width:150px"
                  @on-change="changeDeviceType">
            <Option v-for="item in searchItem.deviceTypeList" :value="item.value" :key="item.value">{{ item.label }}
            </Option>
          </Select>
        </FormItem>
      </Form>
    </div>
    <div class="info-card">
      <Row :gutter="10">
        <Col :md="24" :lg="24">
          <Card>
            <p slot="title" class="card-title">
              数据总预览&nbsp;
              <DatePicker type="month" :value="searchItem.getCurrentMonth" placeholder="选择日期" style="width: 200px"
                          @on-change="changeDate"></DatePicker>
            </p>
            <div class="data-info-row">
              <Row :gutter="5">
                <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                  <infor-card
                    id-name="actual-total-amount"
                    :end-val="count.actualTotalAmount"
                    iconType="android-person-add"
                    color="#2d8cf0"
                    :iconSize="22"
                    :intro-text="'实际总收入/' + count.currentMonth + '月'">
                  </infor-card>
                </Col>

                <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                  <infor-card
                    id-name="order-count"
                    :end-val="count.orderCount"
                    iconType="ios-eye"
                    color="#ffd572"
                    :iconSize="28"
                    :intro-text="'总使用次数/' + count.currentMonth + '月'">
                  </infor-card>
                </Col>
                <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                  <infor-card
                    id-name="device-count"
                    :end-val="count.deviceCount"
                    iconType="upload"
                    color="#64d572"
                    :intro-text="'设备总数量/' + count.currentMonth + '月'">
                  </infor-card>
                </Col>
                <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                  <infor-card
                    id-name="device-income-perday"
                    :end-val="count.deviceIncomePerDay"
                    iconType="shuffle"
                    color="#f25e43"
                    :intro-text="'台均日收入/' + count.currentMonth + '月'">
                  </infor-card>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </div>

    <div class="chart-card">
      <Row :gutter="10">
        <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
          <Card>
            <div slot="title" class="card-title" style="display:flex;justify-content:space-between;">
              <p>近七日收入趋势图</p>
              <p style="text-align: right">近七日总收入：{{charts.line.totalAmount}}</p>
            </div>
            <div class="data-line-row" style="height: 300px;">
              <service-requests ref="serviceRequests"></service-requests>
            </div>
          </Card>
        </Col>
        <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
          <Card>
            <div slot="title" class="card-title" style="text-align: center">
              <p>年度总收入情况</p>
            </div>
            <div class="data-line-row" style="height: 300px;">
              <visite-volume ref="visiteVolume"></visite-volume>
            </div>
          </Card>
        </Col>
      </Row>
    </div>

    <shop-nature ref="shopNature" @save-shop-nature="saveShopNature"></shop-nature>
  </div>
</template>

<script>
  import shopNature from '@/views/order/modal/shop-nature.vue';
  import addressPicker from '@/components/addressPicker/addressPicker.vue';
  import inforCard from './components/inforCard.vue';
  import serviceRequests from './components/serviceRequests.vue';
  import visiteVolume from './components/visiteVolume.vue';

  export default {
    name: "statistic-charts",
    components: {
      shopNature,
      addressPicker,
      inforCard,
      serviceRequests,
      visiteVolume
    },
    data() {
      return {
        searchItem: {
          isRenderProvince: true,
          selectSeviceType: 1,
          selectShop: '',
          shopList: [],
          deviceTypeList: [
            {
              label: '洗衣机',
              value: 1
            },
            {
              label: '烘干机',
              value: 2
            }
          ],
          getCurrentMonth: (() => {
            let getFullYear = new Date().getFullYear();
            let getMonth = new Date().getMonth() > 9 ? new Date().getMonth() + 1 : `0${new Date().getMonth() + 1}`;
            return `${getFullYear}-${getMonth}`;
          })()
        },
        count: {
          currentMonth: new Date().getMonth() + 1,
          actualTotalAmount: 0,
          orderCount: 0,
          deviceCount: 0,
          deviceIncomePerDay: 0
        },
        charts: {
          line: {
            totalAmount: 0
          },
          pillar: {
            shouldTotalAmount: 0,
            actualTotalAmount: 0,
            vipCardTotal: 0
          }
        }
      }
    },
    mounted() {
      this.listShop();
    },
    methods: {
      listShop() {
        this.searchItem.shopList = [];
        this.$axios.post(`${this.$api.listShop}`, $.param({
          provinceId: '',
          cityId: '',
          countyId: '',
          shopName: '',
          start: 0,
          length: 100,
        })).then((res) => {
          if (res.data.success) {
            res.data.data.shopList.forEach((m) => {
              this.searchItem.shopList.push({
                label: m.shopName,
                value: m.shopId
              })
            });

            this.searchItem.selectShop = this.searchItem.shopList.length ? this.searchItem.shopList[0].value : '';

            this.listShopDayIncome();
            this.listShopMonthIncome();
            this.listShopYearIncome();
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      showShopModal() {
        this.$refs.shopNature.$refs.addressPicker.listProvince();
        this.$refs.shopNature.listShop();
        this.$refs.shopNature.modal.shopModal.show = true;
      },
      listShopDayIncome() {
        this.$refs.serviceRequests.options.xAxis[0].data = [];
        this.$refs.serviceRequests.options.series[0].data = [];
        this.$axios.post(`${this.$api.listShopDayIncome}`, $.param({
          deviceType: this.searchItem.selectSeviceType, //设备类型 1洗衣机 2烘干机
          shopId: this.searchItem.selectShop
        })).then((res) => {
          if (res.data.success) {
            this.charts.line.totalAmount = res.data.data.totalAmount;
            res.data.data.shopDayIncomeSelfList.forEach((m) => {
              this.$refs.serviceRequests.options.xAxis[0].data.push(m.shopDayDate.substring(5, 10));
              this.$refs.serviceRequests.options.series[0].data.push(m.shopDayIncome);
            });

            this.$refs.serviceRequests.initServiceRequests();
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      listShopMonthIncome() {
        this.$axios.post(`${this.$api.selectShopMonthIncome}`, $.param({
          busiDate: this.searchItem.getCurrentMonth,
          deviceType: this.searchItem.selectSeviceType, //设备类型 1洗衣机 2烘干机
          shopId: this.searchItem.selectShop
        })).then((res) => {
          if (res.data.success) {
            this.count.actualTotalAmount = res.data.data.actualTotalAmount ? res.data.data.actualTotalAmount : 0;
            this.count.orderCount = res.data.data.orderCount ? res.data.data.orderCount : 0;
            this.count.deviceCount = res.data.data.deviceCount ? res.data.data.deviceCount : 0;
            this.count.deviceIncomePerDay = res.data.data.deviceIncomePerDay ? res.data.data.deviceIncomePerDay : 0;
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      listShopYearIncome() {
        this.$refs.visiteVolume.options.xAxis[0].data = [];
        this.$refs.visiteVolume.options.series[0].data = [];
        this.$refs.visiteVolume.options.series[1].data = [];
        this.$refs.visiteVolume.options.series[2].data = [];
        this.$axios.post(`${this.$api.selectShopYearIncome}`, $.param({
          deviceType: this.searchItem.selectSeviceType, //设备类型 1洗衣机 2烘干机
          shopId: this.searchItem.selectShop
        })).then((res) => {
          if (res.data.success) {
            res.data.data.shopMonthIncomeList.forEach((m) => {
              this.$refs.visiteVolume.options.xAxis[0].data.push(`${m.shopMonth.substring(5, 6) > 0 ? m.shopMonth.substring(5, 7) : m.shopMonth.substring(6, 7)}月`);
              this.$refs.visiteVolume.options.series[0].data.push(m.shouldTotalAmount);
              this.$refs.visiteVolume.options.series[1].data.push(m.couponTotal);
              this.$refs.visiteVolume.options.series[2].data.push(m.vipCardTotal);
            });

            this.$refs.visiteVolume.options.legend.data[0] = `应收总收入${res.data.data.shopYearIncomeSelf.shouldTotalAmount}`;
            this.$refs.visiteVolume.options.legend.data[1] = `优惠券金额${res.data.data.shopYearIncomeSelf.actualTotalAmount}`;
            this.$refs.visiteVolume.options.legend.data[2] = `会员优惠总额${res.data.data.shopYearIncomeSelf.vipCardTotal}`;

            this.$refs.visiteVolume.options.series[0].name = `应收总收入${res.data.data.shopYearIncomeSelf.shouldTotalAmount}`;
            this.$refs.visiteVolume.options.series[1].name = `优惠券金额${res.data.data.shopYearIncomeSelf.actualTotalAmount}`;
            this.$refs.visiteVolume.options.series[2].name = `会员优惠总额${res.data.data.shopYearIncomeSelf.vipCardTotal}`;

            this.$refs.visiteVolume.initVisiteVolume();
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      changeDeviceType() {
        this.listShopDayIncome();
        this.listShopYearIncome();
      },
      changeDate(date) {
        this.searchItem.getCurrentMonth = date.substring(0, 7);
        console.log(date)
        this.count.currentMonth = date.substring(5, 6) > 0 ? date.substring(5, 7) : date.substring(6, 7);
        this.listShopMonthIncome();
      },
      handleSearch() {
        this.listShop();
      },
      saveShopNature(body) {
        this.searchItem.shopList = [];
        body.forEach((m) => {
          if (m.selected) {
            this.searchItem.shopList.push({
              label: m.shopName,
              value: m.shopId
            })
          }
        });

        this.searchItem.selectShop = this.searchItem.shopList.length ? this.searchItem.shopList[0].value : '';

        this.listShopDayIncome();
        this.listShopYearIncome();
      }
    }
  }
</script>
