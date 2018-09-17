
<template>
  <div class="imgs-txt-block-panel">
    <p class="imgs-title">{{imgsTxtBlock.moduleTitle}}</p>
    <p class="not-title upload-tips">
      <img :src="imgsTxtBlock.moduleObject && imgsTxtBlock.moduleObject.imageUrl">
    </p>
    <p class="text-content" v-html="imgsTxtBlock.moduleObject && imgsTxtBlock.moduleObject.textContent">
      <!--{{imgsTxtBlock.moduleObject && imgsTxtBlock.moduleObject.textContent}}-->
    </p>
  </div>
</template>

<script>
  export default {
    name: "imgs-txt-block",
    props: {
      imgsTxtBlock: Object,
      index: Number
    }
  }
</script>
