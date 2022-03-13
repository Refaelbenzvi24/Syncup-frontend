<template>
  <v-container class="app" fluid>
    <TopBar></TopBar>

    <v-container class="page-content"></v-container>
  </v-container>
</template>

<script>
import TopBar from "../../components/app/NewSyncPage/TopBar.vue"

export default {
  name: "newsync",
  components: {
    TopBar,
  },
  methods: {
    a() {},
  },
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
