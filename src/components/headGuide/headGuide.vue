<template>
  <div>
<v-system-bar app>
  <v-icon @click="drawer=!drawer">
    {{icons.mdiMenu}}
  </v-icon>
</v-system-bar>
<v-navigation-drawer
  v-model="drawer"
  app>
<v-sheet
  color="grey lighten-4"
  class="pa-4"
>
  <v-avatar
    class="mb-4"
    color="grey darken-1"
    size="64"
  ></v-avatar>

  <div>john@vuetifyjs.com</div>
</v-sheet>

<v-divider></v-divider>

<v-list
  nav
  dense
>
  <!--          active-class="deep-purple&#45;&#45;text text&#45;&#45;accent-4"-->
  <v-list-item-group
    v-model="group"

  >

    <v-list-item @click="toHomePage" >
      <v-list-item-icon>
        <v-icon v-text="icons.mdiHome"></v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>主页</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item @click="toPatientList">
      <v-list-item-icon>
        <v-icon v-text="icons.mdiAccountGroup"></v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>信息管理</v-list-item-title>
      </v-list-item-content>

    </v-list-item>

    <v-list-item @click="toEegAssistant">
      <v-list-item-icon>
        <v-icon v-text="icons.mdiHeadCheckOutline"></v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>脑电采集</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item @click="">
      <v-list-item-icon>
        <v-icon v-text="icons.mdiDoctor"></v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>康复治疗</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item @click="drawer=!drawer">
      <v-list-item-icon>
        <v-icon v-text="icons.mdiLogout"></v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>退出</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-item-group>
</v-list>
</v-navigation-drawer>
  </div>
</template>
<script>
import {
  mdiHome,
  mdiAccountGroup,
  mdiHeadCheckOutline,
  mdiDoctor,
  mdiKeyboardReturn,
  mdiLogout,
  mdiMenu,
} from '@mdi/js'



export default {

  data: () => ({
    icons: {
      mdiHome,
      mdiAccountGroup,
      mdiHeadCheckOutline,
      mdiDoctor,
      mdiKeyboardReturn,
      mdiLogout,
      mdiMenu
    },
    drawer: true,
    group: null,
  }),

  methods: {
    toPatientList: function () {
      this.$router.replace('/patient_list')
    },
    toHomePage: function () {
      this.$router.replace('/Msite')
    },
    toEegAssistant:function (){
      this.$router.replace('/eeg_assistant')
    }
  }
}
</script>
