<template>
  <div class="imgs-group-block-panel">
    <p class="module-title">{{imgsGroupBlock.moduleTitle}}</p>
    <div class="carousel-box">
      <Carousel
        v-model="carousel.currentIndex"
        :autoplay="carousel.autoplay"
        :autoplay-speed="carousel.autoplaySpeed"
        :dots="carousel.dots"
        :radius-dot="carousel.radiusDot"
        :trigger="carousel.trigger"
        :arrow="carousel.arrow">
        <CarouselItem v-for="(item,index) in imgsGroupBlock.moduleObject.imageList" :key="index">
          <div class="image-carouse">
            <img :src="item.imageUrl">
          </div>
        </CarouselItem>
      </Carousel>
    </div>
  </div>
</template>

<script>
  export default {
    name: "imgs-group-block",
    props: {
      moduleLayer: Array,
      imgsGroupBlock: Object,
    },
    data() {
      return {
        carousel: {
          currentIndex: 0,
          autoplay: true,
          autoplaySpeed: 2000,
          dots: this.imgsGroupBlock.moduleObject.imageList.length > 1 ? 'inside' : 'none',
          radiusDot: true,
          trigger: 'click',
          arrow: 'never'
        }
      }
    },
   /* mounted() {
      if (this.imgsGroupBlock.moduleObject.imageList.length == 1) {
        this.carousel.dots = 'none';
      }
    }*/
  }
</script>

