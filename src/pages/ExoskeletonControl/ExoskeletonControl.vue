<template>
  <div class="v-main__wrap">
    <div class="container">
      <div class="row  justify-center">
        <h2>EEG DATA</h2>
      </div>
      <div class="row  justify-center">
        <div id="EEG_CHART"></div>
      </div>
      <v-divider></v-divider>
      <div class="row" style="margin-left: 14%">
        <v-col>
          <p>分类通道：</p>
          <v-chip v-for="(channel,i) in channels" color="green" class="ml-2" text-color="white" v-bind:key="i">
            {{ channel }}
          </v-chip>
        </v-col>
        <v-col>
          <p>分类结果：</p>
          <v-chip color="blue" text-color="white">
            走
          </v-chip>
        </v-col>

      </div>
      <v-divider></v-divider>
      <div style="height: 300px" class="row justify-center pa-4">
        <v-col style="height: 100%;margin-left: 14%;background-color: #00b8d4">
          <v-row justify="center">
            <h2>点击控制按钮</h2>
          </v-row>
          <v-row>
            <v-col class="text-center">
              <v-btn depressed color="primary" @click="control('行走')">行走</v-btn>
            </v-col>
            <v-col class="text-center">
              <v-btn depressed color="primary" @click="control('坐立')">坐立</v-btn>
            </v-col>
            <v-col class="text-center">
              <v-btn depressed color="primary" @click="control('上楼梯')">上楼梯</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center">
              <v-btn depressed color="primary" @click="control('上楼梯')">下楼梯</v-btn>
            </v-col>
            <v-col class="text-center">
              <v-btn depressed color="primary" @click="control('上楼梯')">停止</v-btn>
            </v-col>
            <v-col class="text-center">
              <v-btn depressed color="primary" @click="control('上楼梯')">复位</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center">
              <v-btn depressed color="primary">❤</v-btn>
            </v-col>
            <v-col class="text-center">
              <v-btn depressed color="primary">❤</v-btn>
            </v-col>
            <v-col class="text-center">
              <v-btn depressed color="primary">❤</v-btn>
            </v-col>
          </v-row>

        </v-col>
        <v-col style="margin-right: 14%;height: 100%;background-color: #00b8d4" class="ml-4">
          <v-virtual-scroll
            bench="0"
            :items="items"
            height="250"
            item-height="40"
          >
            <template v-slot:default="{ item }">
              <div class="row ml-8" style="width: 80%">
                <v-col class="pa-0">
                  <label>次序：{{ item.key }}</label>
                </v-col>
                <v-col class="pa-0">
                  <label >动作：{{ item.value }}</label>
                </v-col>
                <v-col class="pa-0">
                  <label class="pl-9">时间：{{ item.key }}</label>
                </v-col>
              </div>
              <v-divider></v-divider>
            </template>
          </v-virtual-scroll>
        </v-col>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    acts: [],
    act: '',

    channels: ['FP1', 'FP2', 'CMS', 'F1', 'F2', 'F3']

  }),
  methods: {
    control (act) {
      this.acts.push(act)
      console.log(this.acts)
    },

  },
  mounted () {
    this.$chart.dynamic_charts('EEG_CHART')
  },
  computed: {

    items () {
      return Array.from(this.array, k => {
        console.log(k)
        return {
          key: k + 1,
          value: this.acts[k],
        }
      })
    },
    length () {
      return this.acts.length
    },
    array () {
      var x = new Array(this.length)
      for (var i = 0; i < x.length; i++) {
        x[i] = i
      }
      return x
    }
  },
}
</script>

<style scoped>
#EEG_CHART {
  height: 400px;
  width: 80%;
}
</style>
