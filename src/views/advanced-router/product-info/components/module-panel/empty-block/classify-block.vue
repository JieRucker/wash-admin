<template>
  <div class="classify-block-panel">
    <p class="module-title">{{classifyBlock.moduleTitle}}</p>
    <img :src="classifyBlock.imageUrl" class="image-url">
    <a href="javascript:;" class="classify-btn">进入分类</a>
    <!--<div class="file-list">
      <ul>
        <li class="li-list" v-for="(item,index) in classifyBlock.moduleObject.fileList">
          <p class="list-name">
            <span>{{item.fileName}}</span>
          </p>
          <Icon class="download-outline" type="ios-download-outline"></Icon>
        </li>
      </ul>
    </div>-->
  </div>
</template>

<script>
  export default {
    name: "classify-block",
    props: {
      moduleLayer: Array,
      classifyBlock: Object,
    },
  }
</script>

<style scoped>

</style>
