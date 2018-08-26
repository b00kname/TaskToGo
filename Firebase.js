import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'

var config = {
    apiKey: "AIzaSyDG4GzUOBrpt9dr3VdiUZSpr5TY9dzm7N4",
    authDomain: "tasktogoo.firebaseapp.com",
    databaseURL: "https://tasktogoo.firebaseio.com",
    projectId: "tasktogoo",
    storageBucket: "tasktogoo.appspot.com",
    messagingSenderId: "682989888050"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
