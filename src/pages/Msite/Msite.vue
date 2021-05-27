<template>
  <div class="v-main__wrap">
    <div class="container">
      <div class="row">
        <div class="col col-auto">
          <v-card
            class="mx-auto"
            max-width="344"
          >
            <img :src = "signalIconSrc['1']" style=" height:200px" @click="toEegAssistant">

            <v-card-title>
              emotive
            </v-card-title>

            <v-card-subtitle>
              脑电数据采集
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                color="orange lighten-2"
                text
              >
                Explore
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn
                icon
                @click="show_emotive_page = !show_emotive_page"
              >
                <v-icon>{{ show_emotive_page ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show_emotive_page">
                <v-divider></v-divider>

                <v-card-text>
                  采集脑电信息的事件计时工具
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </div>
        <div class="col col-auto">
          <v-card
            class="mx-auto"
            max-width="344"
          >
            <img :src = "signalIconSrc['2']" style=" height:200px" @click="toPatientList">

            <v-card-title>
              patient info
            </v-card-title>

            <v-card-subtitle>
              病人信息
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                color="orange lighten-2"
                text
              >
                Explore
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn
                icon
                @click="show_patient_page = !show_patient_page"
              >
                <v-icon>{{ show_patient_page ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show_patient_page">
                <v-divider></v-divider>

                <v-card-text>
                  进入查看所有的病人的信息
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </div>
        <div class="col col-auto">
          <v-card
            class="mx-auto"
            max-width="344"
          >
            <img :src = "signalIconSrc['3']" style=" height:200px" @click="">

            <v-card-title>
              Exoskeleton control
            </v-card-title>

            <v-card-subtitle>
              外骨骼控制
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                color="orange lighten-2"
                text
              >
                Explore
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn
                icon
                @click="show_control_page = !show_control_page"
              >
                <v-icon>{{ show_control_page ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show_control_page">
                <v-divider></v-divider>

                <v-card-text>
                  控制外骨骼的状态，以及脑电数据的查看
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    show_emotive_page:false,
    show_patient_page:false,
    show_control_page:false,
    signalIconSrc: {
      1: require('../../assets/img/emotive.jpg'),
      2: require('../../assets/img/patient.jpg'),
      3: require('../../assets/img/Exoskeleton.jpg'),
    }

  }),
  methods:{
    toPatientList:function (){
      this.$router.replace('/patient_list')
  },
    toEegAssistant:function (){
      this.$router.replace('/eeg_assistant')
    }
  }
}
</script>

