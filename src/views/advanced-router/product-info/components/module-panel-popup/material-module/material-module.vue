<template>
  <div class="module-block" v-if="block.moduleTypeAlias === 'material-module'">
    <a href="javascript:;" class="module-title">素材模块操作教程</a>
    <div class="module-group clearfix">
      <label class="module-control-label">展示方式</label>
      <div class="module-control-content">
        <div class="module-main-panel">
          <div class="mobile-visible-panel" style="padding: 0 10px">
            <Radio v-model="item.checked" :label="item.value" :key="index"
                   v-for="(item,index) in label.openWayLabelList" @on-change="checkOpenWayLabel(index)"></Radio>
          </div>
        </div>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label">素材</label>
      <div class="module-control-content">
        <Button v-if="!materialModuleItem.selectMaterialList.length">选择素材</Button>
        <ul v-if="materialModuleItem.selectMaterialList.length">
          <li v-for="(item,index) in materialModuleItem.selectMaterialList"
              style="padding: 10px 5px;background-color: #f8f8f8;">已选择素材名称:{{item.name}}
            <Icon type="close" @click.native="deleteIcon(index)" style="float: right;padding: 7px 5px;cursor: pointer"></Icon>
          </li>
        </ul>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label"></label>
      <div class="module-control-content">
        <Button type="primary" size="large" @click="saveMaterialModulePanel">保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "material-module",
    props: {
      moduleLayer: Array,
      block: Object,
    },
    data() {
      return {
        materialModuleItem: {
          selectMaterialList: [
            {
              name: '未命名素材2'
            }
          ],
        },
        label: {
          openWayLabelList: [
            {
              key: 0,
              value: '嵌入页面中显示',
              checked: true
            },
            {
              key: 1,
              value: '子页中打开',
              checked: false
            }
          ]
        }
      }
    },
    methods: {
      checkOpenWayLabel(index) {
        this.label.openWayLabelList.forEach((m) => {
          m.checked = false
        });

        this.label.openWayLabelList[index].checked = true;
      },
      deleteIcon(index) {
        this.materialModuleItem.selectMaterialList.splice(index, 1)
      },
      saveMaterialModulePanel(){
        this.$axios.post(this.$api.updateModuleMaterial, $.param({
          displayAuthGroupIdList: '',
          displayAuthPassword: '',
          displayAuthState: '', //权限设置 0不显示 1所有人可见 2用户组 3密码
          isFold: '',
          materialTemplateId:'121212',
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

