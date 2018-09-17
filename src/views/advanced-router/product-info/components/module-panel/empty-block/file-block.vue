<template>
  <div class="file-block-panel">
    <p class="module-title">{{fileBlock.moduleTitle}}</p>
    <div class="file-list">
      <ul>
        <li class="li-list" v-for="(item,index) in fileBlock.moduleObject.fileList">
          <p class="list-name">
            <span>{{item.fileName}}</span>
          </p>
          <Icon class="download-outline" type="ios-download-outline"></Icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "file-block",
    props: {
      moduleLayer: Array,
      fileBlock: Object,
    },
  }
</script>

<style scoped>

</style>
