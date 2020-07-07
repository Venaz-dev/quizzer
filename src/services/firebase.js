import firebase from 'firebase'

const config ={
    apiKey: "AIzaSyCIJboSjoUnSvrpc2ONldzLD0KcRppJpJk",
    authDomain: "venaz-quizzer-app.firebaseapp.com",
    databaseURL: "https://venaz-quizzer-app.firebaseio.com"
}

firebase.initializeApp(config)

export const auth = firebase.auth
export const db = firebase.database()