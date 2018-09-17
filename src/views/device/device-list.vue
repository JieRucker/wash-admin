<style lang="scss">
  .device-list-panel {
    .item-list-panel {
      margin-top: 10px;
      .card-item {
        float: left;
        margin-right: 10px;
        margin-bottom: 10px;
        &:last-child {
          margin-right: 0;
        }
        .card-body {
          p {
            margin-bottom: 5px;
          }
        }
        .card-footer {
          display: flex;
          justify-content: space-between;
          .record-link {
            margin-top: 5px;
          }
        }
      }
    }
  }

</style>

<template>
  <div class="device-list-panel">
    <div class="header-panel">
      <Form :model="searchItem" inline>
        <address-picker ref="addressPicker" :is-render-province="searchItem.isRenderProvince"></address-picker>
        <FormItem label="设备类型" :label-width="70">
          <Select v-model="searchItem.selectDeviceType" placeholder="请选择" style="width:150px">
            <Option v-for="item in searchItem.deviceType" :value="item.value" :key="item.value">{{item.label}}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="设备关联状态" :label-width="90">
          <Select v-model="searchItem.selectDeviceLinkState" placeholder="请选择" style="width:150px">
            <Option v-for="item in searchItem.deviceLinkState" :value="item.value" :key="item.value">{{item.label}}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="门店名称" :label-width="70">
          <Input v-model="searchItem.shopName" placeholder="请输入" style="width: 150px"></Input>
        </FormItem>
        <FormItem label="门店地址" :label-width="70">
          <Input v-model="searchItem.shopAddress" placeholder="请输入" style="width: 150px"></Input>
        </FormItem>
        <FormItem label="公司名称" :label-width="70">
          <Input v-model="searchItem.companyName" placeholder="请输入" style="width: 150px"></Input>
        </FormItem>
        <FormItem class="search-item">
          <Button type="primary" @click="handleSearch">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div class="create-device-panel">
      <Button type="primary" @click.native="createDevice">添加设备</Button>
    </div>
    <div class="item-list-panel clearfix">
      <Card style="width:350px" v-for="(item,index) in table.body" :key="index" class="card-item">
        <p slot="title">{{item.deviceTypeName}}：{{item.deviceCode}}</p>
        <a href="javascript:;" slot="extra">
          <Icon type="trash-a" @click.native="deleteDevice(index)"></Icon>
        </a>
        <div class="card-body">
          <p>
            <span>省份：{{item.provinceName}}</span>
            <span style="margin-left: 20px">市：{{item.cityName}}</span>
            <span style="margin-left: 20px">区：{{item.countyName}}</span>
          </p>
          <p>公司名称：{{item.companyName}}</p>
          <p>门店名称：{{item.shopName}}</p>
          <p>门店地址：{{item.shopAddress}}</p>
          <p v-if="item.shopId != -1">设备状态：{{item.deviceStatusAlias}}</p>
          <p v-if="item.shopId == -1">设备状态：未绑定</p>
          <p>密码：{{item.password}}</p>
        </div>
        <div class="card-footer">
          <a href="javascript:;" class="record-link" @click="deviceOrderModal(index)">使用记录查看</a>
          <div class="todo-button">
            <Button type="error" @click="stopDevice(index)" v-if="item.deviceStatus != 0">停止</Button>
            <Button type="error" @click="startDevice(index)" v-if="item.deviceStatus == 0">启动</Button>
            <Button type="primary" @click="startDeviceClear(index)">启动桶自洁</Button>
          </div>
        </div>
      </Card>
    </div>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="table.args.totalCount" :current="table.args.currentPage" :page-size="table.args.length"
              show-total @on-change="changeDevicePage"></Page>
      </div>
    </div>

    <create-device-nature ref="createDeviceNature"></create-device-nature>
    <device-order-nature ref="deviceOrderNature"></device-order-nature>
  </div>
</template>

<script>
  import addressPicker from '@/components/addressPicker/addressPicker.vue';
  import createDeviceNature from "./modal/create-device-nature";
  import deviceOrderNature from "./modal/device-order-nature";

  export default {
    name: "device-list",
    components: {
      addressPicker,
      createDeviceNature,
      deviceOrderNature
    },
    data() {
      return {
        searchItem: {
          isRenderProvince: true,
          selectDeviceType: '',
          selectDeviceLinkState: '',
          shopName: '',
          shopAddress: '',
          companyName: '',
          deviceType: [
            {
              label: '全部',
              value: ''
            },
            {
              label: '洗衣机',
              value: 1
            },
            {
              label: '烘干机',
              value: 2
            }
          ],
          deviceLinkState: [
            {
              label: '全部',
              value: ''
            },
            {
              label: '不绑定门店',
              value: 0
            },
            {
              label: '绑定门店',
              value: 1
            }
          ]
        },
        table: {
          body: [
            {
              deviceTypeName: '001',
              province: '浙江省',
              city: '杭州市',
              area: '西湖区',
              companyName: 'JRucker',
              shopName: '一号店',
              shopAddress: '滨江',
              deviceStatus: '正在运行',
              deviceCode: '123',
              password: ''
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
      this.listDevice();
    },
    methods: {
      listDevice() {
        this.table.body = [];
        this.$axios.post(`${this.$api.listDevice}`, $.param({
          provinceId: this.$refs.addressPicker.address.selectProvince,
          cityId: this.$refs.addressPicker.address.selectCity,
          countyId: this.$refs.addressPicker.address.selectArea,
          companyName: this.searchItem.companyName,
          deviceCode: '',//设备编号
          deviceState: '',//设备状态
          deviceType: this.searchItem.selectDeviceType,//1洗衣机 2烘干机
          isBindShop: this.searchItem.selectDeviceLinkState,//是否绑定门店 0否 1是
          shopName: this.searchItem.shopName,
          shopAddress: this.searchItem.shopAddress,
          start: this.table.args.start,
          length: this.table.args.length,
        })).then((res) => {
          if (res.data.success) {
            res.data.data.deviceList.forEach((m) => {
              switch (m.deviceStatus) {
                case 0:
                  m.deviceStatusAlias = '已停止';
                  break;
                case 1:
                  m.deviceStatusAlias = '正在运行';
                  break;
                case 2:
                  m.deviceStatusAlias = '正在运行';
                  break;
              }
            });
            this.table.body = res.data.data.deviceList;
            this.table.args.totalCount = res.data.data.count;

            console.log(this.table.body)
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      changeDevicePage(targetPage) {
        this.table.args.start = (targetPage - 1) * this.table.args.length;
        this.listDevice();
      },
      handleSearch() {
        this.listDevice();
      },
      /**
       * 显示添加设备弹窗
       */
      createDevice() {
        this.$refs.createDeviceNature.modal.createDeviceModal.show = true;
      },
      deviceOrderModal(index) {
        this.$refs.deviceOrderNature.modal.deviceOrderModal.show = true;
        this.$refs.deviceOrderNature.modal.deviceOrderModal.deviceCode = this.table.body[index].deviceCode;
        this.$refs.deviceOrderNature.listOrder();
      },
      /**
       * 删除设备
       * @param index
       */
      deleteDevice(index) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>是否删除该设备？</p>',
          onOk: () => {
            this.$axios.post(`${this.$api.deleteDevice}`, $.param({
              deviceIdList: JSON.stringify([`${this.table.body[index].deviceId}`]),
            })).then((res) => {
              if (res.data.success) {
                this.$Message.info('删除成功！');
                this.listDevice();
              } else {
                this.$Message.info(res.data.retMsg);
              }
            }).catch((err) => {
              console.log(err)
            });
          }
        });
      },
      /**
       * 启动设备
       * @param index
       */
      startDevice(index) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>是否启动该设备？</p>',
          onOk: () => {
            this.$axios.post(`${this.$api.startDevice}`, $.param({
              deviceCode: this.table.body[index].deviceCode,
            })).then((res) => {
              if (res.data.success) {
                this.$Message.info('成功！');
              } else {
                this.$Message.info(res.data.message);
              }
            }).catch((err) => {
              console.log(err)
            });
          }
        });
      },
      /**
       * 强制停止设备
       * @param index
       */
      stopDevice(index) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>是否停止该设备？</p>',
          render: (h) => {
            return h('div', [
              h('Input', {
                style: {
                  marginTop: '10px'
                },
                props: {
                  value: this.password,
                  autofocus: true,
                  placeholder: '请输入密码'
                },
                on: {
                  input: (val) => {
                    this.password = val;
                  }
                }
              })
            ])
          },
          onOk: () => {
            this.$axios.post(`${this.$api.stopDevice}`, $.param({
              deviceCode: this.table.body[index].deviceCode,
              password: this.password
            })).then((res) => {
              if (res.data.success) {
                this.$Message.info('停止成功！');
              } else {
                this.$Message.info(res.data.retMsg);
              }
            }).catch((err) => {
              console.log(err)
            });
          }
        });
      },
      /**
       * 启动桶自洁
       * @param index
       */
      startDeviceClear(index) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>是否运行桶自洁？</p>',
          onOk: () => {
            this.$axios.post(`${this.$api.startDeviceClear}`, $.param({
              deviceCode: this.table.body[index].deviceCode,
            })).then((res) => {
              if (res.data.success) {
                this.$Message.info(res.data.message);
              } else {
                this.$Message.info(res.data.retMsg);
              }
            }).catch((err) => {
              console.log(err)
            });
          }
        });
      }
    }
  }
</script>

