<template>
  <div class="module-block" v-if="block.moduleTypeAlias === 'product-setting-module'">
    <a href="javascript:;" class="module-title">参数模块操作教程</a>
    <div class="module-group clearfix">
      <div class="module-control-content">
        <div class="field-form">
          <div class="set-form-table">
            <div class="cols cols1"><label>栏目名称</label></div>
            <div class="cols cols2"><label>数据类型</label></div>
            <div class="cols cols3"><label>内容</label></div>
            <div class="cols cols4"><label>操作</label></div>
          </div>
          <div class="data-list" v-for="(item,index) in settingList">
            <div class="cols cols1">
              <Input style="width: 125px" v-model="item.paramName"></Input>
              <Checkbox v-model="item.displayable">显示
              </Checkbox>
            </div>
            <div class="cols cols2">
              <Select v-model="item.selectTxt" ref="select" @on-change="typeChange" style="width:100px">
                <Option v-for="data in selectDataTypeList" :value="data.value" :key="data.value">{{ data.value }}
                </Option>
              </Select>
            </div>
            <div class="cols cols3">
              <Input style="width: 180px" placeholder="请输入文本内容" v-if="item.selectTxt == '文本'"
                     v-model="item.text"></Input>
              <Button type="primary" v-if="item.selectTxt == '图片'">上传图片</Button>
              <div v-if="item.selectTxt == '链接'">
                <Input style="width: 180px" placeholder="请输入链接名称" v-model="item.linkName"></Input>
                <Input style="width: 180px;margin-top:5px" placeholder="请输入链接地址" v-model="item.linkUrl"></Input>
              </div>
              <div v-if="item.selectTxt == '多行文本'">
                <Input type="textarea" :rows="2" placeholder="请输入文本内容" v-model="item.textarea"></Input>
              </div>
            </div>
            <div class="cols cols4">
              <Icon type="trash-a" size="18" @click.native="deleteIcon(index)" style="cursor: pointer"></Icon>
            </div>
          </div>
          <div class="addform-box">
            <div class="trans" @click="addNewItem">添加一个新的栏目</div>
          </div>
        </div>
      </div>
    </div>
    <div class="module-group clearfix">
      <div class="module-control-content">
        <Button type="primary" size="large" @click="saveProductSettingPanel">保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "product-setting-module",
    props: {
      moduleLayer: Array,
      block: Object,
    },
    data() {
      return {
        selectDataTypeList: [
          {
            key: 0,
            value: '文本'
          },
          {
            key: 1,
            value: '图片'
          },
          {
            key: 2,
            value: '链接'
          },
          {
            key: 3,
            value: '多行文本'
          },
          {
            key: 4,
            value: '分组名称'
          }
        ],
        settingList: [
          {
            selectTxt: '文本',
            type: 0,//类型 0文本 1图片 2链接 3多行文本 4分组名称
            displayableBool: false,
            displayable: 0,
            paramName: '',//栏目名称
            imageUrl: '',// 图片URL
            linkName: '',//链接名称
            linkUrl: '',//链接URL
            text: '',//文本
            textarea: ''//多行文本
          }
        ],
      }
    },
    methods: {
      typeChange(value) {
        console.log(value)
      },
      addNewItem() {
        this.settingList.push({
          selectTxt: '文本',
          type: 0,//类型 0文本 1图片 2链接 3多行文本 4分组名称
          displayable: false,
          paramName: '',//栏目名称
          imageUrl: '',// 图片URL
          linkName: '',//链接名称
          linkUrl: '',//链接URL
          text: '',//文本
          textarea: ''//多行文本
        })
      },
      deleteIcon(index) {
        this.settingList.splice(index, 1)
      },
      transferBySettingList() {
        let list = [];
        this.settingList.forEach((m) => {
          m.displayable = m.displayableBool ? 1 : 0;
          this.selectDataTypeList.forEach((c) => {
            if (m.selectTxt == c.value) {
              m.type = c.key;
            }
          })
          list.push(m)
        })

        return list;
      },
      saveProductSettingPanel() {
        console.log(this.transferBySettingList())

        this.$axios.post(this.$api.updateModuleProductParameter, $.param({
          displayAuthGroupIdList: '',
          displayAuthPassword: '',
          displayAuthState: '', //权限设置 0不显示 1所有人可见 2用户组 3密码
          isFold: '',
          moduleId: this.selectModuleLayer().moduleId,
          moduleTitle: this.selectModuleLayer().moduleTitle,
          templateId: this.$route.params.templateId,
          productParameterList: JSON.stringify(this.transferBySettingList())
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

