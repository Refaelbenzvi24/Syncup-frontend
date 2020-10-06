<template>
  <v-container fluid class="fill-height">
    <v-container fluid class="fill-height" v-if="state">
      <v-col justify-start id="left-side">
        <a href="/">
          <v-img id="icon" max-width="140px" src="../assets/images/Icon white.png"></v-img>
        </a>
      </v-col>

      <v-col class="fill" align-start justify-center>
        <v-row class="title-row" justify="center" align="center">
          <h1 class="main-title mr-5">Sign Up</h1>
          <h1 class="mr-5 title-or">or</h1>
          <a @click="changeTitle" class="second-title">Sign In</a>
        </v-row>

        <v-row class="form" justify="center">
          <SignUpForm></SignUpForm>
        </v-row>
      </v-col>
    </v-container>
    <v-container fluid class="fill-height" v-if="!state">
      <v-col justify-start id="left-side">
        <a href="/">
          <v-img id="icon" max-width="140px" src="../assets/images/Icon white.png"></v-img>
        </a>
      </v-col>

      <v-col class="fill" align-start justify-center>
        <v-row class="title-row" justify="center" align="center">
          <a @click="changeTitle" class="second-title mr-5">Sign Up</a>
          <h1 class="mr-5 title-or">or</h1>
          <h1 class="main-title">Sign In</h1>
        </v-row>

        <v-row class="form" justify="center">
          <SignInForm></SignInForm>
        </v-row>
      </v-col>
    </v-container>
  </v-container>
</template>

<script>
import SignUpForm from "../components/SignUpForm.vue";
import SignInForm from "../components/SignInForm.vue"

export default {
  name: "SignUp",
  components: {
    SignUpForm,
    SignInForm
  },
  data() {
    return {
      signup: true
    };
  },
  methods: {
    changeTitle() {
      this.signup = !this.signup;
    }
  },
  props: {
    state: Boolean
  }
};
</script>

<style>
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

#left-side {
  max-width: 35%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(39, 110, 186, 1) 0%,
    rgba(57, 162, 221, 1) 50%,
    rgba(15, 225, 255, 1) 100%
  );
}

.title-row {
  margin-top: 140px;
}

#icon {
  margin-left: 20px;
  margin-top: 12.5px;
}

.fill-page {
  height: 100%;
  width: 100%;
}
</style>