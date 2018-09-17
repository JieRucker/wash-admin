<template>
  <div class="module-block" v-if="block.moduleTypeAlias === 'video-module'">
    <a href="javascript:;" class="module-title">视频模块操作教程</a>
    <div class="module-group clearfix">
      <label class="module-control-label">模块标题</label>
      <div class="module-control-content">
        <Input style="width: 300px" v-model="block.moduleTitle"
               @on-change="onInputVideoModule(block)"></Input>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label">文件</label>
      <div class="module-control-content">
        <div class="upload-list" v-for="item in videoModuleItem.uploadList" style="margin-bottom: 10px">
          <Input style="width: 150px" v-model="item.videoName"></Input>
          <Input style="width: 200px;margin-left: 5px" v-model="item.videoUrl"></Input>
          <Icon type="ios-trash-outline" size="18" style="vertical-align: middle;margin-left: 5px;cursor: pointer"
                class="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :max-size="10240"
          :on-exceeded-size="handleMaxSize"
          :on-success="handleSuccess"
          :action="`${videoModuleItem.uploadFiles}?uploadId=${videoModuleItem.uploadId}`">
          <Button @click="getUpload">上传文件</Button>
        </Upload>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label">权限设置</label>
      <div class="module-control-content">
        <div class="module-main-panel">
          <div class="mobile-visible-panel">
            <label class="inline">
              手机端显示:
              <Tooltip content="支持在手机端显示的权限设置" placement="right">
                <Icon type="help-circled" size="14" color="#bbb"></Icon>
              </Tooltip>
            </label>
            <Radio v-model="item.checked" :label="item.value" :key="index"
                   v-for="(item,index) in label.phoneShowLabelList" @on-change="checkPhoneShowLabel(index)"></Radio>
          </div>
          <div class="mobile-userGroup-panel" v-if="label.selectPhoneShowLabelIndex == 2">
            <label class="inline">
              请选择用户组:
            </label>
            <Checkbox v-model="item.checked" :key="index"
                      v-for="(item,index) in label.userGroupList">{{item.value}}
            </Checkbox>
          </div>
          <div class="mobile-password-panel" v-if="label.selectPhoneShowLabelIndex == 3">
            <label class="inline">
              设置访问密码:
            </label>
            <Input v-model="label.password" :maxlength="4" placeholder="请输入4位数字密码" style="width: 150px"></Input>
          </div>
        </div>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label"></label>
      <div class="module-control-content">
        <Button type="primary" size="large" @click="saveVideoPanel">保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "video-module",
    props: {
      moduleLayer: Array,
      block: Object,
    },
    data() {
      return {
        videoModuleItem: {
          input: '',
          uploadId: '',
          uploadFiles: this.$api.uploadFiles,
          imageUrl: '',
          uploadList: [
            {
              videoName: '90420e331015009_2ce47bdae724000_video',
              videoUrl: 'http://videodev.youbim.cn/qrcode/module_video/90420e331015009_2ce47bdae724000_video.mp4'
            }
          ],
        },
        label: {
          selectPhoneShowLabelIndex: 0,
          phoneShowLabelList: [
            {
              key: 0,
              value: '不显示',
              checked: false
            },
            {
              key: 1,
              value: '所有人可见',
              checked: true
            },
            {
              key: 2,
              value: '用户组',
              checked: false
            },
            {
              key: 3,
              value: '密码',
              checked: false
            }
          ],
          userGroupList: [
            {
              key: 0,
              value: 'test',
              checked: false,
            },
            {
              key: 1,
              value: '管理员组',
              checked: false,
            }
          ],
          password: ''
        },
      }
    },
    methods: {
      checkPhoneShowLabel(index) {
        this.label.selectPhoneShowLabelIndex = index;
        this.label.phoneShowLabelList.forEach((m) => {
          m.checked = false
        });

        this.label.phoneShowLabelList[index].checked = true;
      },
      onInputVideoModule(item) {
        console.log(item)

        /*if (!this.$Global.isBlank(this.videoModuleItem.input)) {
          this.selectedModuleLayer().hideModuleBlock = true;
          this.selectedModuleLayer().moduleTitle = this.videoModuleItem.input;
        } else {
          this.selectedModuleLayer().hideModuleBlock = false;
        }*/
      },
      handleRemove(file) {
        this.videoModuleItem.uploadList.splice(0, 1)
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件太大，不超过10M.'
        });
      },
      handleSuccess(resolve, file, fileList) {
        if (resolve.success) {
          this.$axios.post(this.$api.uploadModuleVideo, $.param({
            uploadId: this.videoModuleItem.uploadId,
            moduleId: this.selectModuleLayer().moduleId
          })).then((res) => {
            if (res.data.success) {
              this.videoModuleItem.uploadList.push({
                videoName: '90420e331015009_2ce47bdae724000_video',
                videoUrl: 'http://videodev.youbim.cn/qrcode/module_video/90420e331015009_2ce47bdae724000_video.mp4'
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
            this.videoModuleItem.uploadId = res.data.data;
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      saveVideoPanel() {
        this.$axios.post(this.$api.updateModuleVideo, $.param({
          displayAuthGroupIdList: '',
          displayAuthPassword: '',
          displayAuthState: '', //权限设置 0不显示 1所有人可见 2用户组 3密码
          isFold: '',
          moduleId: this.selectModuleLayer().moduleId,
          moduleTitle: this.selectModuleLayer().moduleTitle,
          templateId: this.$route.params.templateId,
          videoName: this.videoModuleItem.uploadList.length ? this.videoModuleItem.uploadList[0].videoName : '',
          videoUrl: this.videoModuleItem.uploadList.length ? this.videoModuleItem.uploadList[0].videoUrl : '',
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

