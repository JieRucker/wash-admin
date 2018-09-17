<template>
  <div class="link-block-panel">
    <p class="module-title">{{linkBlock.moduleTitle}}</p>
    <div class="link-list">
      <ul>
        <li class="li-list" v-for="(item,index) in linkBlock.moduleObject.linkList">
          <p class="list-name">
            <span>{{item.linkName}}</span>
          </p>
          <Icon class="link-outline" type="link"></Icon>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  export default {
    name: "link-block",
    props: {
      moduleLayer: Array,
      linkBlock: Object,
    },
  }
</script>

<style scoped>

</style>
