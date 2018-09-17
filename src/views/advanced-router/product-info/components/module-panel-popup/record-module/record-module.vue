<template>
  <div class="module-block" v-if="block.moduleTypeAlias === 'record-module'">
    <a href="javascript:;" class="module-title">记录模块操作教程</a>
    <div class="module-group clearfix">
      <label class="module-control-label">模块标题</label>
      <div class="module-control-content">
        <Input style="width: 300px"></Input>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label">配置记录模板</label>
      <div class="module-control-content">
        <Button>
          <Icon type="plus-round" size="12"></Icon>&nbsp;添加其他记录模板
        </Button>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label">权限设置</label>
      <div class="module-control-content">
        <div class="module-main-panel">
          <div class="show-auth-panel">
            <label class="inline">
              查看记录权限:
            </label>
            <label class="radio-inline">
              <input type="radio" name="visible_type">所有人可见
            </label>
            <label class="radio-inline">
              <input type="radio" name="visible_type">仅维护人可见
            </label>
            <label class="radio-inline">
              <input type="radio" name="visible_type">所有人都不可见
            </label>
          </div>
          <div class="add-auth-panel">
            <label class="inline">
              添加记录权限:
            </label>
            <label class="radio-inline">
              <input type="checkbox" name="is_editable">开放扫码申请
              <!--<Tooltip content="支持在手机端显示的权限设置" placement="right">
                  <Icon type="help-circled" size="14" color="#bbb"></Icon>
              </Tooltip>-->
            </label>
            <label class="radio-inline">
              <a href="javascript:;">配置短信审核员</a>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="module-group clearfix">
      <label class="module-control-label"></label>
      <div class="module-control-content">
        <Button type="primary" size="large">保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "record-module",
    props: {
      moduleLayer: Array,
      block: Object,
    }
  }
</script>

