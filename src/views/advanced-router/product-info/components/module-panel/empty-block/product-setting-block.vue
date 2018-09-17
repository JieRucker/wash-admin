<template>
  <div class="product-setting-block-panel">
    <ul>
      <li v-for="(item,index) in productSettingBlock.moduleObject.productParameterList">
        <span class="param-name">{{item.paramName}}</span>
        <span class="field-type" v-if="item.type == 0">文本</span>
        <span class="field-type" v-if="item.type == 1">图片</span>
        <span class="field-type" v-if="item.type == 2">链接</span>
        <span class="field-type" v-if="item.type == 3">多行文本</span>
        <span class="field-type" v-if="item.type == 4">分组名称</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "product-setting-block",
    props: {
      moduleLayer: Array,
      productSettingBlock: Object,
    },
    data() {
      return {
        productSettingItem: {}
      }
    },
    methods: {}
  }
</script>


