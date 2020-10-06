<template>
  <v-app>
    <MainDrawer></MainDrawer>
    <!-- <YoutubeTemplate></YoutubeTemplate> -->
  </v-app>
</template>

<script>
import MainDrawer from './components/Other/MainDrawer.vue'

export default {
  name: 'app',
  components: {
    MainDrawer
  },
  created() {
    this.$vuetify.theme.dark = false
  },
  watch: {
    '$route'(to) {
      document.title = to.meta.title || 'SyncUp&trade; | One app to sync them all'

    }
  }
}
</script>

<style>
@font-face {
  font-family: "Axiforma Regular";
  src: url(assets/fonts/Axiforma-Regular.woff) format("woff");
}

@font-face {
  font-family: "Axiforma Bold";
  src: url(assets/fonts/Axiforma-Bold.woff) format("woff");
}

* {
  padding: 0;
  text-transform: none;
}

#app {
  font-family: "Axiforma Bold", sans-serif, Arial, Helvetica;
  font-weight: bold;
}
</style>
