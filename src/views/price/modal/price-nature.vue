<style lang="scss">
  .price-list-template-modal {
    .main-panel {
      .tip-ico {
        color: #f00;
      }
    }
  }
</style>

<template>
  <Modal :title="modal.priceModal.modalTitle" v-model="modal.priceModal.show" width="950"
         class="price-list-template-modal" @on-ok="savePriceNature">
    <div class="main-panel">
      <Form :model="modal.priceModal" label-position="left" class="address-box">
        <Form inline>
          <address-picker ref="addressPicker"></address-picker>
        </Form>

        <Form inline>
          <FormItem label="模板名称：" :label-width="75">
            <Input v-model="modal.priceModal.templateName" placeholder="请输入" style="width: 200px"></Input>
            <i class="tip-ico">*</i>
          </FormItem>
          <FormItem label="类型：" :label-width="60">
            <Select v-model="modal.priceModal.selectModeType" placeholder="请选择" style="width:100px">
              <Option v-for="option in modal.priceModal.modeTypeList" :value="option.value"
                      :key="option.value">
                {{option.label}}
              </Option>
            </Select>
          </FormItem>
        </Form>

        <Form :model="modal.priceModal" class="price-info" inline
              v-for="(item,index) in modal.priceModal.priceInfoList" :key="index"
              v-if="modal.priceModal.selectModeType == 1">
          <FormItem label="起始时间：" :label-width="75">
            <TimePicker confirm :ref="'startTimePricePicker--'+index" placeholder="请选择时间"
                        style="width: 100px"></TimePicker>&nbsp;至&nbsp;
            <TimePicker confirm :ref="'endTimePricePicker--'+index" placeholder="请选择时间"
                        style="width: 100px"></TimePicker>
          </FormItem>
          <FormItem :label="child.label" :label-width="75" v-for="(child,childIndex) in item.detailList" :key="childIndex">
            ￥
            <InputNumber :min="1" v-model="child.price"></InputNumber>
          </FormItem>
          <i class="tip-ico">*</i>
        </Form>

        <Form :model="modal.priceModal" class="price-info" inline
              v-for="(item,index) in modal.priceModal.dryPriceInfoList" :key="index"
              v-if="modal.priceModal.selectModeType == 2">
          <FormItem label="起始时间：" :label-width="75">
            <TimePicker confirm :ref="'startTimePricePicker--'+index" placeholder="请选择时间"
                        style="width: 100px"></TimePicker>&nbsp;至&nbsp;
            <TimePicker confirm :ref="'endTimePricePicker--'+index" placeholder="请选择时间"
                        style="width: 100px"></TimePicker>
          </FormItem>

          <FormItem :label="child.label" :label-width="50" v-for="(child,childIndex) in item.detailList" :key="childIndex">
            ￥
            <InputNumber :min="1" v-model="child.price"></InputNumber>
          </FormItem>
          <i class="tip-ico">*</i>
        </Form>

        <FormItem label="选择日期：" :label-width="75" class="date-picker">
          <Select v-model="modal.priceModal.dateTime.selectDateTime" placeholder="请选择" style="width:150px">
            <Option v-for="option in modal.priceModal.dateTime.dateTimeList" :value="option.value"
                    :key="option.value">
              {{option.label}}
            </Option>
          </Select>
          <i class="tip-ico">*</i>
        </FormItem>
      </Form>
    </div>
  </Modal>
</template>

<script>
  import addressPicker from '@/components/addressPicker/addressPicker.vue';

  export default {
    name: "price-nature",
    components: {
      addressPicker
    },
    data() {
      return {
        modal: {
          priceModal: {
            show: false,
            modalTitle: '添加价格模板',
            modalType: 'custom',
            shopPriceTemplateId: '',
            templateName: '',
            selectModeType: 1,
            modeTypeList: [
              {
                label: '洗衣机',
                value: 1
              },
              {
                label: '烘干机',
                value: 2
              }
            ],
            priceInfoList: [
              {
                startTime: '',
                endTime: '',
                detailList: [
                  {
                    label: '柔和洗涤：',
                    deviceWorkModeType: 0,
                    price: 1
                  },
                  {
                    label: '普通洗涤：',
                    deviceWorkModeType: 1,
                    price: 2
                  },
                  {
                    label: '加强洗涤：',
                    deviceWorkModeType: 2,
                    price: 3
                  }
                ]
              },
              {
                startTime: '',
                endTime: '',
                detailList: [
                  {
                    label: '柔和洗涤：',
                    deviceWorkModeType: 0,
                    price: 1
                  },
                  {
                    label: '普通洗涤：',
                    deviceWorkModeType: 1,
                    price: 2
                  },
                  {
                    label: '加强洗涤：',
                    deviceWorkModeType: 2,
                    price: 3
                  }
                ]
              },
              {
                startTime: '',
                endTime: '',
                detailList: [
                  {
                    label: '柔和洗涤：',
                    deviceWorkModeType: 0,
                    price: 1
                  },
                  {
                    label: '普通洗涤：',
                    deviceWorkModeType: 1,
                    price: 2
                  },
                  {
                    label: '加强洗涤：',
                    deviceWorkModeType: 2,
                    price: 3
                  }
                ]
              }
            ],
            dryPriceInfoList: [
              {
                startTime: '',
                endTime: '',
                detailList: [
                  {
                    label: '52℃：',
                    deviceWorkModeType: 3,
                    price: 1
                  },
                  {
                    label: '60℃：',
                    deviceWorkModeType: 4,
                    price: 2
                  },
                  {
                    label: '68℃：',
                    deviceWorkModeType: 5,
                    price: 3
                  }
                ]
              },
              {
                startTime: '',
                endTime: '',
                detailList: [
                  {
                    label: '52℃：',
                    deviceWorkModeType: 3,
                    price: 1
                  },
                  {
                    label: '60℃：',
                    deviceWorkModeType: 4,
                    price: 2
                  },
                  {
                    label: '68℃：',
                    deviceWorkModeType: 5,
                    price: 3
                  }
                ]
              },
              {
                startTime: '',
                endTime: '',
                detailList: [
                  {
                    label: '52℃：',
                    deviceWorkModeType: 3,
                    price: 1
                  },
                  {
                    label: '60℃：',
                    deviceWorkModeType: 4,
                    price: 2
                  },
                  {
                    label: '68℃：',
                    deviceWorkModeType: 5,
                    price: 3
                  }
                ]
              }
            ],
            dateTime: {
              selectDateTime: '',
              dateTimeList: [
                {
                  label: '星期一',
                  value: 1
                },
                {
                  label: '星期二',
                  value: 2
                },
                {
                  label: '星期三',
                  value: 3
                },
                {
                  label: '星期四',
                  value: 4
                },
                {
                  label: '星期五',
                  value: 5
                },
                {
                  label: '星期六',
                  value: 6
                },
                {
                  label: '星期日',
                  value: 7
                }
              ],
            }
          }
        }
      }
    },
    methods: {
      savePriceNature() {
        let priceInfoList = [];
        let httpUrl = null;

        if (this.$Global.isBlank(this.$refs.addressPicker.address.selectProvince)) {
          return this.$Message.info('请选择省！');
        } else if (this.$Global.isBlank(this.$refs.addressPicker.address.selectCity)) {
          return this.$Message.info('请选择市！');
        } else if (this.$Global.isBlank(this.$refs.addressPicker.address.selectArea)) {
          return this.$Message.info('请选择区！');
        } else if (this.$Global.isBlank(this.modal.priceModal.templateName)) {
          return this.$Message.info('请填写模板名称！');
        } else if (this.$Global.isBlank(this.modal.priceModal.dateTime.selectDateTime)) {
          return this.$Message.info('请选择日期！');
        }

        switch (this.modal.priceModal.selectModeType) {
          case 1:
            this.modal.priceModal.priceInfoList.forEach((m, key) => {
              m.detailList.forEach((c) => {
                priceInfoList.push({
                  deviceWorkModeType: c.deviceWorkModeType,
                  startTime: this.$refs[`startTimePricePicker--${key}`][0].publicVModelValue,
                  endTime: this.$refs[`endTimePricePicker--${key}`][0].publicVModelValue,
                  price: c.price
                })
              })
            });
            break;
          case 2:
            this.modal.priceModal.dryPriceInfoList.forEach((m, key) => {
              m.detailList.forEach((c) => {
                priceInfoList.push({
                  deviceWorkModeType: c.deviceWorkModeType,
                  startTime: this.$refs[`startTimePricePicker--${key}`][0].publicVModelValue,
                  endTime: this.$refs[`endTimePricePicker--${key}`][0].publicVModelValue,
                  price: c.price
                })
              })
            });
            break;
        }

        console.log(priceInfoList)
        switch (this.modal.priceModal.modalType) {
          case 'custom':
            httpUrl = `${this.$api.addServicePrice}`;
            break;
          case 'update':
            httpUrl = `${this.$api.updateServicePrice}`;
            break;
        }
        this.$axios.post(httpUrl, $.param({
          shopPriceTemplateName: this.modal.priceModal.templateName,
          provinceId: this.$refs.addressPicker.address.selectProvince,
          cityId: this.$refs.addressPicker.address.selectCity,
          countyId: this.$refs.addressPicker.address.selectArea,
          dayOfWeek: this.modal.priceModal.dateTime.selectDateTime,
          dayDetailServicePriceInfoList: JSON.stringify(priceInfoList),
          templateType: this.modal.priceModal.selectModeType,
          shopPriceTemplateId: this.modal.priceModal.modalType === 'custom' ? '' : this.modal.priceModal.shopPriceTemplateId
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
    }
  }
</script>
