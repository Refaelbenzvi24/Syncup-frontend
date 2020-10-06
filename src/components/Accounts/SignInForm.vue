<template>
  <v-container class="fill">
    <v-container fluid class="fill">
      <v-row class="fill" justify="center">
        <v-form class="form-wraper">
          <v-form @submit.prevent="signIn" ref="form" v-model="valid" lazy-validation>
            <v-container>
              <v-row class="margin-top">
                <v-text-field
                  class="round-corners"
                  ref="email"
                  prepend-inner-icon="mdi-account"
                  autofocus
                  v-model="email"
                  :rules="[rules.required, rules.emailValid]"
                  required
                  label="Email"
                ></v-text-field>
              </v-row>

              <v-row class="margin-top">
                <v-text-field
                  class="round-corners input-group--focused"
                  ref="password"
                  v-model="password"
                  prepend-inner-icon="mdi-lock"
                  :append-icon="show2 ? 'visibility' : 'visibility_off'"
                  :type="show2 ? 'text' : 'password'"
                  :rules="[rules.required]"
                  name="input-10-2"
                  label="Password"
                  @click:append="show2 = !show2"
                ></v-text-field>
              </v-row>
            </v-container>

            <v-row justify="end">
              <v-btn
                color="#62A9F5"
                width="95%"
                height="50px"
                x-large
                rounded
                :disabled="!valid"
                class="mr-4 mt-2"
                type="submit"
              >Sign In</v-btn>
              <v-btn
                color="#878787"
                width="95%"
                height="50px"
                x-large
                text
                outlined
                rounded
                class="mr-4 mt-6"
                @click="googleSignIn"
              >
                <v-img max-width="22px" class="google-icon" src="../../assets/images/Google.png"></v-img>
                <p class="mt-3">Sign In using Google</p>
              </v-btn>
            </v-row>
          </v-form>
        </v-form>
      </v-row>
    </v-container>
    <v-dialog max-width="460" v-model="dialog">
      <v-card>
        <v-container>
          <v-row>
            <v-col justify-start>
              <v-card-title class="pl-0">
                <span class="headline red--text">Error:</span>
              </v-card-title>
            </v-col>
            <v-col class justify-end>
              <v-row justify="end">
                <v-icon @click="dialog = false" class="mt-5 mr-5">close</v-icon>
              </v-row>
            </v-col>
          </v-row>
          <v-card-text class="text">
            The password is invalid or this email
            <br />already used with google sign up method
            <br />if so please try sign in using google.
            <br />If you want you can add
            password option later.
            <br />We can also redirect you after sign in
            by clicking
            <a href>here...</a>
            <br />If you encountering this error again
            <br />please let us
            know at
            <a href="SyncUp@support.com">SyncUp@support.com</a>.
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import SignIn from "../../modules/signin"
import User from "../../modules/user"

export default {
  name: "SignUpForm",
  props: {
    pemail: {
      default: ""
    }
  },
  data: () => ({
    overlay: false,
    dialog: false,
    show2: false,
    valid: true,
    username: "",
    password: "",
    name: "",
    email: "",
    checkbox: false,
    lazy: false,
    SignIn: new SignIn(),
    User: new User(),
    rules: {
      required: value => !!value || "This field is required",
      emailMatch: () => "The email and password you entered don't match",
      emailValid: v => /.+@.+\..+/.test(v) || "Email must be valid"
    }
  }),
  mounted() {
    if (this.pemail)
      this.email = this.pemail
  },
  watch: {
    dialog() {
      if (this.dialog === false) {
        this.overlay = false
      }
    }
  },
  methods: {
    async signIn() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.overlay = !this.overlay
        this.SignIn = new SignIn(this.email, this.password)
        const response = await this.SignIn.signIn()
        if (!response) {
          this.snackbar = false
          this.overlay = false
        }
        else if (response.user) {
          const user = new User()
          user.saveUserToStore()
          this.$router.push("/app")

        }
        else if (
          response ===
          "The password is invalid or the user does not have a password."
        ) {
          this.dialog = true
        }
      }
    },
    async googleSignIn() {
      let response
      try {
        response = await this.SignIn.googleSignIn()
      } catch (error) {
        //error
      }
      if (response === true) {
        const user = new User()
        user.saveUserToStore()
        this.$router.push("/app")
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style scoped>
.fill {
  width: 100%;
  height: 100%;
  margin: 0;
}

.fill-width {
  width: 100%;
  margin: 0;
}
.form-wraper {
  width: 40%;
}
.margin-top {
  margin-top: 20px;
}
input {
  text-transform: uppercase;
}
.round-corners {
  border-radius: 50px;
}

.text {
  font-size: 16px;
  color: #5a5a5a;
  font-family: "Roboto", sans-serif;
}

.google-icon {
  margin-right: 7.5px;
  margin-top: -7.5px;
}

@media (max-width: 800px) {
  .form-wraper {
    width: 70%;
  }
}
</style>
