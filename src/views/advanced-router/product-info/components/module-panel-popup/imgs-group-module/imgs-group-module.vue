<template>
  <div class="module-block" v-if="block.moduleTypeAlias === 'imgs-group-module'">
    <a href="javascript:;" class="module-title">图集模块操作教程</a>
    <div class="module-group clearfix">
      <label class="module-control-label">模块标题</label>
      <div class="module-control-content">
        <Input style="width: 300px" v-model="block.moduleTitle" @on-change="onInputImgsModule(block)"></Input>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label">图片</label>
      <div class="module-control-content">
        <div class="upload-list" v-for="item in imgsGroupModuleItem.uploadList">
          <img :src="item.imageUrl" style="max-width: 100%;">
          <div class="upload-list-cover">
            <Icon type="ios-eye-outline" class="ios-eye-outline" @click.native="handleView(item)"></Icon>
            <Icon type="ios-trash-outline" class="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
          </div>
        </div>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :on-success="handleSuccess"
          type="drag"
          :action="`${imgsGroupModuleItem.uploadFiles}?uploadId=${imgsGroupModuleItem.uploadId}`"
          style="display: inline-block;width:58px;">
          <div style="width: 58px;height:58px;line-height: 58px;" @click="getUpload">
            <Icon type="camera" size="20"></Icon>
          </div>
        </Upload>
        <Modal title="预览图片" v-model="imgsGroupModuleItem.imageVisible">
          <div style="text-align:center">
            <img :src="imgsGroupModuleItem.imageUrl" style="max-width: 100%">
          </div>
        </Modal>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label"></label>
      <div class="module-control-content">
        <Button type="primary" size="large" @click="saveImgsGroupModulePopup">保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "imgs-group-module",
    props: {
      moduleLayer: Array,
      block: Object,
    },
    data() {
      return {
        imgsGroupModuleItem: {
          input: '',
          uploadId: '',
          uploadFiles: this.$api.uploadFiles,
          imageUrl: '',
          imageVisible: false,
          uploadList: [],
        },
      }
    },
    methods: {
      handleView(item) {
        this.imgsGroupModuleItem.imageUrl = item.imageUrl;
        this.imgsGroupModuleItem.imageVisible = true;
      },
      handleRemove(file) {
        this.imgsGroupModuleItem.uploadList.splice(0, 1)
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
          this.$axios.post(this.$api.uploadModuleAtlasImage, $.param({
            uploadId: this.imgsGroupModuleItem.uploadId,
            moduleId: this.selectModuleLayer().moduleId
          })).then((res) => {
            if (res.data.success) {
              this.imgsGroupModuleItem.uploadList.push({
                imageName: '001',
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
            this.imgsGroupModuleItem.uploadId = res.data.data;
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      onInputImgsModule(item) {
        console.log(item)

        /*if (!this.$Global.isBlank(this.imgsGroupModuleItem.input)) {
          this.selectedModuleLayer().hideModuleBlock = true;
          this.selectedModuleLayer().moduleTitle = this.imgsGroupModuleItem.input;
        } else {
          this.selectedModuleLayer().hideModuleBlock = false;
        }*/
      },
      saveImgsGroupModulePopup() {

        this.$axios.post(this.$api.updateModuleAtlas, $.param({
          displayAuthGroupIdList: '',
          displayAuthPassword: '',
          displayAuthState: '', //权限设置 0不显示 1所有人可见 2用户组 3密码
          imageList: this.imgsGroupModuleItem.uploadList.length > 0 ? JSON.stringify(this.imgsGroupModuleItem.uploadList) : '',
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

