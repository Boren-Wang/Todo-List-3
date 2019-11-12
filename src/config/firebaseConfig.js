import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAOp7Nu8wh8zsBCGb-XHN_86zcWPS5HpBo",
    authDomain: "todo-list-fa720.firebaseapp.com",
    databaseURL: "https://todo-list-fa720.firebaseio.com",
    projectId: "todo-list-fa720",
    storageBucket: "todo-list-fa720.appspot.com",
    messagingSenderId: "1092727000858",
    appId: "1:1092727000858:web:eb0a2aa18c26a195e926a3",
    measurementId: "G-81XMEV6J53"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;