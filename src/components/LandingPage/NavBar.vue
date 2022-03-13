  <template>
  <v-navigation-drawer v-model="drawer" app clipped right>
    <v-list>
      <v-list-item @click.stop>
        <v-list-item-title>Product</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-item @click.stop>
        <v-list-item-title>Pricing</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-item @click.stop>
        <v-list-item-title>Learn</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-item @click.stop>
        <v-list-item-title>Templates</v-list-item-title>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-list align="center" justify="end">
        <v-list-item to="/signin">
          <v-list-item-title>Sign In</v-list-item-title>
        </v-list-item>
        <v-list-item class="sign-up" to="/signup">
          <v-list-item-title>Sign Up</v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

  <script>
export default {
  name: "NavBar",
  props: ['trigger'],
  data() {
    return {
      drawer: false,
    }
  },
  watch: {
    trigger: function (newVal) {
      this.drawer = newVal
    }
  }
}
  </script>

<style scoped>
.sign-up {
  background-color: rgba(200, 200, 200, 0.3);
}
</style>