<template>
  <div class="card-block-panel">
    <p class="module-title">{{cardBlock.moduleTitle}}</p>
    <div class="card-box">
      <img src="https://cache.cli.im/cli_biz/mobile/tpl/module/images/default_face.png">
      <div class="card-info">
        <h3 class="name">sdfasdfsda</h3>
        <p class="position">职位</p>
        <p class="orgname">单位</p>
      </div>
      <Icon class="card-icon" type="ios-arrow-right"></Icon>
    </div>
  </div>
</template>

<script>
  export default {
    name: "card-block",
    props: {
      moduleLayer: Array,
      cardBlock: Object,
    },
  }
</script>

