
<template>
  <div class="imgs-block-panel">
    <p class="imgs-title">{{imgsBlock.moduleTitle}}</p>
    <p class="not-title upload-tips">
      <img :src="imgsBlock.moduleObject && imgsBlock.moduleObject.imageUrl">
    </p>
  </div>
</template>

<script>
  export default {
    name: "imgs-block",
    props: {
      imgsBlock: Object,
      index: Number,
    },
    data() {
      return {
        errorImg: 'this.src="' + require('assets/images/imgs/404.jpg') + '"'
      }
    }
  }
</script>



