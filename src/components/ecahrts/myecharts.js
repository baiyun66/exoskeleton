/**
 * 各种画echarts图表的方法都封装在这里
 * 注意：这里echarts没有采用按需引入的方式，只是为了方便学习
 */

import * as echarts from 'echarts';
const install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart: {
      get() {
        return {
          //画一条简单的线
          line1: function (id) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();

            const optionData = {
              xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
              }]
            };

            this.chart.setOption(optionData);
          },
          dynamic_charts:function (id){
            let chart = echarts.init(document.getElementById(id));
            chart.clear();
            let option;

            function randomData() {
              now = new Date(+now + oneDay);
              value = value + Math.random() * 21 - 10;
              return {
                name: now.toString(),
                value: [
                  [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                  Math.round(value)
                ]
              };
            }

            var data = [];
            var now = +new Date(1997, 9, 3);
            var oneDay = 24 * 3600 * 1000;
            var value = Math.random() * 1000;
            for (var i = 0; i < 1000; i++) {
              data.push(randomData());
            }

             option = {
              tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                  params = params[0];
                  var date = new Date(params.name);
                  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                },
                axisPointer: {
                  animation: false
                }
              },
              xAxis: {
                type: 'time',
                splitLine: {
                  show: false
                }
              },
              yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                  show: false
                }
              },
              series: [{
                name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data
              }]
            };

            setInterval(function () {

              for (var i = 0; i < 5; i++) {
                data.shift();
                data.push(randomData());
              }

              chart.setOption({
                series: [{
                  data: data
                }]
              });
            }, 1000);

            option && chart.setOption(option);
          }
        }
      }
    }
  })
}

export default {
  install
}
