import Vue from "vue"
import Router from "vue-router"

import LandingPage from "./views/LandingPage.vue"
import Accounts from "./views/Accounts.vue"
import MainApp from "./views/MainApp.vue"
import MySyncs from "./views/app/tabs/MySyncs.vue"
import NewSync from "./views/app/NewSyncPage.vue"

// const SignUp = {
//     props: ['id'],
//     template: '<div>SignUp {{ id }}</div>'
// }
// const SignIn = {
//     props: ['id'],
//     template: require('./components/SignUpForm.vue')
// }

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Landing Page",
      component: LandingPage,
    },
    {
      path: "/signup",
      name: "Sign Up",
      component: Accounts,
      props: true,
      meta: {
        auth: true,
        title: "Sign Up",
      },
    },
    {
      path: "/signin",
      name: "Sign In",
      component: Accounts,
      props: true,
      meta: {
        auth: true,
        title: "Sign In",
      },
    },
    {
      path: "/app",
      component: MainApp,
      children: [
        {
          path: "syncs",
          component: MySyncs,
          meta: {
            auth: true,
            title: "My Syncs",
          },
        },
      ],
    },
    {
      path: "/app/newsync",
      component: NewSync,
      meta: {
        auth: true,
        title: "New Sync",
      },
    },
  ],
})
