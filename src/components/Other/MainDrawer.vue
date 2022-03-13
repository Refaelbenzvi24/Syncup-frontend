<template>
  <v-container fluid id="main-drawer">
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  name: "MainDrawer",
  components: {},
  watch: {
    // '$route'(to, from) {
    //   document.title = to.meta.title || `SyncUp&trade; | One app to sync them all`
    // }
  },
}
</script>

<style scoped>
#main-drawer {
  height: 100%;
  padding: 0;
}

#top-bar {
  position: fixed;
  padding: 0;
  z-index: 2;
}

/* #main {
  margin-top: 70px;
  width: calc(28% + 600px);
  padding: 0;
} */

/* .bg {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("../assets/archive/91297@2x.png") no-repeat;
  background-position: left;
  background-size: cover;
  background-clip: border-box;
  transform: scale(1);
} */
</style>
