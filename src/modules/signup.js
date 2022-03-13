import Axios from "axios"
const qs = require('querystring')
import firebase from "firebase/app"

export default class SignUp {
    /**
     * 
     * @param {String} username 
     * @param {String} email 
     * @param {String} password 
     */
    constructor(username, email, password) {
        this.username = username
        this.email = email.toLowerCase()
        this.password = password
        this.googleProvider = new firebase.auth.GoogleAuthProvider()
    }


    /**
     * Sign up a user with username, email and password.
     */
    async signUp() {
        const response = await firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password).then((res) => {
                return res
            })
            .catch((error) => {
                return error
            })
        this.user = firebase.auth().currentUser
        await this.user.updateProfile({
            displayName: this.username,
            // photoURL: this.generateAvatar(this.username)
        })
        return response
        //TODO: popup a message if something went wrong.
        //TODO: once user's signed in he needs to first sign out before being able to sign in again

    }

    /**
     * Sign up with google
     */
    async googleSignUp() {
        const response = await firebase
            .auth()
            .signInWithPopup(this.googleProvider).then((res) => {
                return res
            })
        return response
    }

    /**
     * Check if sended email exist in the DB
     * @param {String} email the email to check     
     */
    async emailExist(email) {
        this.exist = false
        this.requestBody = {
            "email": email
        }
        this.config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        await Axios.post("http://127.0.0.1:3000/user/email/exist", qs.stringify(this.requestBody), this.config)
            .then((response) => {
                if (response.data === "email-taken") {
                    this.exist = true
                } else if (response.data === "no-such-email") {
                    this.exist = false
                }
            }).catch(( /**error*/ ) => {
                // console.log(error)
            })
        return this.exist
    }
}




// export default class d {
//     constructor() {
//         this.url = 'http://localhost:8000/signup'
//         this.config = {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         }
//     }

//     signUp(username, email, password) {
//         this.requestBody = {
//             username: username,
//             email: email,
//             password: password
//         }
//         Axios.post(this.url, qs.stringify(this.requestBody), this.config)
//             .then((response) => {
//                 console.log(this.requestBody)
//                 // if (response.status === '202') {
//                 //     console.log('202')
//                 // }
//                 firebase
//                     .auth()
//                     .createUserWithEmailAndPassword(this.email, this.password)
//                     .catch(function(error) {
//                         console.log(error.code)
//                         console.log(error.message)
//                     })
//             })
//     }
// }