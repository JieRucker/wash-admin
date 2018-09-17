<template>
  <div class="user-list-panel">
    <div class="header-panel">
      <Form :model="searchItem" inline>
        <address-picker ref="addressPicker" :is-render-province="searchItem.isRenderProvince"></address-picker>
        <FormItem label="用户来源" :label-width="70">
          <Select v-model="searchItem.selectAppType" placeholder="请选择" style="width:150px">
            <Option v-for="item in searchItem.appType" :value="item.value" :key="item.value">{{item.label}}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="用户名称" :label-width="70">
          <Input v-model="searchItem.userName" placeholder="请输入" style="width: 150px"></Input>
        </FormItem>
        <FormItem label="用户编号" :label-width="70">
          <Input v-model="searchItem.userId" placeholder="请输入" style="width: 150px"></Input>
        </FormItem>
        <FormItem class="search-item">
          <Button type="primary" @click="handleSearch">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div class="table-panel">
      <Table :columns="table.header" :data="table.body"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="table.args.totalCount" :current="table.args.currentPage" :page-size="table.args.length"
                show-total @on-change="changeUserPage"></Page>
        </div>
      </div>
    </div>

    <coupon-nature ref="couponNature"></coupon-nature>
    <member-nature ref="memberNature"></member-nature>

  </div>
</template>

<script>
  import addressPicker from '@/components/addressPicker/addressPicker.vue';
  import couponNature from './modal/coupon-nature.vue';
  import memberNature from './modal/member-nature.vue';

  export default {
    name: "user-list",
    components: {
      addressPicker,
      couponNature,
      memberNature
    },
    data() {
      return {
        searchItem: {
          isRenderProvince: true,
          selectAppType: '',
          userName: '',
          userId: '',
          appType: [
            {
              label: '全部',
              value: ''
            },
            {
              label: '微信',
              value: '3'
            },
            {
              label: '支付宝',
              value: '5'
            }
          ],
        },
        table: {
          header: [
            {
              title: '头像',
              key: 'headUrl',
              align: 'center',
              render: (h, params) => {
                return h('Avatar', {
                  attrs: {
                    icon: 'person',
                    src: params.row.headUrl
                  },
                  props: {
                    size: 'default'
                  },
                  nativeOn: {
                    click: (e) => {
                      console.log(e)
                    }
                  }
                })
              }
            },
            {
              title: '用户编号',
              key: 'userId',
              align: 'center'
            },
            {
              title: '用户名称',
              key: 'userName',
              align: 'center'
            },
            {
              title: '联系电话',
              key: 'phoneNum',
              align: 'center'
            },
            {
              title: '省',
              key: 'province',
              align: 'center'
            },
            {
              title: '市',
              key: 'city',
              align: 'center'
            },
            {
              title: '区',
              key: 'area',
              align: 'center'
            },
            {
              title: '用户来源',
              key: 'appTypeName',
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
                    on: {
                      click: () => {
                        this.$refs.couponNature.modal.couponModal.show = true;
                        this.$refs.couponNature.modal.couponModal.table.userId = params.row.userId;
                      }
                    }
                  }, '优惠券绑定')
                ])
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
                        this.$refs.memberNature.modal.memberModal.show = true;
                        this.$refs.memberNature.modal.memberModal.table.userId = params.row.userId;
                        this.$refs.memberNature.listVipCard();
                      }
                    }
                  }, '会员卡绑定')
                ])
              }
            }
          ],
          body: [
            {
              headUrl: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
              userId: '11111212',
              userName: 'JRucker',
              phoneNum: '13575356945',
              province: '浙江省',
              city: '杭州市',
              area: '滨江区',
              appTypeName: '外星球'
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
      this.listUser();
    },
    methods: {
      listUser() {
        this.table.body = [];
        this.$axios.post(`${this.$api.listUser}`, $.param({
          provinceId: this.$refs.addressPicker.address.selectProvince,
          cityId: this.$refs.addressPicker.address.selectCity,
          countyId: this.$refs.addressPicker.address.selectArea,
          appType: this.searchItem.selectAppType,//1微信 2支付宝
          phoneNum: '',
          userId: this.searchItem.userId,
          userName: this.searchItem.userName,
          start: this.table.args.start,
          length: this.table.args.length,
        })).then((res) => {
          if (res.data.success) {
            this.table.body = res.data.data.userList;
            this.table.args.totalCount = res.data.data.count;

            console.log(this.table.body)
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      changeUserPage(targetPage) {
        this.table.args.start = (targetPage - 1) * this.table.args.length;
        this.listUser();
      },
      handleSearch() {
        this.listUser();
      },
      handleShopSearch() {

      }
    }
  }
</script>

