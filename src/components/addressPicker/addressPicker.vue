<style lang="scss">
  @include b(address-picker) {
    display: inline-block;
  }
</style>

<template>
  <div class="address-picker">
    <FormItem label="省份" :label-width="40">
      <Select v-model="address.selectProvince" placeholder="请选择" @on-change="selectProvinceChange"
              style="width:150px">
        <Option v-for="item in address.province" :value="item.value" :key="item.value">
          {{item.label}}
        </Option>
      </Select>
    </FormItem>
    <FormItem label="市" :label-width="40">
      <Select v-model="address.selectCity" placeholder="请选择" @on-change="selectCityChange"
              style="width:150px">
        <Option v-for="item in address.city" :value="item.value" :key="item.value">{{item.label}}
        </Option>
      </Select>
    </FormItem>
    <FormItem label="区" :label-width="40">
      <Select v-model="address.selectArea" placeholder="请选择" style="width:150px">
        <Option v-for="item in address.area" :value="item.value" :key="item.value">{{item.label}}
        </Option>
      </Select>
    </FormItem>
  </div>
</template>

<script>
  export default {
    name: "addressPicker",
    props: {
      isRenderProvince: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        address: {
          selectProvince: '',
          selectCity: '',
          selectArea: '',
          province: [],
          city: [],
          area: []
        }
      }
    },
    mounted() {
      if (this.isRenderProvince) {
        this.listProvince();
      }
    },
    methods: {
      listProvince() {
        this.address.province = [];
        this.$axios.post(`${this.$api.listProvince}`).then((res) => {
          if (res.data.success) {
            res.data.data.forEach((m) => {
              this.address.province.push({
                label: m.provinceName,
                value: m.provinceId
              });
            });
            this.address.province.unshift({
              label: '全部',
              value: ''
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      listCity(provinceId) {
        this.$axios.post(`${this.$api.listCity}`, $.param({
          provinceId: provinceId,
        })).then((res) => {
          if (res.data.success) {
            res.data.data.forEach((m) => {
              this.address.city.push({
                label: m.cityName,
                value: m.cityId
              });
            });
            this.address.city.unshift({
              label: '全部',
              value: ''
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      listCounty(cityId) {
        this.$axios.post(`${this.$api.listCounty}`, $.param({
          cityId: cityId,
        })).then((res) => {
          if (res.data.success) {
            res.data.data.forEach((m) => {
              this.address.area.push({
                label: m.countyName,
                value: m.countyId
              })
            });
            this.address.area.unshift({
              label: '全部',
              value: ''
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      selectProvinceChange(value) {
        this.address.city = [];
        this.address.area = [];
        this.listCity(value)
      },
      selectCityChange(value) {
        this.address.area = [];
        this.listCounty(value)
      }
    }
  }
</script>

