<template>
  <div class="video-block-panel">
    <p class="module-title">{{videoBlock.moduleTitle}}</p>
    <div class="file-list">
      <ul>
        <li class="li-list">
          <p class="list-name">
            <span>{{videoBlock.moduleObject.videoName}}</span>
          </p>
          <Icon class="download-outline" type="ios-download-outline"></Icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "video-block",
    props: {
      moduleLayer: Array,
      videoBlock: Object,
    },
  }
</script>

<style scoped>

</style>
