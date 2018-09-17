<template>
  <div class="module-block" v-if="block.moduleTypeAlias === 'contact-info-module'">
    <a href="javascript:;" class="module-title">联系模块操作教程</a>
    <div class="module-group clearfix">
      <label class="module-control-label">模块标题</label>
      <div class="module-control-content">
        <Input style="width: 400px" v-model="block.moduleTitle"
               @on-change="onInputImgsModule(block)"></Input>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label">描述</label>
      <div class="module-control-content">
        <Input style="width: 400px" v-model="contactInfoModuleItem.moduleDesc"></Input>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label">详细地址</label>
      <div class="module-control-content">
        <Input style="width: 300px" v-model="contactInfoModuleItem.address"></Input>
        <span class="ios-location">
          <Icon type="ios-location" size="14"></Icon>&nbsp;
          <a href="javascript:;">点击标注</a>
        </span>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label">联系方式</label>
      <div class="module-control-content">
        <div v-for="(item,index) in contactInfoModuleItem.contactWayList"
             v-if="contactInfoModuleItem.contactWayList.length" style="margin-bottom: 10px">
          <Input style="width: 100px" v-model="item.name" placeholder="请输入名称"></Input>
          <Select v-model="item.type" style="width:100px;margin-left:5px;">
            <Option v-for="data in contactInfoModuleItem.selectDataTypeList" :value="data.key" :key="data.key">
              {{data.value }}
            </Option>
          </Select>
          <Input style="width: 100px;margin-left:5px;" v-model="item.content" placeholder="请输入联系内容"></Input>
          <Icon type="trash-a" size="18" @click.native="deleteIcon(index)"
                style="margin-left:5px;cursor: pointer;vertical-align: middle"></Icon>
        </div>
        <Button @click="addContactInfo">
          <Icon type="plus-round" size="12"></Icon>&nbsp;添加联系信息
        </Button>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label"></label>
      <div class="module-control-content">
        <Button type="primary" size="large" @click="saveContactInfoModulePopup">保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "contact-info-module",
    props: {
      moduleLayer: Array,
      block: Object,
    },
    data() {
      return {
        contactInfoModuleItem: {
          moduleDesc: '23423',
          address: '1122',
          contactWayList: [
            /*{
              name: '001',
              content: '1231231',
              type: 0 //0电话 1手机 2邮箱 3QQ 4其他
            }*/
          ],
          selectDataTypeList: [
            {
              key: 0,
              value: '电话'
            },
            {
              key: 1,
              value: '手机'
            },
            {
              key: 2,
              value: '邮箱'
            },
            {
              key: 3,
              value: 'QQ号'
            },
            {
              key: 4,
              value: '其他'
            }
          ]
        },
      }
    },
    methods: {
      addContactInfo() {
        this.contactInfoModuleItem.contactWayList.push({
          name: '',
          content: '',
          type: 0
        })
      },
      deleteIcon(index) {
        console.log(index)
        this.contactInfoModuleItem.contactWayList.splice(index, 1)
      },
      onInputImgsModule(item) {
        console.log(item)

        /*if (!this.$Global.isBlank(this.contactInfoModuleItem.input)) {
          this.selectedModuleLayer().hideModuleBlock = true;
          this.selectedModuleLayer().moduleTitle = this.contactInfoModuleItem.input;
        } else {
          this.selectedModuleLayer().hideModuleBlock = false;
        }*/
      },
      saveContactInfoModulePopup() {
        this.$axios.post(this.$api.updateModuleContact, $.param({
          displayAuthGroupIdList: '',
          displayAuthPassword: '',
          displayAuthState: '', //权限设置 0不显示 1所有人可见 2用户组 3密码
          moduleDesc: this.contactInfoModuleItem.moduleDesc,
          address: this.contactInfoModuleItem.address,
          contactWayList: JSON.stringify(this.contactInfoModuleItem.contactWayList),
          isFold: '',
          moduleId: this.selectModuleLayer().moduleId,
          moduleTitle: this.selectModuleLayer().moduleTitle,
          templateId: this.$route.params.templateId
        })).then((res) => {
          if (res.data.success) {
            this.$Message.info(res.data.retMsg)
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      selectModuleLayer() {
        let result = null;
        this.moduleLayer.forEach((m) => {
          if (m.active) {
            result = m;
          }
        });
        return result;
      }
    }
  }
</script>


