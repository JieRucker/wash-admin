<style lang="scss">
  .infor-card-icon-con {
    height: 100%;
  }

  .height-100 {
    height: 100%;
  }

  .infor-card-con {
    height: 100px;
  }

  .infor-intro-text {
    font-size: 12px;
    font-weight: 500;
    color: #999999;
  }
</style>

<template>
  <Card :padding="0">
    <div class="infor-card-con">
      <!-- <Col class="infor-card-icon-con" :style="{backgroundColor: color, color: 'white'}" span="8">
           <Row class="height-100" type="flex" align="middle" justify="center">
               <Icon :type="iconType" :size="iconSize"></Icon>
           </Row>
       </Col>-->
      <Col span="24" class="height-100">
        <Row type="flex" align="middle" justify="center" class="height-100">
          <count-up
            class="infor-card-count user-created-count"
            :id-name="idName"
            :end-val="endVal"
            :countSize="countSize"
            :countWeight="countWeight">
            <p class="infor-intro-text" slot="intro">
              <Icon :type="iconType" :size="iconSize" style="vertical-align: middle;" :color="color"></Icon>
              <span style="vertical-align: middle;">{{introText}}</span>
            </p>
          </count-up>
        </Row>
      </Col>
    </div>
  </Card>
</template>

<script>
  import countUp from './countUp.vue';

  export default {
    name: 'inforCard',
    components: {
      countUp
    },
    props: {
      idName: String,
      endVal: Number,
      color: String,
      iconType: String,
      introText: String,
      countSize: {
        type: String,
        default: '20px'
      },
      countWeight: {
        type: Number,
        default: 700
      },
      iconSize: {
        type: Number,
        default: 24
      }
    }
  };
</script>

