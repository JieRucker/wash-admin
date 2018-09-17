<template>
  <div class="material-block-panel">
    <p class="material-title">{{materialBlock.moduleObject.templateId}}</p>
    <i class="material-icon">素材</i>
  </div>
</template>

<script>
  export default {
    name: "material-block",
    props: {
      moduleLayer: Array,
      materialBlock: Object,
    },
  }
</script>
