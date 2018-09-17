<style lang="scss">
  .member-list-card-modal {
    .tip-ico {
      color: #f00;
      font-style: normal;
    }
    .member-card {
      ul {
        li {
          &:first-child {
            margin-left: 0;
          }
          background-position: center;
          background-size: cover;
          list-style: none;
          float: left;
          margin-left: 10px;
          width: 175px;
          height: 90px;
          position: relative;
          border-radius: 10px;
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          .checkbox {
            position: absolute;
            top: -3px;
            left: 5px;
          }
        }
      }
    }
  }
</style>

<template>
  <Modal :title="modal.memberCardModal.modalTitle" v-model="modal.memberCardModal.show" width="600"
         class="member-list-card-modal" @on-ok="saveMemberCardNature">
    <div class="main-panel">
      <Form :model="modal.memberCardModal" label-position="left" class="member-free-box">
        <FormItem label="名称：" :label-width="80">
          <Input v-model="modal.memberCardModal.memberName" placeholder="请输入" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="描述：" :label-width="80">
          <Input v-model="modal.memberCardModal.memberDesc" type="textarea" :rows="4" :maxlength="32"
                 placeholder="请输入" style="width: 300px"></Input>
          <i class="tip-ico">*限32字以内</i>
        </FormItem>
        <FormItem label="URL地址：" :label-width="80">
          <Input v-model="modal.memberCardModal.urlAddress" placeholder="请输入" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="会员售价：" :label-width="80">
          <Input v-model="modal.memberCardModal.memberPrice" placeholder="请输入" style="width: 300px"></Input>
        </FormItem>
        <Form inline>
          <FormItem label="优惠程度" :label-width="80">
            <Select v-model="modal.memberCardModal.selectDiscount" placeholder="请选择" style="width:150px">
              <Option v-for="option in modal.memberCardModal.discountList" :value="option.value" :key="option.value">
                {{option.label}}
              </Option>
            </Select>
          </FormItem>

          <FormItem label="有效期" :label-width="60">
            <Select v-model="modal.memberCardModal.selectValidMonth" placeholder="请选择" style="width:150px">
              <Option v-for="option in modal.memberCardModal.validMonthList" :value="option.value" :key="option.value">
                {{option.label}}
              </Option>
            </Select>
          </FormItem>
        </Form>
        <FormItem>
          <p>会员卡背景选择：</p>
          <div class="member-card">
            <ul class="clearfix">
              <li v-for="(item,index) in modal.memberCardModal.memberCardList"
                  :style="[{backgroundImage:'url('+item.imageUrl+')'}]" @click="switchMemberCard(index)">
                <Checkbox v-model="item.checked" class="checkbox"></Checkbox>
              </li>
            </ul>
          </div>
        </FormItem>
      </Form>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "member-card-nature",
    data() {
      return {
        modal: {
          memberCardModal: {
            show: false,
            modalType: 'custom',
            modalTitle: '添加会员卡',
            vipCardId: '',
            memberName: '',
            memberDesc: '',
            urlAddress: '',
            memberPrice: '',

            selectDiscount: '',
            selectValidMonth: '',
            discountList: [
              {
                label: '1折',
                value: 10
              },
              {
                label: '2折',
                value: 20
              },
              {
                label: '3折',
                value: 30
              },
              {
                label: '4折',
                value: 40
              },
              {
                label: '5折',
                value: 50
              },
              {
                label: '6折',
                value: 60
              },
              {
                label: '7折',
                value: 70
              },
              {
                label: '8折',
                value: 80
              },
              {
                label: '9折',
                value: 90
              },
            ],
            validMonthList: [
              {
                label: '一个月',
                value: 1
              },
              {
                label: '二个月',
                value: 2
              },
              {
                label: '三个月',
                value: 3
              },
              {
                label: '四个月',
                value: 4
              },
              {
                label: '五个月',
                value: 5
              },
              {
                label: '六个月',
                value: 6
              },
              {
                label: '七个月',
                value: 7
              },
              {
                label: '八个月',
                value: 8
              },
              {
                label: '九个月',
                value: 9
              },
              {
                label: '十个月',
                value: 10
              },
              {
                label: '十一个月',
                value: 11
              },
              {
                label: '十二个月',
                value: 12
              }
            ],
            memberCardList: [
              {
                imageUrl: require('assets/images/member/card-1.png'),
                checked: true
              },
              {
                imageUrl: require('assets/images/member/card-2.png'),
                checked: false
              },
              {
                imageUrl: require('assets/images/member/card-3.png'),
                checked: false
              }
            ]
          },
        }
      }
    },
    methods: {
      saveMemberCardNature() {
        if (this.$Global.isBlank(this.modal.memberCardModal.memberName)) {
          return this.$Message.info('请填写会员卡名称！');
        } else if (this.$Global.isBlank(this.modal.memberCardModal.memberPrice)) {
          return this.$Message.info('请填写会员卡价格！');
        } else if (this.$Global.isBlank(this.modal.memberCardModal.selectDiscount)) {
          return this.$Message.info('请选择优惠程度！');
        } else if (this.$Global.isBlank(this.modal.memberCardModal.selectValidMonth)) {
          return this.$Message.info('请选择有效期！');
        }

        let httpUrl = null;
        switch (this.modal.memberCardModal.modalType) {
          case 'custom':
            httpUrl = `${this.$api.addVipCard}`;
            break;
          case 'update':
            httpUrl = `${this.$api.updateVipCard}`;
            break;
        }

        this.$axios.post(httpUrl, $.param({
          vipName: this.modal.memberCardModal.memberName,
          vipDesc: this.modal.memberCardModal.memberDesc,
          vipCardId: this.modal.memberCardModal.modalType === 'custom' ? '' : this.modal.memberCardModal.vipCardId,
          backgroundImageUrl: '',
          discount: this.modal.memberCardModal.selectDiscount,
          price: this.modal.memberCardModal.memberPrice,
          validMonth: this.modal.memberCardModal.selectValidMonth,//有效月份
          vipUrl: this.modal.memberCardModal.urlAddress//推广链接
        })).then((res) => {
          if (res.data.success) {
            this.$Message.info('成功！');
            this.$parent.listVipCard();
          } else {
            this.$Message.info(res.data.retMsg);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      switchMemberCard(index) {
        this.modal.memberCardModal.memberCardList.forEach((m) => {
          m.checked = false
        });
        this.modal.memberCardModal.memberCardList[index].checked = true;
      }
    }
  }
</script>

