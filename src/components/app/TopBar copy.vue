<template>
  <v-tabs v-model="tab" slider-color="rgb(57, 161, 241)" class="elevation-2">
    <div class="left"></div>
    <v-tab class="tab" to="/app/syncs">My Syncs</v-tab>
    <v-row class="user-button" align="center" justify="end">
      <v-btn v-if="!window500px" dark color="#4D94E0" to="/app/newsync"
        >New Sync</v-btn
      >
      <v-btn v-else x-small fab dark color="#4D94E0" to="/app/newsync">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-menu left class="mt-2" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn small class="mx-2 white--text" fab color="red" v-on="on">
            <v-icon class="mt-1 user-avatar">{{ userName }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="signOut">
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon small>
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
    </v-row>
  </v-tabs>
</template>

<script>
import firebase from "firebase/app"
import User from "../../modules/user"

export default {
  data() {
    return {
      user: "",
      tab: null,
      userName: "",
      signedIn: null,
      hidden: false,
      window500px: null,
    }
  },
  methods: {
    async checkForUser() {
      this.user = await this.$store.state.user
      if (this.user != "no user") {
        this.signedIn = true
        if (this.user.displayName) {
          this.userName = this.user.displayName.charAt(0).toUpperCase()
        }
      } else {
        this.signedIn = false
        this.$router.push({ name: "Landing Page" })
      }
    },
    async signOut() {
      firebase.auth().signOut()
      const user = new User()
      user.refreshData()
      this.$router.push({ name: "Landing Page" })
    },
    checkWindowSize() {
      if (window.innerWidth > 500) {
        this.window500px = false
      } else this.window500px = true
    },
  },

  async beforeMount() {
    this.checkForUser()
    window.addEventListener("resize", this.checkWindowSize())
  },
}
</script>

<style scoped>
.left {
  margin-right: 20%;
}

.tab {
  text-transform: none;
}

.user-button {
  margin-right: 20%;
}

.user-avatar {
  font-family: "Axiforma Regular";
  font-size: 18px !important;
  align-content: center;
  justify-content: center;
}

@media (max-width: 1000px) {
  .user-button {
    margin-right: 15%;
  }
}

@media (max-width: 850px) {
  .left {
    margin-right: 15%;
  }
  .user-button {
    margin-right: 10%;
  }
}

@media (max-width: 600px) {
  .left {
    margin-right: 10%;
  }
  .user-button {
    margin-right: 5%;
  }
}

@media (max-width: 500px) {
  .left {
    margin-right: 0;
  }
  .user-button {
    margin-right: 0;
  }
}
</style>
