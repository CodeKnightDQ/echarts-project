<template>
  <div>
    <el-button type="primary" @click="toggle('referer')">referer</el-button>
    <el-button type="success" @click="toggle('useragent')">useragent</el-button>
    <el-button type="warning" @click="toggle('ip')">ip</el-button>
    <!-- <el-button type="danger">危险按钮</el-button> -->
    <div id="main"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      dataType: 'referer',
    };
  },
  mounted() {
    let dataType = this.dataType;
    this.genPieChart(dataType);
  },
  methods: {
    genPieChart(type) {
      const dataJson = require(`./${type}.json`);
      let data = {};
      data.legendData = [];
      data.seriesData = [];
      console.log(dataJson, data);

      dataJson.forEach((item) => {
        let content = item[type].replace(/^https:\/\//, '');
        data.legendData.push(content);
        data.seriesData.push({
          name: content,
          value: item.pv,
        });
      });

      this.drawChart(type, data);
    },
    drawChart(type, data) {
      let chartDom = document.getElementById('main');
      echarts.dispose(chartDom);
      let myChart = echarts.init(chartDom);
      let option;

      option = Object.assign(
        {
          title: {
            text: '翻译垂搜首页流量特征分析',
            subtext: `${type}分布`,
            left: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          series: [
            {
              name: '频次',
              type: 'pie',
              radius: '55%',
              center: ['40%', '50%'],
              data: data.seriesData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        },
        type !== 'useragent'
          ? {
              legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                width: 200,
                data: data.legendData,

                selected: data.selected,
              },
            }
          : {}
      );

      option && myChart.setOption(option);
    },
    toggle(type) {
      this.dataType = type;
      this.genPieChart(type);
    },
  },
};
</script>

<style scoped>
#main {
  margin: 20px auto;
  width: 1920px;
  height: 1080px;
}
</style>
