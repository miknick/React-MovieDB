import firebase from "firebase/app"
import "firebase/auth"
const app = firebase.initializeApp({
    apiKey: "AIzaSyDVhhqBnV-eR6CE3Fiw_CHggK78rETiIhw",
    authDomain: "movie-finder-dev.firebaseapp.com",
    projectId: "movie-finder-dev",
    storageBucket: "movie-finder-dev.appspot.com",
    messagingSenderId: "69807167044",
    appId: "1:69807167044:web:489792512be76535cc4e11"

})

export const auth = app.auth()
export default app

