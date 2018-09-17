<template>
  <div class="module-block" v-if="block.moduleTypeAlias === 'imgs-txt-module'">
    <a href="javascript:;" class="module-title">图文模块操作教程</a>
    <div class="module-group clearfix">
      <label class="module-control-label">模块标题</label>
      <div class="module-control-content">
        <Input style="width: 300px"
               v-model="block.moduleTitle"
               @on-change="onInputImgsTxtModule(block)">
        </Input>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label">图片</label>
      <div class="module-control-content">
        <div class="upload-list" v-for="item in imgsTxtModuleItem.uploadList">
          <img :src="item.imageUrl" style="max-width: 100%;">
          <div class="upload-list-cover">
            <Icon type="ios-eye-outline" class="ios-eye-outline" @click.native="handleView(item)"></Icon>
            <Icon type="ios-trash-outline" class="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
          </div>
        </div>
        <div v-if="!imgsTxtModuleItem.uploadList.length">
          <Upload
            ref="upload"
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :on-success="handleSuccess"
            type="drag"
            :action="`${imgsTxtModuleItem.uploadFiles}?uploadId=${imgsTxtModuleItem.uploadId}`"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;" @click="getUpload">
              <Icon type="camera" size="20"></Icon>
            </div>
          </Upload>
        </div>
        <Modal title="预览图片" v-model="imgsTxtModuleItem.imageVisible">
          <div style="text-align:center">
            <img :src="imgsTxtModuleItem.imageUrl" style="max-width: 100%">
          </div>
        </Modal>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label">正文内容</label>
      <div class="module-control-content">
        <div class="editor-panel">
          <quill-editor
            ref="imgsTxtEditor"
            v-model="block.moduleObject && block.moduleObject.textContent"
            :config="quillEditorOption"
            @change="onImgsTxtEditorChange($event)">
          </quill-editor>
        </div>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label"></label>
      <div class="module-control-content">
        <Button type="primary" size="large" @click="saveImgsTxtModulePopup">保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import 'quill/dist/quill.snow.css';
  import {quillEditor} from 'vue-quill-editor';

  export default {
    name: "imgs-txt-module",
    components: {
      quillEditor
    },
    props: {
      moduleLayer: Array,
      block: Object,
    },
    computed: {
      imgsTxtEditor() {
        return this.$refs.imgsTxtEditor.quill
      }
    },
    data() {
      return {
        imgsTxtModuleItem: {
          input: '',
          uploadId: '',
          uploadFiles: this.$api.uploadFiles,
          imageUrl: '',
          imageVisible: false,
          uploadList: [],
        },
        imgsTxtQuillContent: '',// 图文模块文本编辑器内容
        quillEditorOption: {}, // 文本编辑器设置
      }
    },
    methods: {
      handleView(item) {
        this.imgsTxtModuleItem.imageUrl = item.imageUrl;
        this.imgsTxtModuleItem.imageVisible = true;
      },
      handleRemove(file) {
        this.imgsTxtModuleItem.uploadList.splice(0, 1)
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
          this.$axios.post(this.$api.uploadModuleImageTextImage, $.param({
            uploadId: this.imgsTxtModuleItem.uploadId,
            moduleId: this.selectModuleLayer().moduleId
          })).then((res) => {
            if (res.data.success) {
              this.imgsTxtModuleItem.uploadList.push({
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
            this.imgsTxtModuleItem.uploadId = res.data.data;
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      onInputImgsTxtModule(item) {
        console.log(item)

        /*if (!this.$Global.isBlank(this.imgsTxtModuleItem.input)) {
          this.selectedModuleLayer().hideModuleBlock = true;
          this.selectedModuleLayer().moduleTitle = this.imgsTxtModuleItem.input;
        } else {
          this.selectedModuleLayer().hideModuleBlock = false;
        }*/
      },
      onImgsTxtEditorChange({quill, html, text}) {
        this.imgsTxtQuillContent = html;
        this.selectModuleLayer().moduleObject.textContent = html;
      },
      saveImgsTxtModulePopup() {
        this.$axios.post(this.$api.updateModuleImageText, $.param({
          displayAuthGroupIdList: '',
          displayAuthPassword: '',
          displayAuthState: '',
          imageUrl: this.imgsTxtModuleItem.uploadList.length > 0 ? this.imgsTxtModuleItem.uploadList[0].imageUrl : '',
          isFold: '',
          moduleId: this.selectModuleLayer().moduleId,
          moduleTitle: this.selectModuleLayer().moduleTitle,
          templateId: this.$route.params.templateId,
          textContent: this.selectModuleLayer().moduleObject.textContent
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

