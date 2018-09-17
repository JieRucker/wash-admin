<style lang="scss">
  .shop-list-modal {
    .device-list {
      ul {
        li {
          float: left;
          margin-right: 10px;
          margin-bottom: 5px;
          border-radius: 10px;
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          &:last-child {
            margin-right: 0;
          }
          .close {
            position: absolute;
            top: 5px;
            right: 5px;
            color: #999999;
            cursor: pointer;
          }
        }
      }
    }
    .tip-ico {
      color: #f00;
      font-style: normal;
    }
  }
</style>

<template>
  <div>
    <Modal :title="modal.shopModal.modalTitle" v-model="modal.shopModal.show" width="750"
           class="shop-list-modal" @on-ok="saveShopNature">
      <div class="main-panel">
        <Form :model="modal.shopModal" label-position="left" class="shop-box">
          <Form inline>
            <address-picker ref="addressPicker" :is-render-province="modal.shopModal.isRenderProvince"></address-picker>
          </Form>

          <FormItem label="门店名称：" :label-width="100">
            <Input v-model="modal.shopModal.shopName" placeholder="请输入" style="width: 200px"></Input>
            <i class="tip-ico">*</i>
          </FormItem>
          <FormItem label="门店地址：" :label-width="100">
            <Input v-model="modal.shopModal.shopAddress" placeholder="请输入" style="width: 200px"></Input>
            <i class="tip-ico">*</i>
          </FormItem>
          <FormItem label="选择价格模板：" :label-width="100">
            <Button type="primary" @click="showPriceModal">选择价格模板</Button>
            <i class="tip-ico">*</i>
          </FormItem>
          <FormItem label="所属公司绑定：" :label-width="100">
            <Button type="primary" @click="showCompanyModal">选择所属公司</Button>
          </FormItem>
          <FormItem label="设备绑定：" :label-width="100">
            <Button type="primary" @click="showDeviceModal">设备关联</Button>
          </FormItem>

          <FormItem label="已选择模板：" :label-width="100">
            <div class="device-list">
              <ul class="clearfix">
                <li v-for="(item,index) in modal.shopModal.priceList" v-if="modal.shopModal.priceList.length">
                  <Tag type="dot" closable @on-close="deletePrice(index)">{{item.label}}</Tag>
                </li>
                <li v-if="!modal.shopModal.priceList.length">无</li>
              </ul>
            </div>
          </FormItem>

          <FormItem label="绑定公司：" :label-width="100">
            <div class="device-list">
              <ul class="clearfix">
                <li v-for="(item,index) in modal.shopModal.companyList" v-if="modal.shopModal.companyList.length">
                  <Tag type="dot" closable @on-close="deleteCompany(index)">{{item.label}}</Tag>
                </li>
                <li v-if="!modal.shopModal.companyList.length">
                  <span v-if="modal.shopModal.companyId == -1">未绑定</span>
                  <span v-if="modal.shopModal.companyId != -1">已绑定</span>
                </li>
              </ul>
            </div>
          </FormItem>

          <FormItem label="已关联设备：" :label-width="100">
            <div class="device-list">
              <ul class="clearfix">
                <li v-for="(item,index) in modal.shopModal.deviceList" v-if="modal.shopModal.deviceList.length">
                  <Tag type="dot" closable @on-close="deleteDevice(index)">{{item.label}}</Tag>
                </li>
                <li v-if="!modal.shopModal.deviceList.length">无</li>
              </ul>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <price-nature ref="priceNature"></price-nature>
    <company-nature ref="companyNature"></company-nature>
    <device-nature ref="deviceNature"></device-nature>
  </div>
</template>

<script>
  import addressPicker from '@/components/addressPicker/addressPicker.vue';
  import priceNature from './price-nature.vue';
  import companyNature from './company-nature.vue';
  import deviceNature from './device-nature.vue';

  export default {
    name: "shop-nature",
    components: {
      addressPicker,
      priceNature,
      companyNature,
      deviceNature
    },
    data() {
      return {
        modal: {
          shopModal: {
            show: false,
            isRenderProvince: true,
            modalTitle: '添加门店',
            modalType: 'custom',
            companyId: -1,
            shopId: '',
            shopName: '',
            shopAddress: '',
            priceList: [],
            companyList: [],
            deviceList: []
          },
        }
      }
    },
    methods: {
      showPriceModal() {
        this.$refs.priceNature.$refs.addressPicker.listProvince();
        this.$refs.priceNature.listServicePrice();
        this.$refs.priceNature.modal.priceModal.show = true;
      },
      showCompanyModal() {
        this.$refs.companyNature.listCompany();
        this.$refs.companyNature.modal.companyModal.show = true;
      },
      showDeviceModal() {
        this.$refs.deviceNature.listDevice();
        this.$refs.deviceNature.modal.deviceModal.show = true;
      },
      deletePrice(index) {
        this.modal.shopModal.priceList.splice(index, 1);
      },
      deleteCompany(index) {
        this.modal.shopModal.companyList.splice(index, 1);
      },
      deleteDevice(index) {
        this.modal.shopModal.deviceList.splice(index, 1);
      },
      saveShopNature() {
        let httpUrl = null;
        let shopPriceTemplateIdList = [];
        let deviceIdList = [];

        if (this.$Global.isBlank(this.$refs.addressPicker.address.selectProvince)) {
          return this.$Message.info('请选择省！');
        } else if (this.$Global.isBlank(this.$refs.addressPicker.address.selectCity)) {
          return this.$Message.info('请选择市！');
        } else if (this.$Global.isBlank(this.$refs.addressPicker.address.selectArea)) {
          return this.$Message.info('请选择区！');
        } else if (this.$Global.isBlank(this.modal.shopModal.shopName)) {
          return this.$Message.info('请填写门店名称！');
        } else if (this.$Global.isBlank(this.modal.shopModal.shopAddress)) {
          return this.$Message.info('请选择门店地址！');
        }
        /* else if (this.$Global.isBlank(this.modal.shopModal.shopAddress)) {
           return this.$Message.info('请选择价格模板！');
         }*/


        this.modal.shopModal.priceList.forEach((m) => {
          shopPriceTemplateIdList.push(m.value)
        });

        this.modal.shopModal.deviceList.forEach((m) => {
          deviceIdList.push(m.value)
        });

        switch (this.modal.shopModal.modalType) {
          case 'custom':
            httpUrl = `${this.$api.addShop}`;
            break;
          case 'update':
            httpUrl = `${this.$api.updateShop}`;
            break;
        }
        this.$axios.post(httpUrl, $.param({
          provinceId: this.$refs.addressPicker.address.selectProvince,
          cityId: this.$refs.addressPicker.address.selectCity,
          countyId: this.$refs.addressPicker.address.selectArea,
          shopName: this.modal.shopModal.shopName,
          shopAddress: this.modal.shopModal.shopAddress,
          companyId: this.modal.shopModal.companyList.length ? this.modal.shopModal.companyList[0].value : '',//公司编号
          deviceIdList: JSON.stringify(deviceIdList),//设备编号（数组）
          shopPriceTemplateIdList: JSON.stringify(shopPriceTemplateIdList),//价格模板编号（数组）
          shopOpenTime: '',//开店时间 例：00:00:00
          shopCloseTime: '',//关店时间 例：23:59:59
          shopId: this.modal.shopModal.modalType === 'custom' ? '' : this.modal.shopModal.shopId
        })).then((res) => {
          if (res.data.success) {
            this.$Message.info('成功！');
            this.$parent.listShop();
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
    }
  }
</script>
