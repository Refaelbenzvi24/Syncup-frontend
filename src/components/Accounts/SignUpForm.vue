<template>
  <v-container fluid class="fill">
    <v-container fluid class="fill">
      <v-row class="fill" justify="center">
        <v-form
          @submit.prevent="signUp"
          class="form-wraper"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-container>
            <v-row class="margin-top">
              <v-text-field
                class="round-corners"
                prepend-inner-icon="mdi-account"
                autofocus
                v-model="username"
                :rules="[rules.required]"
                required
                label="Username"
              ></v-text-field>
            </v-row>

            <v-row class="margin-top">
              <v-text-field
                class="round-corners custom-placeholer-color"
                prepend-inner-icon="mdi-email"
                v-model="email"
                :rules="[rules.required, rules.emailValid]"
                :error-messages="this.emailTaken ? 'Email already taken!' : null"
                label="Email"
                required
              ></v-text-field>
            </v-row>

            <v-row class="margin-top">
              <v-text-field
                class="round-corners input-group--focused mb-0"
                v-model="password"
                prepend-inner-icon="mdi-lock"
                :append-icon="show2 ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.min]"
                :type="show2 ? 'text' : 'password'"
                required
                name="input-10-2"
                label="Password"
                hint="At least 8 characters"
                @click:append="show2 = !show2"
              ></v-text-field>
            </v-row>
          </v-container>

          <p class="terms mb-0">
            By clicking the button, I agree to the
            <a
              @click.stop="termsDialog = true"
            >Terms of Service</a> and
            <a @click.stop="privacyDialog = true">Privacy Policy</a>
          </p>
          <v-row justify="center">
            <v-btn
              color="#62A9F5"
              width="95%"
              height="50px"
              x-large
              rounded
              :disabled="!valid"
              class="mr-4 mt-2"
              type="submit"
            >Sign Up</v-btn>
            <v-btn
              color="#878787"
              width="95%"
              height="50px"
              x-large
              text
              outlined
              rounded
              class="mr-4 mt-6"
              @click="googleSignUp"
            >
              <v-img max-width="22px" class="google-icon" src="../../assets/images/Google.png"></v-img>
              <p class="mt-3">Sign Up using Google</p>
            </v-btn>
          </v-row>
        </v-form>
      </v-row>
    </v-container>
    <v-dialog max-width="800" v-model="privacyDialog">
      <v-card>
        <v-container>
          <v-row>
            <v-col>
              <v-card-title>
                <span class="headline">Privacy Policy</span>
              </v-card-title>
            </v-col>
            <v-col justify-end>
              <v-row justify="end">
                <v-icon @click="privacyDialog = false" class="mt-5 mr-5">close</v-icon>
              </v-row>
            </v-col>
          </v-row>
          <LoremIpsum></LoremIpsum>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog max-width="800" v-model="termsDialog">
      <v-card>
        <v-container>
          <v-row>
            <v-col justify-start>
              <v-card-title>
                <span class="headline">Terms of Service</span>
              </v-card-title>
            </v-col>
            <v-col justify-end>
              <v-row justify="end">
                <v-icon @click="termsDialog = false" class="mt-5 mr-5">close</v-icon>
              </v-row>
            </v-col>
          </v-row>
          <LoremIpsum></LoremIpsum>
        </v-container>
      </v-card>
    </v-dialog>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import SignUp from "../../modules/signup"
import LoremIpsum from "../Other/LoremIpsum.vue"
import User from "../../modules/user"

export default {

  name: "SignUpForm",
  components: {
    LoremIpsum
  },

  props: {
    pemail: {
      default: ''
    }
  },

  data: () => ({
    username: "",
    email: "",
    password: "",
    name: "",
    show2: false,
    valid: true,
    overlay: false,
    checkbox: false,
    emailTaken: false,
    privacyDialog: false,
    termsDialog: false,
    SignUp: "",
    rules: {
      required: value => !!value || "This field is required",
      emailValid: v => /.+@.+\..+/.test(v) || "Email must be valid",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    }
  }),

  watch: {
    email: function () {
      this.checkEmail();
    },
    overlay(val) {
      val && setTimeout(() => {
        this.overlay = false
      }, 3000)
    }
  },

  mounted() {
    if (this.pemail)
      this.email = this.pemail
  },

  methods: {
    async signUp() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.overlay = !this.overlay
        this.SignUp = new SignUp(this.username, this.email, this.password)
        const response = await this.SignUp.signUp()
        if (response.user) {
          const user = new User()
          user.saveUserToStore()
          this.$router.push("/app")
        }
      }
    },
    async googleSignUp() {
      this.SignUp = new SignUp(this.username, this.email, this.password)
      const response = await this.SignUp.googleSignUp()
      if (response.user) {
        const user = new User()
        user.saveUserToStore()
        this.$router.push("/app")
      }
    },
    async checkEmail() {
      if (/.+@.+\..+/.test(this.email)) {
        this.SignUp = new SignUp(this.username, this.email, this.password)
        const emailExist = await this.SignUp.emailExist(this.email)
        this.emailTaken = emailExist;
      } else {
        this.emailTaken = false
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
/* .fill {
  width: 100%;
  height: 100%;
  margin: 0;
}

.fill-width {
  width: 100%;
  margin: 0;
} */
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

.google-icon {
  margin-right: 7.5px;
  margin-top: -7.5px;
}

.terms {
  color: #8b8b8b;
  font-size: 13.5px;
}

@media (max-width: 800px) {
  .form-wraper {
    width: 70%;
  }
}
</style>
