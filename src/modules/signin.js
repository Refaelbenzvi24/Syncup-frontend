import firebase from "firebase/app"

export default class SignIn {
    /**
     * 
     * @param {String} email 
     * @param {String} password 
     */
    constructor(email = "", password = "") {
        this.email = email.toLowerCase()
        this.password = password
        this.googleProvider = new firebase.auth.GoogleAuthProvider()
    }



    /**
     * Sign up a user with username, email and password.
     */
    async signIn() {
        const response = await firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password).then((res) => {
                return res
            })
            .catch(function(error) {
                if (error.message === "The password is invalid or the user does not have a password.") {
                    return error.message
                }
            })
        return response
        //TODO: popup a message if something went wrong...
        //TODO: once user's signed in he needs to first sign out before being able to sign in again
    }

    /**
     * Sign up with google
     */
    async googleSignIn() {
        const request = await firebase
            .auth()
            .signInWithPopup(this.googleProvider).then((res) => {
                if (res.user) {
                    return true
                } else return false
            })
        return request
    }
}


// export default class SignIn {
//     constructor() {
//         this.url = 'http://localhost:8000/signin'
//         this.config = {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         }
//     }

//     signIn(username, email, password) {
//         this.requestBody = {
//             username: username,
//             email: email,
//             password: password
//         }
//         Axios.post(this.url, qs.stringify(this.requestBody), this.config)
//             .then((response) => {
//                 console.log(this.requestBody)
//                 if (response.status === '202') {
//                     console.log('202')
//                 }
//             })
//     }
// }