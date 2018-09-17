<template>
  <div class="contact-info-block-panel">
    <p class="module-title">{{contactInfoBlock.moduleTitle}}</p>
    <div class="contact-info-list">
      <ul>
        <li class="address">
          <p class="address-label">{{contactInfoBlock.moduleObject.address}}</p>
          <span class="address-mark">地图</span>
        </li>
        <li class="li-list" v-for="(item,index) in contactInfoBlock.moduleObject.contactWayList">
          <p class="list-name">
            <span>{{item.name}}：</span>
            <span>{{item.content}}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "contact-info-block",
    props: {
      moduleLayer: Array,
      contactInfoBlock: Object,
    },
  }
</script>

