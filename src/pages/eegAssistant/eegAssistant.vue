<template>
  <v-container>
    <v-row>
      <v-col style="height: 50px;text-align: center"><h2>请按照提示进行实验！</h2></v-col>
    </v-row>
    <v-row justify="end">
        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              设置
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">设置实验参数：单位秒</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      label="休息时间"
                      v-model="experimentalParadigm.relaxTime"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="experimentalParadigm.readyTime"
                      label="准备时间"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="experimentalParadigm.imagineTime"
                      label="想象时间"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="experimentalParadigm.times"
                      label="采集次数"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
              >
                关闭
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="set_experimentalParadigm"
              >
                保存
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    <v-row class="px-12">
      <v-col>
        <v-progress-linear :value="count*100/experimentalParadigm.times"></v-progress-linear>
      </v-col>

    </v-row>
    <v-row>
      <v-col>
        <V-img :src = "signalIconSrc['1']" max-width="400px" v-show="value===(Number(experimentalParadigm.readyTime)+Number(experimentalParadigm.relaxTime))"></V-img>
      </v-col>
      <v-col style="text-align: center;padding-top: 100px">
        <v-progress-circular style="margin: 1rem;"
          :rotate="-90"
          :size="400"
          :width="15"
          :value="value*100/step_time"
          color="teal"
        >
          <v-avatar
            class="teal lighten-5"
            size="380"
            style="font-size: 40px"
            @click="changeState"
          > {{ value }}</v-avatar>

        </v-progress-circular>

      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>

</template>

<script>
export default {
  data:()=>({
    dialog: false,
    interval: {},
    value: 0,
    state:0,
    step_time:0,
    count:0,
    experimentalParadigm:{
      relaxTime:0,
      readyTime:0,
      imagineTime:0,
      times:0,
    },
    signalIconSrc: {
      1: require('../../assets/img/walk.gif'),
    }

}),
  beforeDestroy () {
    clearInterval(this.interval)
  },
  mounted () {

  },
  watch:{
    count(val){
      console.log(val)
      if(val===Number(this.experimentalParadigm.times)){
        clearInterval(this.interval)
        this.value = "开始"
        this.state = 0
        this.count = 0
      }
    },
    value (val) {
      if(val===0){

      }
    },
    state(val) {
      if (val !== 0) {
        this.interval = setInterval(() => {
          this.step_time = Number(this.experimentalParadigm.readyTime) + Number(this.experimentalParadigm.relaxTime) + Number(this.experimentalParadigm.imagineTime)
          if (this.value >= this.step_time) {
            this.count += 1
            return (this.value = 0)
          }
          this.value += 1
        }, 1000)
      }
    },
  },
  methods:{
    set_experimentalParadigm () {
      this.dialog = false
      console.log(this.experimentalParadigm)
      console.log(Number(this.experimentalParadigm.readyTime)+Number(this.experimentalParadigm.relaxTime)+Number(this.experimentalParadigm.imagineTime))
    },
    changeState(){
      if(this.state===1)
      {
        this.state=0
        clearInterval(this.interval)
        this.value = '暂停'
      }else {
        this.state = 1
        this.value = 0
      }

    }
  },
  created () {
    this.value='开始'
    this.state = 0
  },

}
</script>

