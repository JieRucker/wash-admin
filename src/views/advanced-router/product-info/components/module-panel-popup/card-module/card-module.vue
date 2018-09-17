<template>
  <div class="module-block" v-if="block.moduleTypeAlias === 'card-module'">
    <a href="javascript:;" class="module-title">名片模块操作教程</a>
    <div class="module-group clearfix">
      <label class="module-control-label">模块标题</label>
      <div class="module-control-content">
        <Input style="width: 300px" v-model="block.moduleTitle"></Input>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label"></label>
      <div class="module-control-content">
        <div class="card-panel">
          <div class="card-panel-head clearfix">
            <div class="pull-right">
              <Button @click="createCard">新建名片</Button>
              <span class="card-refresh">
                                                <Icon type="refresh" size="16"></Icon>
                                            </span>
            </div>
          </div>
          <div class="card-panel-content">
            <ul class="card-list">
              <li>
                <label><input type="radio" name="vcard_info">21</label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label"></label>
      <div class="module-control-content">
        <Button type="primary" size="large" @click="saveCardPanel">保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "card-module",
    props: {
      moduleLayer: Array,
      block: Object,
    },
    data() {
      return {
        cardModuleItem: {
          input: '',
          cardList: [
            {
              cardName: '001',
            },
            {
              fileName: '002',
            }
          ],
        },
      }
    },
    methods: {
      createCard() {
        this.$router.push({
          path: '/vcard'
        })
      },
      saveCardPanel() {
        this.$axios.post(this.$api.updateModuleCard, $.param({
          displayAuthGroupIdList: '',
          displayAuthPassword: '',
          displayAuthState: '', //权限设置 0不显示 1所有人可见 2用户组 3密码
          isFold: '',
          moduleId: this.selectModuleLayer().moduleId,
          moduleTitle: this.selectModuleLayer().moduleTitle,
          templateId: this.$route.params.templateId,
          cardId: ''
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
