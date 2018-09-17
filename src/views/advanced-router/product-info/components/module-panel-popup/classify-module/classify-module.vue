<template>
  <div class="module-block" v-if="block.moduleTypeAlias === 'classify-module'">
    <a href="javascript:;" class="module-title">分类模块操作教程</a>
    <div class="module-group clearfix">
      <label class="module-control-label">模块标题</label>
      <div class="module-control-content">
        <Input style="width: 300px" v-model="block.moduleTitle"
               @on-change="onInputClassifyModule(item)"></Input>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label">图片</label>
      <div class="module-control-content">
        <div class="upload-list" v-for="item in classifyModuleItem.uploadList">
          <img :src="item.imageUrl" style="max-width: 100%;">
          <div class="upload-list-cover">
            <Icon type="ios-eye-outline" class="ios-eye-outline" @click.native="handleView(item)"></Icon>
            <Icon type="ios-trash-outline" class="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
          </div>
        </div>
        <div v-if="!classifyModuleItem.uploadList.length">
          <Upload
            ref="upload"
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :on-success="handleSuccess"
            type="drag"
            :action="`${classifyModuleItem.uploadFiles}?uploadId=${classifyModuleItem.uploadId}`"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;" @click="getUpload">
              <Icon type="camera" size="20"></Icon>
            </div>
          </Upload>
        </div>
        <Modal title="预览图片" v-model="classifyModuleItem.imageVisible">
          <div style="text-align:center">
            <img :src="classifyModuleItem.imageUrl" style="max-width: 100%">
          </div>
        </Modal>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label">正文内容</label>
      <div class="module-control-content">
        <div class="editor-panel">
          <quill-editor
            ref="classifyTxtEditor"
            v-model="classifyModuleItem.textContent"
            :config="quillEditorOption"
            @change="onClassifyEditorChange($event)">
          </quill-editor>
        </div>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label"></label>
      <div class="module-control-content">
                                <span class="edit-content-btn">
                                    <Button size="large">编辑分类内容</Button>
                                </span>
        <Button type="primary" size="large" @click="saveClassifyModulePopup">保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import {quillEditor} from 'vue-quill-editor';

  export default {
    name: "classify-module",
    components: {
      quillEditor
    },
    props: {
      moduleLayer: Array,
      block: Object,
    },
    computed: {
      classifyTxtEditor() {
        return this.$refs.classifyTxtEditor.quill
      }
    },
    data() {
      return {
        classifyModuleItem: {
          input: '',
          uploadId: '',
          uploadFiles: this.$api.uploadFiles,
          imageUrl: '',
          imageVisible: false,
          uploadList: [],
          textContent: ''
        },
        // classifyQuillContent: '', // 分类模块文本编辑器内容
        quillEditorOption: {}, // 文本编辑器设置
      }
    },
    methods: {
      handleView(item) {
        this.classifyModuleItem.imageUrl = item.imageUrl;
        this.classifyModuleItem.imageVisible = true;
      },
      handleRemove(file) {
        this.classifyModuleItem.uploadList.splice(0, 1)
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
            uploadId: this.classifyModuleItem.uploadId,
            moduleId: this.selectModuleLayer().moduleId
          })).then((res) => {
            if (res.data.success) {
              this.classifyModuleItem.uploadList.push({
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
            this.classifyModuleItem.uploadId = res.data.data;
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      onInputClassifyModule(item) {
        console.log(item)

        /*if (!this.$Global.isBlank(this.classifyModuleItem.input)) {
          this.selectedModuleLayer().hideModuleBlock = true;
          this.selectedModuleLayer().moduleTitle = this.classifyModuleItem.input;
        } else {
          this.selectedModuleLayer().hideModuleBlock = false;
        }*/
      },
      onClassifyEditorChange({quill, html, text}) {
        // this.classifyQuillContent = html;
        this.classifyModuleItem.textContent = html;
        // this.selectModuleLayer().moduleObject.textContent = html;
      },
      saveClassifyModulePopup() {
        this.$axios.post(this.$api.updateModuleClassify, $.param({
          displayAuthGroupIdList: '',
          displayAuthPassword: '',
          displayAuthState: '',
          imageUrl: this.classifyModuleItem.uploadList.length > 0 ? this.classifyModuleItem.uploadList[0].imageUrl : '',
          isFold: '',
          moduleId: this.selectModuleLayer().moduleId,
          moduleTitle: this.selectModuleLayer().moduleTitle,
          templateId: this.$route.params.templateId,
          textContent: this.classifyModuleItem.textContent
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


