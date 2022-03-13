<template>
  <v-app-bar dense>
    <v-btn @click="goBack" icon>
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <div class="left"></div>
    <v-toolbar-title class="mt-1 page-title">New Sync</v-toolbar-title>
    <v-row class="user-button" align="center" justify="end">
      <v-menu class="mt-2" offset-y left>
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
  </v-app-bar>
</template>

<script>
import firebase from "firebase/app"
import User from "../../../modules/user"

export default {
  name: "newsync",
  components: {},
  data() {
    return {
      user: "",
      userName: "",
      signedIn: null
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async checkForUser() {
      this.user = await this.$store.state.user
      if (this.user != "no user") {
        this.signedIn = true
        if (this.user.displayName) {
          this.userName = this.user.displayName.charAt(0).toUpperCase()
        }
      } else {
        this.signedIn = false
        this.$router.push("/")
      }
    },
    async signOut() {
      firebase.auth().signOut()
      const user = new User()
      user.refreshData()
      this.checkForUser()
    }
  },

  async beforeMount() {
    this.checkForUser()
  }
}
</script>


<style scoped>
.page-title {
  font-family: "Axiforma Regular" !important;
  font-size: 24px;
  color: rgb(95, 95, 95);
}

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