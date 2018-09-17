<template>
  <div class="music-block-panel">
    <p class="module-title">{{musicBlock.moduleTitle}}</p>
    <div class="file-list">
      <ul>
        <li class="li-list">
          <p class="list-name">
            <span>{{musicBlock.moduleObject.audioName}}</span>
          </p>
          <Icon class="download-outline" type="ios-download-outline"></Icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "music-block",
    props: {
      moduleLayer: Array,
      musicBlock: Object,
    },
  }
</script>

