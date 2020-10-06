<template>
  <v-container fluid class="fill-height">
    <v-app-bar v-if="!leftSide">
      <v-row align="center" id="top-bar">
        <a href="/">
          <v-img id="icon-top-bar" max-width="140px" src="../assets/images/Icon white.png"></v-img>
        </a>
      </v-row>
    </v-app-bar>

    <v-container fluid class="fill-height" v-if="state">
      <v-col v-if="leftSide" justify-start id="left-side">
        <a href="/">
          <v-img id="icon" max-width="140px" src="../assets/images/Icon white.png"></v-img>
        </a>
      </v-col>
      <v-col class="fill" align-start justify-center>
        <v-row class="title-row" justify="center" align="center">
          <h1 class="main-title mr-5">Sign Up</h1>
          <h1 class="mr-5 title-or">or</h1>
          <a @click="state = !state" class="second-title">Sign In</a>
        </v-row>

        <v-row class="form" justify="center">
          <SignUpForm :pemail="this.email"></SignUpForm>
        </v-row>
      </v-col>
    </v-container>

    <v-container fluid class="fill-height" v-if="!state">
      <v-col v-if="leftSide" justify-start id="left-side">
        <a href="/">
          <v-img id="icon" max-width="140px" src="../assets/images/Icon white.png"></v-img>
        </a>
      </v-col>

      <v-col class="fill" align-start justify-center>
        <v-row class="title-row" justify="center" align="center">
          <a @click="state = !state" class="second-title mr-5">Sign Up</a>
          <h1 class="mr-5 title-or">or</h1>
          <h1 class="main-title">Sign In</h1>
        </v-row>

        <v-row class="form" justify="center">
          <SignInForm :pemail="this.email"></SignInForm>
        </v-row>
      </v-col>
    </v-container>
  </v-container>
</template>

<script>
import SignUpForm from "../components/Accounts/SignUpForm.vue"
import SignInForm from "../components/Accounts/SignInForm.vue"
import SignUp from "../modules/signup"
import User from "../modules/user"

export default {
  name: "Accounts",
  props: {
    email: { default: "" }
  },
  components: {
    SignUpForm,
    SignInForm
  },
  data() {
    return {
      state: false, //sign in or sign up 
      leftSide: true,
      User: new User()
    }
  },
  methods: {

    async checkEmail() {
      if (this.email != "") {
        this.SignUp = new SignUp("", this.email, "")
        const emailExist = await this.SignUp.emailExist(this.email)
        if (emailExist === false) {
          this.state = true
        } else {
          this.state = false
        }
      }
    },

    checkWindowsSize() {
      if (window.innerWidth > 1300) {
        this.leftSide = true
      } else this.leftSide = false
    },

    checkHref() {
      if (window.location.href.includes("signup")) {
        this.state = true
      } else this.state = false
    },

    changeHref() {
      if (this.state === true) {
        window.history.pushState("", "", "signup")
        document.title = "Sign Up"
      } else {
        window.history.pushState("", "", "signin")
        document.title = "Sign In"
      }
    },

    async checkForUser() {
      if (await this.User.userSignedIn) {
        this.$router.push("/app")
      }
    }
  },

  watch: {
    state: function () {
      this.changeHref()
    }
  },

  beforeMount() {
    this.checkEmail()
    this.checkForUser()
    this.user = this.$store.state.user
  },

  async mounted() {
    this.checkWindowsSize()
    window.addEventListener("resize", () => {
      this.checkWindowsSize()
    })
    this.checkHref()
  }
}
</script>

<style scoped>
.main-title {
  color: white;
  text-align: center;
  font-weight: normal;
  font-size: 60px;
  color: #5c5c5c !important;
  letter-spacing: 0;
}

.form {
  margin-top: 20px;
}

#icon {
  margin-left: 20px;
  margin-top: 12.5px;
}

.second-title {
  color: white;
  text-align: center;
  font-weight: normal;
  text-decoration: underline;
  color: #1b83e4;
  font-size: 30px;
  letter-spacing: 0;
}

.title-or {
  color: white;
  text-align: center;
  font-weight: normal;
  font: Regular 69px/91px Segoe UI;
  color: #6b6b6b;
  font-size: 30px;
  letter-spacing: 0;
}

.border {
  border: dotted;
}

.fill-height {
  height: 100%;
  padding: 0;
}

.fill {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}

#top-bar {
  align-self: flex-start;
  height: 75px;
  width: 100%;
  right: 0;
  left: 0;
  margin: 0;

  background: linear-gradient(
    90deg,
    rgba(39, 110, 186, 1) 0%,
    rgba(57, 162, 221, 1) 50%,
    rgba(88, 173, 255, 1) 100%
  );
}

#left-side {
  align-self: flex-start;
  height: 100%;
  max-width: 35%;

  align-self: center;
  background: linear-gradient(
    90deg,
    rgba(39, 110, 186, 1) 0%,
    rgba(57, 162, 221, 1) 50%,
    rgba(88, 173, 255, 1) 100%
  );
}

.title-row {
  margin-top: 140px;
}

.fill-page {
  height: 100%;
  width: 100%;
}

@media (max-width: 1300px) {
  #icon-top-bar {
    width: 125px;
    margin-left: 10%;
  }
  .main-title {
    font-size: 45px;
  }
  .title-row {
    margin-top: 80px;
  }

  .form {
    margin-top: 0;
  }
}
</style>
