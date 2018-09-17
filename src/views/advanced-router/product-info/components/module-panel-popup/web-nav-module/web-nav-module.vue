<template>
  <div class="module-block" v-if="block.moduleTypeAlias === 'web-nav-module'">
    <a href="javascript:;" class="module-title">网址导航模块操作教程</a>
    <div class="module-group clearfix">
      <label class="module-control-label">模块标题</label>
      <div class="module-control-content">
        <Input style="width: 300px" v-model="block.moduleTitle"
               @on-change="onInputWebNavModule(block)"></Input>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label">图片</label>
      <div class="module-control-content">
        <div class="upload-list" v-for="item in webNavModuleItem.uploadList">
          <img :src="item.imageUrl" style="max-width: 100%;">
          <div class="upload-list-cover">
            <Icon type="ios-eye-outline" class="ios-eye-outline" @click.native="handleView(item)"></Icon>
            <Icon type="ios-trash-outline" class="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
          </div>
        </div>
        <div v-if="!webNavModuleItem.uploadList.length">
          <Upload
            ref="upload"
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :on-success="handleSuccess"
            type="drag"
            :action="`${webNavModuleItem.uploadFiles}?uploadId=${webNavModuleItem.uploadId}`"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;" @click="getUpload">
              <Icon type="camera" size="20"></Icon>
            </div>
          </Upload>
        </div>
        <Modal title="预览图片" v-model="webNavModuleItem.imageVisible">
          <div style="text-align:center">
            <img :src="webNavModuleItem.imageUrl" style="max-width: 100%">
          </div>
        </Modal>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label">导航内容</label>
      <div class="module-control-content">
        <div v-for="(item,index) in webNavModuleItem.navigationList" style="margin-bottom: 10px">
          <span
            style="border: 1px solid #dddee1;height: 35px;line-height: 35px;border-radius: 4px;padding: 0 10px;display: inline-block;">{{item.navigationName}}</span>
          <Icon type="trash-a" size="18" @click.native="deleteIcon(index)"
                style="cursor: pointer;margin-left: 5px"></Icon>
        </div>
        <Button>
          <Icon type="plus-round" size="12"></Icon>&nbsp;添加
        </Button>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label">导航样式</label>
      <div class="module-control-content">
        <div class="module-main-panel">
          <div class="mobile-visible-panel" style="padding: 0 10px">
            <Radio v-model="item.checked" :label="item.value" :key="index"
                   v-for="(item,index) in label.styleLabelList" @on-change="checkStyleLabel(index)"></Radio>
          </div>
        </div>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label"></label>
      <div class="module-control-content">
        <Button type="primary" size="large" @click="saveWebNavModulePopup">保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "web-nav-module",
    props: {
      moduleLayer: Array,
      block: Object,
    },
    data() {
      return {
        webNavModuleItem: {
          input: '',
          uploadId: '',
          uploadFiles: this.$api.uploadFiles,
          imageUrl: '',
          imageVisible: false,
          uploadList: [],
          navigationList: [
            {
              actionType: 0, //0链接 1页面定位 2素材
              iconUrl: '2312',
              linkUrl: '23423',
              navigationName: '001',
              pageNavigation: '',
              templateId: ''
            }
          ]
        },
        label: {
          styleLabelList: [
            {
              key: 0,
              value: '一行一项',
              checked: false
            },
            {
              key: 1,
              value: '一行两项',
              checked: false
            },
            {
              key: 2,
              value: '一行三项',
              checked: false
            },
            {
              key: 3,
              value: '一行四项',
              checked: false
            },
            {
              key: 4,
              value: '智能排列',
              checked: true
            }
          ],
        },
      }
    },
    methods: {
      handleView(item) {
        this.webNavModuleItem.imageUrl = item.imageUrl;
        this.webNavModuleItem.imageVisible = true;
      },
      handleRemove(file) {
        this.webNavModuleItem.uploadList.splice(0, 1)
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件格式不正确，请选择jpg或png'
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件太大，不超过2M.'
        });
      },
      handleSuccess(resolve, file, fileList) {
        if (resolve.success) {
          this.$axios.post(this.$api.uploadModuleImage, $.param({
            uploadId: this.webNavModuleItem.uploadId,
            moduleId: this.selectModuleLayer().moduleId
          })).then((res) => {
            if (res.data.success) {
              this.webNavModuleItem.uploadList.push({
                imageUrl: res.data.data
              })
            } else {
              this.$Message.error(res.data.retMsg)
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      },
      getUpload() {
        this.$axios.post(this.$api.getUploadId).then((res) => {
          if (res.data.success) {
            this.webNavModuleItem.uploadId = res.data.data;
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      onInputWebNavModule(item) {
        console.log(item)

        /*if (!this.$Global.isBlank(this.webNavModuleItem.input)) {
          this.selectedModuleLayer().hideModuleBlock = true;
          this.selectedModuleLayer().moduleTitle = this.webNavModuleItem.input;
        } else {
          this.selectedModuleLayer().hideModuleBlock = false;
        }*/
      },
      checkStyleLabel(index) {
        this.label.styleLabelList.forEach((m) => {
          m.checked = false
        });

        this.label.styleLabelList[index].checked = true;
      },
      deleteIcon(index) {
        this.webNavModuleItem.navigationList.splice(index, 1)
      },
      saveWebNavModulePopup() {
        this.$axios.post(this.$api.updateModuleNavigation, $.param({
          displayAuthGroupIdList: '',
          displayAuthPassword: '',
          displayAuthState: '', //权限设置 0不显示 1所有人可见 2用户组 3密码
          imageUrl: this.webNavModuleItem.uploadList.length > 0 ? this.webNavModuleItem.uploadList[0].imageUrl : '',
          isFold: '',
          navigationList: JSON.stringify(this.webNavModuleItem.navigationList),
          navigationType: '',
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

