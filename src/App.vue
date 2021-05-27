<template>
  <v-app>
    <head-guide></head-guide>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>


import headGuide from './components/headGuide/headGuide'

export default {
  components: {
    headGuide
  },
}
</script>
