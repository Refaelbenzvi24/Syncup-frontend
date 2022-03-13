<template>
  <v-container>
    <v-row id="top">
      <v-col id="get-started" justify-start align-center>
        <h1>One app to sync them all</h1>
        <h3>Mail, Calendar, Contacts, Apps, etc.</h3>
        <v-form @submit.stop.prevent v-model="valid" lazy-validation>
          <v-row id="email-address-row">
            <v-text-field
              class="email-address-input"
              id="email-address-input"
              v-model="email"
              prepend-inner-icon="mdi-email-outline"
              placeholder="Enter your email address"
              outlined
              :rules="[rules.required, rules.emailValid]"
              solo
              flat
            ></v-text-field>
          </v-row>

          <v-row class="ml-0" align="center">
            <v-btn
              id="get-started-button"
              type="submit"
              :to="
                this.valid
                  ? { name: 'Sign Up', params: { email: email } }
                  : null
              "
              color="#3CADF5"
              height="48px"
              width="135px"
            >Get Started</v-btn>
            <h5>FREE FOREVER NO CREDIT CARD.</h5>
          </v-row>
        </v-form>
      </v-col>

      <v-row id="video" justify="center">
        <v-img id="bubbles" src="../../assets/images/Bubbles.png">
          <v-img id="video-box" width="75%" src="../../assets/images/Video-box.png">
            <v-row id="video-btn-row" justify="center">
              <v-btn
                @click="video_overlay = true"
                color="#39A1F1"
                width="140px"
                height="140px"
                fab
                id="video-btn"
              >
                <v-img
                  id="play-btn"
                  class="ml-2"
                  max-width="50px"
                  src="../../assets/images/Play-btn.png"
                ></v-img>
              </v-btn>
            </v-row>
          </v-img>
        </v-img>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LandingPageContent",

  data: () => {
    return {
      email: "",
      video_overlay: false,
      valid: false,
      rules: {
        required: value => !!value || "This field is required",
        emailValid: v => /.+@.+\..+/.test(v) || "Email must be valid"
      }
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },

  },

  beforeMount() {

    this.valid = false
  }
}
</script>

<style>
#top {
  margin: 0;
}
#get-started {
  max-width: 420px;
  align-self: center;
  margin: 30px 20px 60px 0;
  z-index: 1;
}
#get-started h1 {
  font: Bold 60px "Axiforma Bold";
  width: 420px;
  height: 150px;
  margin-bottom: 10px;
  letter-spacing: 0;
  line-height: 1.3;
}
#get-started h3 {
  color: #606060b8;
  opacity: 1;
  margin-left: 2px;
  margin-bottom: 20px;
}
#get-started h5 {
  margin-left: 10px;
  text-align: left;
  font: 10px "Axiforma Bold";
  letter-spacing: 0.65px;
  color: #6464649c;
  opacity: 1;
  width: 100px;
  height: auto;
}
#email-address-row {
  margin-left: 0px;
  width: 75%;
}
.email-address-input .v-input__slot {
  box-shadow: 2px 5px 30px #00000042;
  opacity: 1;
}
.email-address-input .v-input__control {
  height: 80px;
  min-height: 30px !important;
}
.email-address-input .v-input__slot {
  height: 48px;
  min-height: 30px !important;
  margin-bottom: 0;
}
.email-address-input input {
  font-family: "Axiforma Regular";
  font-size: 14px;
  letter-spacing: 0px;
  color: #494949;
  opacity: 0.7;
}
.email-address-input .v-input__control .v-text-field__details {
  margin-top: 3.5px;
}
.email-address-input .v-input__slot fieldset {
  border-width: 0px !important;
  border-left-width: 5.5px !important;
  border-left-color: #4f91d9 !important;
}
.email-address-input .v-input__icon--prepend-inner .v-icon {
  color: #4f91d9;
}
.email-address-input ::placeholder {
  text-align: left;
  font-family: "Axiforma Regular";
  font-size: 14px;
  letter-spacing: 0;
  color: #787878;
  opacity: 0.64;
}

#get-started-button .v-btn__content {
  align-self: center;
  font-family: Open Sans;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0;
  color: #ffffff;
  opacity: 1;
}
#video {
  width: 32%;
  min-width: 400px;
  margin-top: -5%;
}
#bubbles {
  align-items: center;
}
#video-box {
  margin: auto;
  align-items: center;
}
#video-box .v-image__image {
  box-shadow: 0px 0px 20px #00000038;
}
#video-box .v-responsive__content {
  justify-items: center;
}
#video-btn-row {
  margin: 0;
}
.v-dialog {
  margin: 0 !important;
  width: auto;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}
#video-btn-row #play-btn {
  max-width: 50px;
}

#video-overlay {
  z-index: 1000;
  position: absolute;
}
@media (max-width: 1000px) {
  #get-started {
    margin-left: 40px;
  }
  #video {
    margin-right: 10%;
    margin-left: 10%;
  }
}
@media (max-width: 500px) {
  #get-started h1 {
    font: Bold 50px "Axiforma Bold";
    width: 350px;
    height: 120px;
    line-height: 1.3;
  }
}
@media (max-width: 450px) {
  #get-started {
    margin-left: 10px;
  }
  #get-started h1 {
    font: Bold 40px "Axiforma Bold";
    width: 300px;
    height: 100px;
    line-height: 1.3;
  }
  #get-started h3 {
    font: Bold 16px "Axiforma Bold";
    margin-bottom: 5px;
  }
  #video {
    min-width: 300px;
  }
  #video-box {
    width: 90%;
  }
  #video-btn-row button {
    height: 80px !important;
    width: 80px !important;
  }
  #video-btn-row #play-btn {
    max-width: 30px !important;
  }
}
</style>
