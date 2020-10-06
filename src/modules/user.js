import firebase from "firebase/app"
import store from "../store/index"


export default class User {
    /**
     * Handle user data.
     * @param {Object} options 
     */
    constructor(options = {}) {
        if (!User.instance) {
            options ? this.initializeUser(options) : null
            User.instance = this;
        }

        return User.instance;
    }

    /**
     * Initizlize the class.
     * @param {Object} options 
     */
    initializeUser(options) {
        options.saveUserToStore ? this.saveUserToStore() : null
        options.saveUserBool ? this.saveUserBool() : null
    }

    refreshData() {
        this.saveUserToStore()
        this.saveUserBool()
    }

    /**
     * save current user to vue store.
     */
    async saveUserToStore() {
        store.commit('setUser', this.currentUser())

    }

    async saveUserBool() {
        this.userSignedIn = this.checkForUser()
    }

    /**
     * return the user if exist.
     * @returns {Object} user.
     */
    async currentUser() {
        const user = await new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(async (user) => {
                if (user) {
                    resolve(user, true)
                } else {
                    reject("no user", false)
                }
            })
        }).then((res) => {
            return res
        }).catch((error, ) => {
            return error
        })
        return user
    }

    async checkForUser() {
        const user = await new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(async (user) => {
                if (user) {
                    resolve(true)
                } else {
                    reject(false)
                }
            })
        }).then((res) => {
            return res
        }).catch((error, ) => {
            return error
        })
        return user
    }
}