<style lang="scss">
  @import "./product-info.scss";
</style>
<template>
  <div class="user-product-info">
    <div class="product-panel clearfix">
      <div class="product-panel-left">
        <div class="product-head">
          <div class="edit-head-title" title="1">1</div>
        </div>
        <div class="product-content">
          <div class="no-module">请从下面选择模块</div>
          <div class="module-box">
            <div v-for="(item,index) in moduleLayer"
                 :class="item.active ? item.moduleTypeAlias + ' active': item.moduleTypeAlias"
                 @click="moduleBlock($event,index)">
              <empty-block ref="emptyBlock" :block="item" :index="index"></empty-block>
              <green-layer ref="greenLayer" :layer="item" :index="index" :moduleLayer="moduleLayer"></green-layer>
            </div>
          </div>

          <icon-panel :moduleLayer="moduleLayer" :isExistUseRecordModule="addModule.isUseRecordModule"></icon-panel>

        </div>
      </div>
      <div class="product-panel-right">
        <div v-for="(item,index) in moduleLayer" :class="item.moduleTypeAlias + '-popup'"
             :style="[{marginTop:item.marginTop + 'px'}]" v-if="item.active">
          <div class="popup-close" @click="closeModuleLayerPopup(item)">×</div>
          <div class="popup-arrow"></div>
          <imgs-module :block="item" :moduleLayer="moduleLayer" ref="imgsModule"></imgs-module>
          <imgs-txt-module :block="item" :moduleLayer="moduleLayer" ref="imgsTxtModule"></imgs-txt-module>
          <product-setting-module :block="item" :moduleLayer="moduleLayer"
                                  ref="productSettingModule"></product-setting-module>
          <file-module :block="item" :moduleLayer="moduleLayer" ref="fileModule"></file-module>
          <material-module :block="item" :moduleLayer="moduleLayer" ref="materialModule"></material-module>
          <imgs-group-module :block="item" :moduleLayer="moduleLayer" ref="imgsGroupModule"></imgs-group-module>
          <link-module :block="item" :moduleLayer="moduleLayer" ref="linkModule"></link-module>
          <card-module :block="item" :moduleLayer="moduleLayer" ref="cardModule"></card-module>
          <video-module :block="item" :moduleLayer="moduleLayer" ref="videoModule"></video-module>
          <contact-info-module :block="item" :moduleLayer="moduleLayer" ref="contactInfoModule"></contact-info-module>
          <classify-module :block="item" :moduleLayer="moduleLayer" ref="classifyModule"></classify-module>
          <web-nav-module :block="item" :moduleLayer="moduleLayer" ref="webNavModule"></web-nav-module>
          <music-module :block="item" :moduleLayer="moduleLayer" ref="musicModule"></music-module>
          <record-module :block="item" :moduleLayer="moduleLayer" ref="recordModule"></record-module>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import emptyBlock from './components/module-panel/empty-block/empty-block.vue';
  import iconPanel from './components/module-panel/icon-panel/icon-panel.vue';
  import greenLayer from './components/module-panel/green-layer/green-layer.vue';

  import imgsModule from './components/module-panel-popup/imgs-module/imgs-module.vue';
  import imgsTxtModule from './components/module-panel-popup/imgs-txt-module/imgs-txt-module.vue';
  import productSettingModule from './components/module-panel-popup/product-setting-module/product-setting-module.vue';
  import fileModule from './components/module-panel-popup/file-module/file-module.vue';
  import materialModule from './components/module-panel-popup/material-module/material-module.vue';
  import imgsGroupModule from './components/module-panel-popup/imgs-group-module/imgs-group-module.vue';
  import linkModule from './components/module-panel-popup/link-module/link-module.vue';
  import cardModule from './components/module-panel-popup/card-module/card-module.vue';
  import videoModule from './components/module-panel-popup/video-module/video-module.vue';
  import contactInfoModule from './components/module-panel-popup/contact-info-module/contact-info-module.vue';
  import classifyModule from './components/module-panel-popup/classify-module/classify-module.vue';
  import webNavModule from "./components/module-panel-popup/web-nav-module/web-nav-module.vue";
  import musicModule from "./components/module-panel-popup/music-module/music-module.vue";
  import recordModule from "./components/module-panel-popup/record-module/record-module.vue";

  export default {
    name: "product-info",
    data() {
      return {
        moduleLayer: [], // 模块管理
        addModule: {
          isUseRecordModule: false, // 记录模块是否被添加
        },
        args: {
          moduleStart: 0,
          moduleLength: 50
        },
        file: null,
      }
    },
    components: {
      emptyBlock,
      greenLayer,
      iconPanel,
      imgsModule,
      imgsTxtModule,
      productSettingModule,
      fileModule,
      materialModule,
      imgsGroupModule,
      linkModule,
      cardModule,
      videoModule,
      contactInfoModule,
      classifyModule,
      webNavModule,
      musicModule,
      recordModule
    },
    mounted() {
      this.initModulelist({
        templateId: this.$route.params.templateId
      })
    },
    methods: {
      /*initModulelist(item) {
        this.moduleLayer = [];
        let moduleList = [{
          "createDate": "2018-03-29 17:36:01",
          "creater": "7a1681fee4334000",
          "displayAuthState": 1,
          "isFold": 0,
          "modifier": "7a1681fee4334000",
          "modifyDate": "2018-03-30 17:16:12",
          "moduleId": "fb25050ce915007",
          "moduleObject": {"imageUrl": ""},
          "moduleTitle": "图片模块001",
          "moduleType": 0,
          "sortId": 7,
          "templateId": "8b849b375d8000"
        },{
          "createDate": "2018-03-29 17:36:01",
          "creater": "7a1681fee4334000",
          "displayAuthState": 1,
          "isFold": 0,
          "modifier": "7a1681fee4334000",
          "modifyDate": "2018-03-30 17:16:12",
          "moduleId": "fb25050ce915007",
          "moduleObject": {"imageUrl": ""},
          "moduleTitle": "产品参数",
          "moduleType": 2,
          "sortId": 7,
          "templateId": "8b849b375d8000"
        }, {
          "createDate": "2018-03-29 17:36:01",
          "creater": "7a1681fee4334000",
          "displayAuthState": 1,
          "isFold": 0,
          "modifier": "7a1681fee4334000",
          "modifyDate": "2018-03-30 17:16:12",
          "moduleId": "fb25050ce915007",
          "moduleObject": {"imageUrl": ""},
          "moduleTitle": "素材",
          "moduleType": 10,
          "sortId": 7,
          "templateId": "8b849b375d8000"
        },  {
          "createDate": "2018-03-29 17:36:01",
          "creater": "7a1681fee4334000",
          "displayAuthState": 1,
          "isFold": 0,
          "modifier": "7a1681fee4334000",
          "modifyDate": "2018-03-30 17:16:12",
          "moduleId": "fb25050ce915007",
          "moduleObject": {"imageUrl": ""},
          "moduleTitle": "分类",
          "moduleType": 11,
          "sortId": 7,
          "templateId": "8b849b375d8000"
        }, {
          "createDate": "2018-03-29 17:36:01",
          "creater": "7a1681fee4334000",
          "displayAuthState": 1,
          "isFold": 0,
          "modifier": "7a1681fee4334000",
          "modifyDate": "2018-03-30 17:16:12",
          "moduleId": "fb25050ce915007",
          "moduleObject": {"imageUrl": ""},
          "moduleTitle": "图集",
          "moduleType": 4,
          "sortId": 7,
          "templateId": "8b849b375d8000"
        },{
          "createDate": "2018-03-29 17:44:57",
          "creater": "7a1681fee4334000",
          "displayAuthState": 1,
          "isFold": 0,
          "moduleId": "90420e331015009",
          "moduleTitle": "视频",
          "moduleType": 7,
          "sortId": 9,
          "templateId": "8b849b375d8000"
        }, {
          "createDate": "2018-03-29 17:44:59",
          "creater": "7a1681fee4334000",
          "displayAuthState": 1,
          "isFold": 0,
          "moduleId": "147e59183d15010",
          "moduleTitle": "联系我们",
          "moduleType": 9,
          "sortId": 10,
          "templateId": "8b849b375d8000"
        }, {
          "createDate": "2018-03-29 17:45:02",
          "creater": "7a1681fee4334000",
          "displayAuthState": 1,
          "isFold": 0,
          "moduleId": "ac7438d83d15011",
          "moduleTitle": "分类",
          "moduleType": 11,
          "sortId": 11,
          "templateId": "8b849b375d8000"
        }, {
          "createDate": "2018-03-29 17:45:03",
          "creater": "7a1681fee4334000",
          "displayAuthState": 1,
          "isFold": 0,
          "moduleId": "cc5b4bf74415012",
          "moduleTitle": "网址导航",
          "moduleType": 12,
          "sortId": 12,
          "templateId": "8b849b375d8000"
        }, {
          "createDate": "2018-03-29 17:45:05",
          "creater": "7a1681fee4334000",
          "displayAuthState": 1,
          "isFold": 0,
          "moduleId": "a7bf6bbc7a15013",
          "moduleTitle": "音频",
          "moduleType": 8,
          "sortId": 13,
          "templateId": "8b849b375d8000"
        }, {
          "createDate": "2018-03-30 10:04:30",
          "creater": "7a1681fee4334000",
          "displayAuthState": 1,
          "isFold": 0,
          "moduleId": "1d1c3bd5c418000",
          "moduleTitle": "文件",
          "moduleType": 3,
          "sortId": 14,
          "templateId": "8b849b375d8000"
        }, {
          "createDate": "2018-03-30 17:23:15",
          "creater": "7a1681fee4334000",
          "displayAuthState": 1,
          "isFold": 0,
          "modifier": "7a1681fee4334000",
          "modifyDate": "2018-03-30 17:52:16",
          "moduleId": "be2d742e1e19000",
          "moduleObject": {"imageUrl": "", "textContent": "testataat"},
          "moduleTitle": "图文",
          "moduleType": 1,
          "sortId": 15,
          "templateId": "8b849b375d8000"
        }, {
          "createDate": "2018-03-31 16:35:17",
          "creater": "7a1681fee4334000",
          "displayAuthState": 1,
          "isFold": 0,
          "moduleId": "ffb613abd820000",
          "moduleTitle": "名片",
          "moduleType": 6,
          "sortId": 16,
          "templateId": "8b849b375d8000"
        }, {
          "createDate": "2018-04-04 10:55:41",
          "creater": "7a1681fee4334000",
          "displayAuthState": 1,
          "isFold": 0,
          "moduleId": "339bc182aa21000",
          "moduleTitle": "链接",
          "moduleType": 5,
          "sortId": 17,
          "templateId": "8b849b375d8000"
        }, {
          "createDate": "2018-04-04 10:56:02",
          "creater": "7a1681fee4334000",
          "displayAuthState": 1,
          "isFold": 0,
          "moduleId": "aabc20787f21001",
          "moduleTitle": "链接",
          "moduleType": 5,
          "sortId": 18,
          "templateId": "8b849b375d8000"
        }];

        moduleList.forEach((m) => {
          m.moduleTypeAlias = this.switchModuleType(m).moduleTypeAlias;
          m.moduleTxt = this.switchModuleType(m).moduleTxt;
          m.moduleIsFold = m.isFold != 0 ? true : false;
          m.moduleIsUsing = true;
          m.hideModuleBlock = this.switchModuleType(m).hideModuleBlock;
          m.active = false;
        });

        this.moduleLayer = moduleList;

      },*/
      initModulelist(item) {
        this.moduleLayer = [];
        this.$axios.post(this.$api.listModule, $.param({
          displayAuthState: '',//权限设置 0不显示 1所有人可见 2用户组 3密码
          moduleId: '',
          moduleTitle: '',
          moduleType: '',// 模块类型 0图片 1图文 2产品参数 3文件 4图集 5链接 6名片 7视频 8音频 9联系我们 10素材 11分类 12网址导航
          templateId: item.templateId,
          start: this.args.moduleStart,
          length: this.args.moduleLength
        })).then((res) => {
          if (res.data.success) {
            let moduleList = res.data.data.moduleList;
            moduleList.forEach((m) => {
              m.moduleTypeAlias = this.switchModuleType(m).moduleTypeAlias;
              m.moduleTxt = this.switchModuleType(m).moduleTxt;
              m.moduleIsFold = m.isFold != this.$Global.bool2Int(false) ? this.$Global.int2Bool(1) : this.$Global.int2Bool(0);
              m.moduleIsUsing = true;
              m.hideModuleBlock = this.switchModuleType(m).hideModuleBlock;
              m.active = false;
            });

            this.moduleLayer = moduleList;
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      switchModuleType(m) {
        let moduleItem = {};
        switch (m.moduleType) {
          case 0:
            moduleItem.moduleTypeAlias = 'imgs-module';
            moduleItem.moduleTxt = '图片模块';
            if ((m.moduleTitle && !this.$Global.isBlank(m.moduleTitle)) || (m.imageUrl) && !this.$Global.isBlank(m.imageUrl)) {
              moduleItem.hideModuleBlock = true;
            }
            break;
          case 1:
            moduleItem.moduleTypeAlias = 'imgs-txt-module';
            moduleItem.moduleTxt = '图文';
            if ((m.moduleTitle && !this.$Global.isBlank(m.moduleTitle)) || (m.imageUrl) && !this.$Global.isBlank(m.imageUrl)) {
              moduleItem.hideModuleBlock = true;
            }
            break;
          case 2:
            moduleItem.moduleTypeAlias = 'product-setting-module';
            moduleItem.moduleTxt = '产品参数';
            if (m.moduleObject && m.moduleObject.productParameterList.length) {
              moduleItem.hideModuleBlock = true;
            }
            break;
          case 3:
            moduleItem.moduleTypeAlias = 'file-module';
            moduleItem.moduleTxt = '文件';
            if (m.moduleObject && m.moduleObject.fileList.length) {
              moduleItem.hideModuleBlock = true;
            }
            break;
          case 4:
            moduleItem.moduleTypeAlias = 'imgs-group-module';
            moduleItem.moduleTxt = '图集';
            if (m.moduleObject && m.moduleObject.imageList.length) {
              moduleItem.hideModuleBlock = true;
            }
            break;
          case 5:
            moduleItem.moduleTypeAlias = 'link-module';
            moduleItem.moduleTxt = '链接';
            if (m.moduleObject && m.moduleObject.linkList.length) {
              moduleItem.hideModuleBlock = true;
            }
            break;
          case 6:
            moduleItem.moduleTypeAlias = 'card-module';
            moduleItem.moduleTxt = '名片';
            if (m.moduleObject) {
              moduleItem.hideModuleBlock = true;
            }
            break;
          case 7:
            moduleItem.moduleTypeAlias = 'video-module';
            moduleItem.moduleTxt = '视频';
            if (m.moduleObject) {
              moduleItem.hideModuleBlock = true;
            }
            break;
          case 8:
            moduleItem.moduleTypeAlias = 'music-module';
            moduleItem.moduleTxt = '音频';
            if (m.moduleObject) {
              moduleItem.hideModuleBlock = true;
            }
            break;
          case 9:
            moduleItem.moduleTypeAlias = 'contact-info-module';
            moduleItem.moduleTxt = '联系我们';
            if ((m.moduleObject && !this.$Global.isBlank(m.moduleObject.address)) || (m.moduleObject) && !this.$Global.isBlank(m.moduleDesc) || (m.moduleObject) && m.moduleObject.contactWayList.length) {
              moduleItem.hideModuleBlock = true;
            }
            break;
          case 10:
            moduleItem.moduleTypeAlias = 'material-module';
            moduleItem.moduleTxt = '素材';
            if (m.moduleObject && m.moduleObject.templateId) {
              moduleItem.hideModuleBlock = true;
            }
            break;
          case 11:
            moduleItem.moduleTypeAlias = 'classify-module';
            moduleItem.moduleTxt = '分类';
            if (m.moduleObject) {
              moduleItem.hideModuleBlock = true;
            }
            break;
          case 12:
            moduleItem.moduleTypeAlias = 'web-nav-module';
            moduleItem.moduleTxt = '网址导航';
            if (m.moduleObject && m.moduleObject.navigationList.length) {
              moduleItem.hideModuleBlock = true;
            }
            break;
        }

        return moduleItem;
      },
      /*handleUpload(file) {
        this.file = file;
        return this.handleUploadFlag;
      },*/
      /*upload() {
        this.$refs.upload[0].upload(this.file);
      },*/
      moduleBlock(event, index) {
        console.log(this.moduleLayer[index])

        this.moduleLayer.forEach((m) => {
          m.active = false;
        });
        this.moduleLayer[index].active = true;
        this.moduleLayer[index].marginTop = event.target.parentElement.offsetTop - 50;

        setTimeout(() => {
          switch (this.moduleLayer[index].moduleTypeAlias) {
            case 'imgs-module':
              if (this.moduleLayer[index].moduleObject && this.moduleLayer[index].moduleObject.imageUrl) {
                this.$refs.imgsModule[0].imgsModuleItem.uploadList = [];
                this.$refs.imgsModule[0].imgsModuleItem.uploadList.push({
                  imageUrl: this.moduleLayer[index].moduleObject.imageUrl
                })
              }
              break;
            case 'imgs-txt-module':
              if (this.moduleLayer[index].moduleObject && this.moduleLayer[index].moduleObject.imageUrl) {
                this.$refs.imgsTxtModule[0].imgsTxtModuleItem.uploadList = [];
                this.$refs.imgsTxtModule[0].imgsTxtModuleItem.uploadList.push({
                  imageUrl: this.moduleLayer[index].moduleObject.imageUrl
                })
              }
              break;
            case 'product-setting-module':
              if (this.moduleLayer[index].moduleObject && this.moduleLayer[index].moduleObject.productParameterList.length) {
                this.$refs.productSettingModule[0].settingList = [];
                this.moduleLayer[index].moduleObject.productParameterList.forEach((m) => {
                  this.$refs.productSettingModule[0].settingList.push({
                    selectTxt: m.type == 0 ? '文本' : m.type == 1 ? '图片' : m.type == 2 ? '链接' : m.type == 3 ? '多行文本' : m.type == 4 ? '分组名称' : '',
                    type: m.type,//类型 0文本 1图片 2链接 3多行文本 4分组名称
                    displayableBool: m.displayableBool ? 1 : 0,
                    displayable: m.displayable,
                    paramName: m.paramName,//栏目名称
                    imageUrl: m.imageUrl,// 图片URL
                    linkName: m.linkName,//链接名称
                    linkUrl: m.linkUrl,//链接URL
                    text: m.text,//文本
                    textarea: m.textarea//多行文本
                  })
                });
              }
              break;
            case 'file-module':
              if (this.moduleLayer[index].moduleObject && this.moduleLayer[index].moduleObject.fileList.length) {
                this.$refs.fileModule[0].fileModuleItem.uploadList = [];
                this.moduleLayer[index].moduleObject.fileList.forEach((m) => {
                  this.$refs.fileModule[0].fileModuleItem.uploadList.push({
                    fileName: m.fileName,
                    fileUrl: m.fileUrl
                  })
                });
              }
              break;
            case 'material-module':
              if (this.moduleLayer[index].moduleObject && this.moduleLayer[index].moduleObject.templateId) {

              }
              break;
            case 'imgs-group-module':
              if (this.moduleLayer[index].moduleObject && this.moduleLayer[index].moduleObject.imageList.length) {
                this.$refs.imgsGroupModule[0].imgsGroupModuleItem.uploadList = [];
                this.moduleLayer[index].moduleObject.imageList.forEach((m) => {
                  this.$refs.imgsGroupModule[0].imgsGroupModuleItem.uploadList.push({
                    imageName: m.imageName,
                    imageUrl: m.imageUrl
                  })
                });
              }
              break;
            case 'link-module':
              if (this.moduleLayer[index].moduleObject && this.moduleLayer[index].moduleObject.linkList.length) {
                this.$refs.linkModule[0].linkModuleItem.linkList = [];
                this.moduleLayer[index].moduleObject.linkList.forEach((m) => {
                  this.$refs.linkModule[0].linkModuleItem.linkList.push({
                    linkName: m.linkName,
                    linkUrl: m.linkUrl
                  })
                });
              }
              break;
            case 'card-module':
              if (this.moduleLayer[index].moduleObject && this.moduleLayer[index].moduleObject.cardId) {

              }
              break;
            case 'contact-info-module':
              if (this.moduleLayer[index].moduleObject && this.moduleLayer[index].moduleObject.contactWayList.length) {
                this.$refs.contactInfoModule[0].contactInfoModuleItem.contactWayList = [];
                this.moduleLayer[index].moduleObject.contactWayList.forEach((m) => {
                  this.$refs.contactInfoModule[0].contactInfoModuleItem.contactWayList.push({
                    name: m.name,
                    content: m.content,
                    type: Number.parseInt(m.type) // 0电话 1手机 2邮箱 3QQ 4其他
                  })
                });
              }
              break;
            case 'web-nav-module':
              if (this.moduleLayer[index].moduleObject && this.moduleLayer[index].moduleObject.navigationList.length) {
                this.$refs.webNavModule[0].webNavModuleItem.navigationList = [];
                this.moduleLayer[index].moduleObject.navigationList.forEach((m) => {
                  this.$refs.webNavModule[0].webNavModuleItem.navigationList.push({
                    actionType: m.actionType, //0链接 1页面定位 2素材
                    iconUrl: m.iconUrl,
                    linkUrl: m.linkUrl,
                    navigationName: m.navigationName,
                    pageNavigation: m.pageNavigation,
                    templateId: m.templateId
                  })
                });
              }
              break;
            case 'classify-module':
              if (this.moduleLayer[index].moduleObject) {

              }
              break;
          }
        }, 100)
      },
      closeModuleLayerPopup(item) {
        item.active = false;
      }
    }
  }
</script>
