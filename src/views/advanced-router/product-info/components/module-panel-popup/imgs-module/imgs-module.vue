<template>
  <div class="module-block" v-if="block.moduleTypeAlias === 'imgs-module'">
    <a href="javascript:;" class="module-title">图片模块操作教程</a>
    <div class="module-group clearfix">
      <label class="module-control-label">模块标题</label>
      <div class="module-control-content">
        <Input style="width: 300px"
               v-model="block.moduleTitle"
               @on-change="onInputImgsModule(block)">
        </Input>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label">图片</label>
      <div class="module-control-content">
        <div class="upload-list" v-for="item in imgsModuleItem.uploadList">
          <img :src="item.imageUrl" style="max-width: 100%;height: 100%;">
          <div class="upload-list-cover">
            <Icon type="ios-eye-outline" class="ios-eye-outline" @click.native="handleView(item)"></Icon>
            <Icon type="ios-trash-outline" class="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
          </div>
        </div>
        <div v-if="!imgsModuleItem.uploadList.length">
          <Upload
            ref="upload"
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :on-success="handleSuccess"
            type="drag"
            :action="`${imgsModuleItem.uploadFiles}?uploadId=${imgsModuleItem.uploadId}`"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;" @click="getUpload">
              <Icon type="camera" size="20"></Icon>
            </div>
          </Upload>
        </div>
        <Modal title="预览图片" v-model="imgsModuleItem.imageVisible">
          <div style="text-align:center">
            <img :src="imgsModuleItem.imageUrl"
                 style="max-width: 100%;height: 100%;">
          </div>
        </Modal>
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
            <Input v-model="label.password" :maxlength="4" placeholder="请输入4位数字密码"
                   style="width: 150px"></Input>
          </div>
          <div class="mobile-editable-panel">
            <label class="inline">
              手机端编辑:
              <Tooltip content="支持在手机端显示的权限设置" placement="right">
                <Icon type="help-circled" size="14" color="#bbb"></Icon>
              </Tooltip>
            </label>
            <Radio v-model="item.checked" :label="item.value" :key="index"
                   v-for="(item,index) in label.phoneEditLabelList" @on-change="checkPhoneEditLabel(index)"></Radio>
          </div>
        </div>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label"></label>
      <div class="module-control-content">
        <Button type="primary" size="large" @click="saveImgsModulePopup">保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "imgs-module",
    props: {
      moduleLayer: Array,
      block: Object,
    },
    data() {
      return {
        imgsModuleItem: {
          input: '',
          uploadId: '',
          uploadFiles: this.$api.uploadFiles,
          imageUrl: '',
          imageVisible: false,
          uploadList: [],
          errorImg: 'this.src="' + require('assets/images/imgs/404.jpg') + '"'
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
          phoneEditLabelList: [
            {
              key: 0,
              value: '不可编辑',
              checked: true
            },
            {
              key: 1,
              value: '可编辑',
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
      checkPhoneEditLabel(index) {
        this.label.phoneEditLabelList.forEach((m) => {
          m.checked = false
        });

        this.label.phoneEditLabelList[index].checked = true;
      },
      handleView(item) {
        this.imgsModuleItem.imageUrl = item.imageUrl;
        this.imgsModuleItem.imageVisible = true;
      },
      handleRemove(file) {
        this.imgsModuleItem.uploadList.splice(0, 1);
        this.block.moduleObject.imageUrl = '';
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
            uploadId: this.imgsModuleItem.uploadId,
            moduleId: this.selectModuleLayer().moduleId
          })).then((res) => {
            if (res.data.success) {
              this.imgsModuleItem.uploadList.push({
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
            this.imgsModuleItem.uploadId = res.data.data;
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      onInputImgsModule(item) {
        console.log(item)

        /*if (!this.$Global.isBlank(this.imgsModuleItem.input)) {
          this.selectedModuleLayer().hideModuleBlock = true;
          this.selectedModuleLayer().moduleTitle = this.imgsModuleItem.input;
        } else {
          this.selectedModuleLayer().hideModuleBlock = false;
        }*/
      },
      getSelectedLabel() {
        let result = null;
        this.label.phoneShowLabelList.forEach((m) => {
          if (m.checked) {
            result = m
          }
        });

        return result;
      },
      selectedUserGroup() {
        let group = new Array();
        this.label.userGroupList.forEach((m) => {
          if (m.checked) {
            group.push(m.key);
          }
        });
        return group;
      },
      saveImgsModulePopup() {
        if (this.getSelectedLabel().key == 3) {
          if (this.$Global.isBlank(this.label.password)) {
            return this.$Message.info('请输入密码')
          }
        }

        this.$axios.post(this.$api.updateModuleImage, $.param({
          displayAuthGroupIdList: this.selectedUserGroup().length ? JSON.stringify(this.selectedUserGroup()) : '',
          displayAuthPassword: this.getSelectedLabel().key == 3 ? this.label.password : '',
          displayAuthState: this.getSelectedLabel().key, //权限设置 0不显示 1所有人可见 2用户组 3密码
          imageUrl: this.imgsModuleItem.uploadList.length > 0 ? this.imgsModuleItem.uploadList[0].imageUrl : '',
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

