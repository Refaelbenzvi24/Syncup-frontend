<template>
  <v-container id="landing-page" fluid>
    <v-row>
      <NavBar class="nav-bar" :trigger="this.navBar"></NavBar>
    </v-row>
    <TopBar @navBar="triggerNavBar" id="top-bar"></TopBar>
    <v-container id="landing-page-content">
      <LandingPageContent></LandingPageContent>
    </v-container>
  </v-container>
</template>

<script>
import TopBar from "../components/LandingPage/TopBar.vue"
import LandingPageContent from "../components/LandingPage/LandingPageContent.vue"
import NavBar from "../components/LandingPage/NavBar.vue"
import User from "../modules/user"

export default {
  name: "LandingPage",
  components: {
    TopBar,
    NavBar,
    LandingPageContent
  },
  data() {
    return {
      navBar: false,
      user: "",
      User: new User(),
    }
  },
  async beforeMount() {
    this.user = await this.$store.state.user
    this.setUser()
    this.checkForUser()
  },
  methods: {
    async setUser() {
      this.user = await this.$store.state.user
    },
    async checkForUser() {
      if (await this.User.userSignedIn) {
        this.$router.push("/app")
      }
    },
    triggerNavBar() {
      this.navBar = !this.navBar
    }
  }
}
</script>

<style>
#landing-page {
  padding: 0;
}

#top-bar {
  top: 0;
  position: fixed;
  padding: 0;
  z-index: 2;
}

.nav-bar {
  visibility: hidden;
}

#landing-page-content {
  margin-top: 70px;
  width: calc(28% + 600px);
  padding: 0;
}

@media (max-width: 1000px) {
  .nav-bar {
    visibility: visible;
  }
}

@media (max-width: 950px) {
  #landing-page-content {
    width: 100%;
  }
}
</style>
