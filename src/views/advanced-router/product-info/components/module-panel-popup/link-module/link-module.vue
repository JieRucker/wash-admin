<template>
  <div class="module-block" v-if="block.moduleTypeAlias === 'link-module'">
    <a href="javascript:;" class="module-title">链接模块操作教程</a>
    <div class="module-group clearfix">
      <label class="module-control-label">模块标题</label>
      <div class="module-control-content">
        <Input style="width: 300px" v-model="block.moduleTitle"
               @on-change="onInputImgsModule(block)"></Input>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label">描述</label>
      <div class="module-control-content">
        <Input style="width: 300px" v-model="linkModuleItem.moduleDesc"></Input>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label"></label>
      <div class="module-control-content">
        <div class="table-panel">
          <table class="tab-list">
            <thead>
            <tr>
              <th width="130" class="tal">链接名称</th>
              <th width="*" class="tal">链接地址</th>
              <th width="50" class="cet">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr height="40px" v-for="(item,index) in linkModuleItem.linkList">
              <td class="tal">
                <Input placeholder="请输入链接名称" v-model="item.linkName" style="width: 110px"></Input>
              </td>
              <td class="tal">
                <Input placeholder="请输入链接地址" v-model="item.linkUrl" style="width: 240px"></Input>
              </td>
              <td class="cet">
                <a href="javascript:;" @click="deleteIcon(index)">删除</a>
              </td>
            </tr>
            </tbody>
          </table>
          <p class="uftps">
            <a href="javascript:;" class="add-link" @click="addNewLink">
              <Icon type="plus-round" size="16"></Icon>
              <span>添加链接</span>
            </a>
          </p>
        </div>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label"></label>
      <div class="module-control-content">
        <label class="checkbox-inline">
          <Checkbox v-model="linkModuleItem.showWxTip">微信环境下跳转提示
          </Checkbox>
        </label>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label"></label>
      <div class="module-control-content">
        <Button type="primary" size="large" @click="savelinkModulePopup">保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "link-module",
    props: {
      moduleLayer: Array,
      block: Object,
    },
    data() {
      return {
        linkModuleItem: {
          moduleDesc: '1122',
          showWxTip: false,
          linkList: [],
        },
      }
    },
    methods: {
      onInputImgsModule(item) {
        console.log(item)

        /*if (!this.$Global.isBlank(this.linkModuleItem.input)) {
          this.selectedModuleLayer().hideModuleBlock = true;
          this.selectedModuleLayer().moduleTitle = this.linkModuleItem.input;
        } else {
          this.selectedModuleLayer().hideModuleBlock = false;
        }*/
      },
      addNewLink() {
        this.linkModuleItem.linkList.push({
          linkName: '',
          linkUrl: ''
        })
      },
      deleteIcon(index) {
        this.linkModuleItem.linkList.splice(index, 1)
      },
      savelinkModulePopup() {
        this.$axios.post(this.$api.updateModuleLink, $.param({
          displayAuthGroupIdList: '',
          displayAuthPassword: '',
          displayAuthState: '', //权限设置 0不显示 1所有人可见 2用户组 3密码
          linkList: JSON.stringify(this.linkModuleItem.linkList),
          isFold: '',
          moduleDesc: this.linkModuleItem.moduleDesc,
          moduleId: this.selectModuleLayer().moduleId,
          moduleTitle: this.selectModuleLayer().moduleTitle,
          showWxTip: this.linkModuleItem.showWxTip ? 1 : 0,
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

