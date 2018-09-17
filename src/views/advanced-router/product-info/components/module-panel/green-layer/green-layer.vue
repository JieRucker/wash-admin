<template>
  <div class="green-layer">
    <div class="module-icon-box">
      <i :class="'iconfont i-icon '+ icon.iconClass" v-for="icon in moduleIcon"
         v-if="layer.moduleTypeAlias === icon.iconName"></i>

      <!--<i class="iconfont icon-tupian i-icon" v-if="item.moduleTypeAlias == 'imgs-module'"></i>
      <i class="iconfont icon-31tuwenxiangqing i-icon"
         v-if="item.moduleTypeAlias == 'imgs-txt-module'"></i>
      <i class="iconfont icon-chanpincanshu i-icon"
         v-if="item.moduleTypeAlias == 'product-setting-module'"></i>
      <i class="iconfont icon-wenjianliebiao i-icon"
         v-if="item.moduleTypeAlias == 'file-module'"></i>
      <i class="iconfont icon-wendang i-icon"
         v-if="item.moduleTypeAlias == 'material-module'"></i>
      <i class="iconfont icon-tuku i-icon"
         v-if="item.moduleTypeAlias == 'imgs-group-module'"></i>
      <i class="iconfont icon-fenxianglianjie i-icon"
         v-if="item.moduleTypeAlias == 'link-module'"></i>
      <i class="iconfont icon-mingpian i-icon"
         v-if="item.moduleTypeAlias == 'card-module'"></i>
      <i class="iconfont icon-lianxiwomen i-icon"
         v-if="item.moduleTypeAlias == 'contact-info-module'"></i>
      <i class="iconfont icon-shipin i-icon"
         v-if="item.moduleTypeAlias == 'video-module'"></i>
      <i class="iconfont icon-fenlei i-icon"
         v-if="item.moduleTypeAlias == 'classify-module'"></i>
      <i class="iconfont icon-icon- i-icon"
         v-if="item.moduleTypeAlias == 'web-nav-module'"></i>
      <i class="iconfont icon-yinleyinpin i-icon"
         v-if="item.moduleTypeAlias == 'music-module'"></i>
      <i class="iconfont icon-icon-test i-icon"
         v-if="item.moduleTypeAlias == 'record-module'"></i>-->
      <span class="module-text">{{layer.moduleTxt}}</span>
    </div>
    <div class="btn-group clearfix">
      <div class="group-item">
        <div v-if="layer.moduleIsFold" @click.stop="expandGroupItem(index)">
          <i class="icon fold" title="点击展开"></i>
          <span>展开</span>
        </div>
        <div @click.stop="expandGroupItem(index)" v-else>
          <i class="icon unfold" title="点击折叠"></i>
          <span>折叠</span>
        </div>
      </div>
      <div class="group-item">
        <div v-if="layer.moduleIsUsing" @click.stop="usingGroupItem(index)">
          <i class="icon using" title="点击停用"></i>
          <span>停用</span>
        </div>
        <div @click.stop="usingGroupItem(index)" v-else>
          <i class="icon no-using" title="点击启用"></i>
          <span>启用</span>
        </div>
      </div>
      <div class="group-item">
        <div @click.stop="deleteGroupItem(index)">
          <i class="icon delete" title="点击删除"></i>
          <span>删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "green-layer",
    props: {
      moduleLayer: Array,
      layer: Object,
      index: Number,
    },
    data() {
      return {
        moduleIcon: [
          {
            iconName: 'imgs-module',
            iconClass: 'icon-tupian'
          },
          {
            iconName: 'imgs-txt-module',
            iconClass: 'icon-31tuwenxiangqing'
          },
          {
            iconName: 'product-setting-module',
            iconClass: 'icon-chanpincanshu'
          },
          {
            iconName: 'file-module',
            iconClass: 'icon-wenjianliebiao'
          },
          {
            iconName: 'material-module',
            iconClass: 'icon-wendang'
          },
          {
            iconName: 'imgs-group-module',
            iconClass: 'icon-tuku'
          },
          {
            iconName: 'link-module',
            iconClass: 'icon-fenxianglianjie'
          },
          {
            iconName: 'card-module',
            iconClass: 'icon-mingpian'
          },

          {
            iconName: 'video-module',
            iconClass: 'icon-shipin'
          },
          {
            iconName: 'contact-info-module',
            iconClass: 'icon-lianxiwomen'
          },
          {
            iconName: 'classify-module',
            iconClass: 'icon-fenlei'
          },
          {
            iconName: 'web-nav-module',
            iconClass: 'icon-icon-'
          },
          {
            iconName: 'music-module',
            iconClass: 'icon-yinleyinpin'
          },
          {
            iconName: 'record-module',
            iconClass: 'icon-icon-test'
          }
        ]
      }
    },
    methods: {
      // 展开、收起模块
      expandGroupItem(index) {
        // this.$emit('expand-group-item', index);
        this.moduleLayer[index].moduleIsFold = !this.moduleLayer[index].moduleIsFold;
        if (this.moduleLayer[index].moduleIsFold) {
          this.$Message.success('折叠成功');
        } else {
          this.$Message.success('展开成功');
        }
      },
      // 启用、停用模块
      usingGroupItem(index) {
        // this.$emit('using-group-item', index);
        this.moduleLayer[index].moduleIsUsing = !this.moduleLayer[index].moduleIsUsing;
        if (this.moduleLayer[index].moduleIsUsing) {
          this.$Message.success('设置状态为启用成功');
        } else {
          this.$Message.success('设置状态为停用成功');
        }
      },
      // 删除模块
      deleteGroupItem(index) {
        // this.$emit('delete-group-item', index);
        console.log(this.moduleLayer[index])
        let moduleTypeAlias = this.moduleLayer[index].moduleTypeAlias;
        const resetLayer = () => {
          this.$axios.post(this.$api.deleteModule, $.param({
            moduleIdList: JSON.stringify([`${this.moduleLayer[index].moduleId}`]),
          })).then((res) => {
            if (res.data.success) {
              this.$parent.initModulelist({
                templateId: this.$route.params.templateId
              });
              this.$Message.info(res.data.retMsg);
            } else {
              this.$Message.error(res.data.retMsg);
            }
          }).catch((err) => {
            console.log(err)
          })
        }
        this.$Modal.confirm({
          title: '提示',
          content: '<p>删除后不可恢复，确定删除吗？</p>',
          onOk: () => {
            setTimeout(() => {
              switch (moduleTypeAlias) {
                case 'record-module':
                  resetLayer();
                  this.$parent.addModule.isUseRecordModule = false;
                  break;
                default:
                  resetLayer();
              }
            }, 100);
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
