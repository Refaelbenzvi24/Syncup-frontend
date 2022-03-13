<template>
  <v-navigation-drawer v-model="drawer" width="240px" color="#ECECEC" app clipped>
    <v-list color="#c8c8c8">
      <v-list-item link three-line>
        <v-img class="title-image" max-width="60%" src="../../assets/archive/Sync app@2x.png"></v-img>
      </v-list-item>
    </v-list>

    <v-list nav>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-sync</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Sync-now</v-list-item-title>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-chart-line-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Status</v-list-item-title>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-list>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'navBar',
}
</script>

<style scoped>
.title-image {
  left: 15%;
}
</style>