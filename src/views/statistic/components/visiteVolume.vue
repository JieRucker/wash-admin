<template>
  <div style="width:100%;height:100%;" id="visite_volume_con"></div>
</template>

<script>
  import echarts from 'echarts';

  export default {
    name: 'visiteVolume',
    data() {
      return {
        options: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['应收总收入', '优惠券金额', '会员优惠总额']
          },
          grid: {
            top: '10%',
            left: '1%',
            right: '1%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data:[],
              // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '收入（元）',
              splitNumber: 6
            }
          ],
          series: [
            {
              name: '应收总收入',
              type: 'bar',
              data: []
            },
            {
              name: '优惠券金额',
              type: 'bar',
              data: []
            },
            {
              name: '会员优惠总额',
              type: 'bar',
              data: []
            }
          ]
        }
      };
    },
    mounted() {
      this.initVisiteVolume();
    },
    methods: {
      initVisiteVolume() {
        this.$nextTick(() => {
          let visiteVolume = echarts.init(document.getElementById('visite_volume_con'));
          let xAxisData = [];
          let data1 = [];
          let data2 = [];
          for (let i = 0; i < 20; i++) {
            xAxisData.push('类目' + i);
            data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
            data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
          }

          visiteVolume.setOption(this.options);
          window.addEventListener('resize', function () {
            visiteVolume.resize();
          });
        });
      }
    }
  };
</script>
