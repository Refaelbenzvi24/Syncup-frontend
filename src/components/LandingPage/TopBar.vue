<template>
  <v-container class="main" align-center fluid>
    <v-app-bar
      id="app-bar"
      :color="color"
      elevate-on-scroll
      shrink-on-scroll
      height="80px"
      min-height="40px"
      max-height="80px"
    >
      <v-container justify-center align-center id="top-bar-content">
        <v-row align="center" justify="start" class="icon-container">
          <a class="icon" href="/">
            <v-img max-width="124px" src="../../assets/images/SyncUp-icon.png"></v-img>
          </a>
        </v-row>

        <v-row align="center" class="top-bar-items">
          <v-row align="center" justify="start">
            <v-btn width="95px" min-height="30px" max-height="40px" text>
              <a class="top-bar-item">Product</a>
            </v-btn>
            <v-btn width="90px" min-height="30px" max-height="40px" text>
              <a class="top-bar-item">Pricing</a>
            </v-btn>
            <v-btn width="85px" min-height="30px" max-height="40px" text>
              <a class="top-bar-item">Learn</a>
            </v-btn>
            <v-btn width="110px" min-height="30px" max-height="40px" text>
              <a class="top-bar-item">Templates</a>
            </v-btn>
          </v-row>

          <v-row align="center" justify="end">
            <v-btn width="90px" max-height text>
              <router-link class="top-bar-item" to="/signin">Sign in</router-link>
            </v-btn>
            <div class="mr-2"></div>
            <v-btn
              width="90px"
              min-height="30px"
              max-height="40px"
              :color="tBarButtColor"
              depressed
            >
              <router-link class="top-bar-item" to="/signup">Sign up</router-link>
            </v-btn>
          </v-row>
        </v-row>

        <v-row id="nav-icon" justify="end" align="center">
          <a @click="navBarTrigger" class="icon">
            <v-img max-width="25px" src="../../assets/images/Drawer-icon.png"></v-img>
          </a>
          <!-- <v-btn color="transparen" max-width="30px" max-height="30px" icon>
            <v-img max-width="25px" src="../assets/images/Drawer-icon.png"></v-img>
          </v-btn>-->
        </v-row>
      </v-container>
    </v-app-bar>
  </v-container>
</template>

<script>  

export default {
  name: "TopBar",
  data() {
    return {
      user: "",
      navBar: false,
      color: "transparent",
      on: false,
      tBarButtColor: "rgba(200, 200, 200, 0.3)"
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
      }
    },
    handleScroll() {
      if (document.documentElement.scrollTop === 0) {
        this.color = "transparent"
        this.tBarButtColor = "rgba(200, 200, 200, 0.3)"
      } else {
        this.tBarButtColor = "#6ebdef"
        this.color = "white"
        //TODO: once user signed in replace with user deitails
        //NOTE: make compatble with phones
      }
    },
    navBarTrigger() {
      this.$emit('navBar')
    }
  },

  beforeMount() {
    this.checkForUser()
  },

  created() {
    window.addEventListener("scroll", this.handleScroll)
    window.addEventListener("scroll", () => {
      if (window.innerWidth) {
        //
      }
    })
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll)
  }
}
</script>

<style scoped>
.main {
  z-index: 2;
}

#app-bar {
  align-content: center;
}

#top-bar-content {
  margin-top: auto;
  margin-bottom: auto;
  padding: 0;
  width: calc(28% + 600px);
  justify-content: space-between;
  display: -webkit-box;
  min-height: 40px;
  max-height: 50px;
}

.top-bar-items {
  align-self: center;
  width: 100%;
  justify-content: space-between;
  padding-left: calc(50% - 200px);
  max-width: 1080px;
}

.icon {
  margin-left: 5px;
  height: 100%;
}

.user-avatar {
  font-family: "Axiforma Regular";
  font-size: 18px !important;
  align-content: center;
  justify-content: center;
}

.top-bar-item {
  text-align: left;
  font: 14.5px "Axiforma Bold";
  letter-spacing: 0;
  color: #222222;
  text-decoration: none;
}
#nav-icon {
  visibility: hidden;
}

@media (max-width: 1000px) {
  .top-bar-items {
    visibility: hidden;
  }

  #nav-icon {
    visibility: visible;
  }
}
</style>
