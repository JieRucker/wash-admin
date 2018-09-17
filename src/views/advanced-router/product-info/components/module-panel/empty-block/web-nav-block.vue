<template>
  <div class="web-nav-block-panel">
    <p class="module-title">{{webNavBlock.moduleTitle}}</p>
    <div class="file-list">
      <ul>
        <li class="li-list" v-for="(item,index) in webNavBlock.moduleObject.navigationList">
          <p class="list-name">
            <span>{{item.navigationName}}</span>
          </p>
          <Icon class="arrow-outline" type="ios-arrow-right"></Icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "web-nav-block",
    props: {
      moduleLayer: Array,
      webNavBlock: Object,
    },
  }
</script>


