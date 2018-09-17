<template>
  <div class="add-item">
    <div class="add-module">
      <p class="add-title">选择信息展示模块</p>
      <ul class="add-container clearfix">
        <li :title="icon.iconName" class="imgs-module" @click="clickHandler(icon)" v-for="icon in moduleIcon">
          <i :class="'iconfont '+ icon.iconClass"></i>
          <p>{{icon.iconName}}</p>
        </li>
        <li class="show-more-item" title="更多" @click="showToggleArrowItem(true)" v-if="!action.showMore">
          <i class="down-arrow-item"></i>
        </li>
        <div class="more-module" v-if="action.showMore">
          <li class="video-module" :title="iconMore.iconName" @click="clickHandler(iconMore)"
              v-for="iconMore in moduleMoreIcon">
            <i :class="'iconfont '+ iconMore.iconClass"></i>
            <p>{{iconMore.iconName}}</p>
          </li>
          <li class="hidden-more-item" title="收起" @click="showToggleArrowItem(false)" v-if="action.showMore">
            <i class="up-arrow-item"></i>
          </li>
        </div>


        <!--<li title="图片模块" class="imgs-module" @click="imgsModule">
          <i class="iconfont icon-tupian"></i>
          <p>图片模块</p>
        </li>
        <li title="图文" class="imgs-txt-module" @click="imgsTxtModule">
          <i class="iconfont icon-31tuwenxiangqing"></i>
          <p>图文</p>
        </li>
        <li title="产品参数" class="product-setting-module active" @click="productSettingsModule">
          <i class="iconfont icon-chanpincanshu"></i>
          <p>产品参数</p>
        </li>
        <li title="文件" class="file-module" @click="fileModule"><i
          class="iconfont icon-wenjianliebiao"></i>
          <p>文件</p></li>
        <li title="素材" class="material-module" @click="materialModule">
          <i class="iconfont icon-wendang"></i>
          <p>素材</p>
        </li>
        <li title="图集" class="imgs-group-module" @click="imgsGroupModule">
          <i class="iconfont icon-tuku"></i>
          <p>图集</p>
        </li>
        <li title="链接" class="link-module" @click="linkModule">
          <i class="iconfont icon-fenxianglianjie"></i>
          <p>链接</p>
        </li>
        <li title="名片" class="card-module" @click="cardModule">
          <i class="iconfont icon-mingpian"></i>
          <p>名片</p>
        </li>
        <li class="show-more-item" title="更多" @click="showDownArrowItem" v-if="!isShowMore">
          <i class="down-arrow-item"></i>
        </li>
        <div class="more-module" v-if="isShowMore">
          <li class="video-module" title="视频" @click="videoModule">
            <i class="iconfont icon-shipin"></i>
            <p>视频</p>
          </li>
          <li class="contact-info-module" title="联系我们" @click="contactInfoModule">
            <i class="iconfont icon-lianxiwomen"></i>
            <p>联系我们</p>
          </li>
          <li class="classify-module" title="分类" @click="classifyModule">
            <i class="iconfont icon-fenlei"></i>
            <p>分类</p>
          </li>
          <li class="web-nav-module" title="网址导航" @click="webNavModule">
            <i class="iconfont icon-icon-"></i>
            <p>网址导航</p>
          </li>
          <li class="music-module" title="音频" @click="musicModule">
            <i class="iconfont icon-yinleyinpin"></i>
            <p>音频</p>
          </li>
          <li class="hidden-more-item" title="收起" @click="showUpArrowItem" v-if="isShowMore">
            <i class="up-arrow-item"></i>
          </li>
        </div>-->
      </ul>
      <p class="add-title">添加记录功能模块</p>
      <ul class="function-module">
        <li class="record-module" title="记录模块" @click="recordModule"
            v-if="!isExistUseRecordModule">
          <i class="iconfont icon-icon-test"></i>
          <p class="record-name">记录模块</p>
          <p class="disable-tip">点击添加记录模块，可以扫码进行巡检记录</p>
        </li>
        <li class="has-record-module" title="记录模块" v-if="isExistUseRecordModule">
          <i class="iconfont icon-icon-test"></i>
          <p class="record-name">记录模块</p>
          <p class="has-add-notice">（已添加）
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "icon-panel",
    props: {
      moduleLayer: Array,
      panel: Object,
      isExistUseRecordModule: Boolean
    },
    data() {
      return {
        moduleIcon: [
          {
            iconAlias: 'imgs-module',
            iconClass: 'icon-tupian',
            iconName: '图片模块'
          },
          {
            iconAlias: 'imgs-txt-module',
            iconClass: 'icon-31tuwenxiangqing',
            iconName: '图文'
          },
          {
            iconAlias: 'product-setting-module',
            iconClass: 'icon-chanpincanshu',
            iconName: '产品参数'
          },
          {
            iconAlias: 'file-module',
            iconClass: 'icon-wenjianliebiao',
            iconName: '文件'
          },
          {
            iconAlias: 'material-module',
            iconClass: 'icon-wendang',
            iconName: '素材'
          },
          {
            iconAlias: 'imgs-group-module',
            iconClass: 'icon-tuku',
            iconName: '图集'
          },
          {
            iconAlias: 'link-module',
            iconClass: 'icon-fenxianglianjie',
            iconName: '链接'
          },
          {
            iconAlias: 'card-module',
            iconClass: 'icon-mingpian',
            iconName: '名片'
          }
        ],
        moduleMoreIcon: [
          {
            iconAlias: 'video-module',
            iconClass: 'icon-shipin',
            iconName: '视频'
          },
          {
            iconAlias: 'contact-info-module',
            iconClass: 'icon-lianxiwomen',
            iconName: '联系我们'
          },
          {
            iconAlias: 'classify-module',
            iconClass: 'icon-fenlei',
            iconName: '分类'
          },
          {
            iconAlias: 'web-nav-module',
            iconClass: 'icon-icon-',
            iconName: '网址导航'
          },
          {
            iconAlias: 'music-module',
            iconClass: 'icon-yinleyinpin',
            iconName: '音频'
          }
        ],
        action: {
          showMore: false, // 显示更多
        }
      }
    },
    methods: {
      clickHandler(item) {
        console.log(this)
        switch (item.iconAlias) {
          case 'imgs-module':
            this.imgsModule();
            break;
          case 'imgs-txt-module':
            this.imgsTxtModule();
            break;
          case 'product-setting-module':
            this.productSettingsModule();
            break;
          case 'file-module':
            this.fileModule();
            break;
          case 'material-module':
            this.materialModule();
            break;
          case 'imgs-group-module':
            this.imgsGroupModule();
            break;
          case 'link-module':
            this.linkModule();
            break;
          case 'card-module':
            this.cardModule();
            break;
          case 'video-module':
            this.videoModule();
            break;
          case 'contact-info-module':
            this.contactInfoModule();
            break;
          case 'classify-module':
            this.classifyModule();
            break;
          case 'web-nav-module':
            this.webNavModule();
            break;
          case 'music-module':
            this.musicModule();
            break;
        }
      },
      imgsModule() {
        this.$axios.post(this.$api.addModuleImage, $.param({
          displayAuthGroupIdList: '',//权限编号数组
          displayAuthPassword: '',//密码 4位
          displayAuthState: '',//权限设置 0不显示 1所有人可见 2用户组 3密码
          isFold: 0,//是否折叠 0否 1是
          moduleTitle: '图片模块',//模块名称
          templateId: this.$route.params.templateId
        })).then((res) => {
          if (res.data.success) {
            this.$parent.initModulelist({
              templateId: this.$route.params.templateId
            });
            this.$Message.info(res.data.retMsg)
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })

        /*this.moduleLayer.push({
          moduleTypeAlias: 'imgs-module',
          moduleTxt: '图片模块',
          moduleIsFold: false,
          moduleIsUsing: true,
          hideModuleBlock: false,
          moduleTitle: '3423423',
          modulePic: 'https://oss-cn-hangzhou.aliyuncs.com/public-cli/free/dd0875416fd040fbc15fdcb7d137fddd1520319674.jpg',
          active: false
        })*/
      },
      imgsTxtModule() {
        this.$axios.post(this.$api.addModuleImageText, $.param({
          displayAuthGroupIdList: '',//权限编号数组
          displayAuthPassword: '',//密码 4位
          displayAuthState: '',//权限设置 0不显示 1所有人可见 2用户组 3密码
          isFold: 0,//是否折叠 0否 1是
          moduleTitle: '图文',//模块名称
          templateId: this.$route.params.templateId
        })).then((res) => {
          if (res.data.success) {
            this.$parent.initModulelist({
              templateId: this.$route.params.templateId
            });
            this.$Message.info(res.data.retMsg)
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })

        /*this.moduleLayer.push({
          moduleTypeAlias: 'imgs-txt-module',
          moduleTxt: '图文',
          moduleIsFold: false,
          moduleIsUsing: true,
          active: false
        })*/
      },
      productSettingsModule() {
        this.$axios.post(this.$api.addModuleProductParameter, $.param({
          displayAuthGroupIdList: '',//权限编号数组
          displayAuthPassword: '',//密码 4位
          displayAuthState: '',//权限设置 0不显示 1所有人可见 2用户组 3密码
          isFold: 0,//是否折叠 0否 1是
          moduleTitle: '产品参数',//模块名称
          templateId: this.$route.params.templateId
        })).then((res) => {
          if (res.data.success) {
            this.$parent.initModulelist({
              templateId: this.$route.params.templateId
            });
            this.$Message.info(res.data.retMsg)
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })
        /*this.moduleLayer.push({
          moduleTypeAlias: 'product-setting-module',
          moduleTxt: '产品参数',
          moduleIsFold: false,
          moduleIsUsing: true,
          active: false
        })*/
      },
      fileModule() {
        this.$axios.post(this.$api.addModuleFile, $.param({
          displayAuthGroupIdList: '',//权限编号数组
          displayAuthPassword: '',//密码 4位
          displayAuthState: '',//权限设置 0不显示 1所有人可见 2用户组 3密码
          isFold: 0,//是否折叠 0否 1是
          moduleTitle: '文件',//模块名称
          templateId: this.$route.params.templateId
        })).then((res) => {
          if (res.data.success) {
            this.$parent.initModulelist({
              templateId: this.$route.params.templateId
            });
            this.$Message.info(res.data.retMsg)
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })
        /*this.moduleLayer.push({
          moduleTypeAlias: 'file-module',
          moduleTxt: '文件',
          moduleIsFold: false,
          moduleIsUsing: true,
          active: false
        })*/
      },
      materialModule() {
        this.$axios.post(this.$api.addModuleMaterial, $.param({
          displayAuthGroupIdList: '',//权限编号数组
          displayAuthPassword: '',//密码 4位
          displayAuthState: '',//权限设置 0不显示 1所有人可见 2用户组 3密码
          isFold: 0,//是否折叠 0否 1是
          moduleTitle: '素材',//模块名称
          templateId: this.$route.params.templateId
        })).then((res) => {
          if (res.data.success) {
            this.$parent.initModulelist({
              templateId: this.$route.params.templateId
            });
            this.$Message.info(res.data.retMsg)
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })
        /*this.moduleLayer.push({
          moduleTypeAlias: 'material-module',
          moduleTxt: '素材',
          moduleIsFold: false,
          moduleIsUsing: true,
          active: false
        })*/
      },
      imgsGroupModule() {
        this.$axios.post(this.$api.addModuleAtlas, $.param({
          displayAuthGroupIdList: '',//权限编号数组
          displayAuthPassword: '',//密码 4位
          displayAuthState: '',//权限设置 0不显示 1所有人可见 2用户组 3密码
          isFold: 0,//是否折叠 0否 1是
          moduleTitle: '图集',//模块名称
          templateId: this.$route.params.templateId
        })).then((res) => {
          if (res.data.success) {
            this.$parent.initModulelist({
              templateId: this.$route.params.templateId
            });
            this.$Message.info(res.data.retMsg)
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })
        /*this.moduleLayer.push({
          moduleTypeAlias: 'imgs-group-module',
          moduleTxt: '图集',
          moduleIsFold: false,
          moduleIsUsing: true,
          active: false
        })*/
      },
      linkModule() {
        this.$axios.post(this.$api.addModuleLink, $.param({
          displayAuthGroupIdList: '',//权限编号数组
          displayAuthPassword: '',//密码 4位
          displayAuthState: '',//权限设置 0不显示 1所有人可见 2用户组 3密码
          isFold: 0,//是否折叠 0否 1是
          moduleTitle: '链接',//模块名称
          templateId: this.$route.params.templateId
        })).then((res) => {
          if (res.data.success) {
            this.$parent.initModulelist({
              templateId: this.$route.params.templateId
            });
            this.$Message.info(res.data.retMsg)
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })
        /*this.moduleLayer.push({
          moduleTypeAlias: 'link-module',
          moduleTxt: '链接',
          moduleIsFold: false,
          moduleIsUsing: true,
          active: false
        })*/
      },
      cardModule() {
        this.$axios.post(this.$api.addModuleCard, $.param({
          displayAuthGroupIdList: '',//权限编号数组
          displayAuthPassword: '',//密码 4位
          displayAuthState: '',//权限设置 0不显示 1所有人可见 2用户组 3密码
          isFold: 0,//是否折叠 0否 1是
          moduleTitle: '名片',//模块名称
          templateId: this.$route.params.templateId
        })).then((res) => {
          if (res.data.success) {
            this.$parent.initModulelist({
              templateId: this.$route.params.templateId
            });
            this.$Message.info(res.data.retMsg)
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })
        /*this.moduleLayer.push({
          moduleTypeAlias: 'card-module',
          moduleTxt: '名片',
          moduleIsFold: false,
          moduleIsUsing: true,
          active: false
        })*/
      },
      videoModule() {
        this.$axios.post(this.$api.addModuleVideo, $.param({
          displayAuthGroupIdList: '',//权限编号数组
          displayAuthPassword: '',//密码 4位
          displayAuthState: '',//权限设置 0不显示 1所有人可见 2用户组 3密码
          isFold: 0,//是否折叠 0否 1是
          moduleTitle: '视频',//模块名称
          templateId: this.$route.params.templateId
        })).then((res) => {
          if (res.data.success) {
            this.$parent.initModulelist({
              templateId: this.$route.params.templateId
            });
            this.$Message.info(res.data.retMsg)
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      contactInfoModule() {
        this.$axios.post(this.$api.addModuleContact, $.param({
          displayAuthGroupIdList: '',//权限编号数组
          displayAuthPassword: '',//密码 4位
          displayAuthState: '',//权限设置 0不显示 1所有人可见 2用户组 3密码
          isFold: 0,//是否折叠 0否 1是
          moduleTitle: '联系我们',//模块名称
          templateId: this.$route.params.templateId
        })).then((res) => {
          if (res.data.success) {
            this.$parent.initModulelist({
              templateId: this.$route.params.templateId
            });
            this.$Message.info(res.data.retMsg)
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })
        /*this.moduleLayer.push({
          moduleTypeAlias: 'contact-info-module',
          moduleTxt: '联系我们',
          moduleIsFold: false,
          moduleIsUsing: true,
          active: false
        })*/
      },
      classifyModule() {
        this.$axios.post(this.$api.addModuleClassify, $.param({
          displayAuthGroupIdList: '',//权限编号数组
          displayAuthPassword: '',//密码 4位
          displayAuthState: '',//权限设置 0不显示 1所有人可见 2用户组 3密码
          isFold: 0,//是否折叠 0否 1是
          moduleTitle: '分类',//模块名称
          templateId: this.$route.params.templateId
        })).then((res) => {
          if (res.data.success) {
            this.$parent.initModulelist({
              templateId: this.$route.params.templateId
            });
            this.$Message.info(res.data.retMsg)
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })
        /*this.moduleLayer.push({
          moduleTypeAlias: 'classify-module',
          moduleTxt: '分类',
          moduleIsFold: false,
          moduleIsUsing: true,
          active: false
        })*/
      },
      webNavModule() {
        this.$axios.post(this.$api.addModuleNavigation, $.param({
          displayAuthGroupIdList: '',//权限编号数组
          displayAuthPassword: '',//密码 4位
          displayAuthState: '',//权限设置 0不显示 1所有人可见 2用户组 3密码
          isFold: 0,//是否折叠 0否 1是
          moduleTitle: '网址导航',//模块名称
          templateId: this.$route.params.templateId
        })).then((res) => {
          if (res.data.success) {
            this.$parent.initModulelist({
              templateId: this.$route.params.templateId
            });
            this.$Message.info(res.data.retMsg)
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })
        /*this.moduleLayer.push({
          moduleTypeAlias: 'web-nav-module',
          moduleTxt: '网址导航',
          moduleIsFold: false,
          moduleIsUsing: true,
          active: false
        })*/
      },
      musicModule() {
        this.$axios.post(this.$api.addModuleAudio, $.param({
          displayAuthGroupIdList: '',//权限编号数组
          displayAuthPassword: '',//密码 4位
          displayAuthState: '',//权限设置 0不显示 1所有人可见 2用户组 3密码
          isFold: 0,//是否折叠 0否 1是
          moduleTitle: '音频',//模块名称
          templateId: this.$route.params.templateId
        })).then((res) => {
          if (res.data.success) {
            this.$parent.initModulelist({
              templateId: this.$route.params.templateId
            });
            this.$Message.info(res.data.retMsg)
          } else {
            this.$Message.error(res.data.retMsg)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      recordModule() {
        this.moduleLayer.push({
          moduleTypeAlias: 'record-module',
          moduleTxt: '记录',
          moduleIsFold: false,
          moduleIsUsing: true,
          active: false
        });

        this.$parent.addModule.isUseRecordModule = true;
      },
      showToggleArrowItem(boolean) {
        this.action.showMore = boolean;
      }
    }
  }
</script>

<style scoped>

</style>
