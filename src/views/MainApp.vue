<template>
  <v-container class="app" fluid>
    <TopBar></TopBar>

    <router-view class="page-content"></router-view>
  </v-container>
</template>

<script>
import TopBar from '../components/app/TopBar.vue'

export default {
  name: "app",
  components: {
    TopBar
  }
}
</script>

<style scoped>
.app {
  padding: 0;
}

.page-content {
  width: calc(30% + 500px);
}

@media (max-width: 850px) {
  .page-content {
    width: 100%;
  }
}
</style>