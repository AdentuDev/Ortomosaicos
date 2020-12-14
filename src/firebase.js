import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCCTNc5nWYnrkW87bunIF9y5PIhtKjG_i0",
    authDomain: "vistaadentu.firebaseapp.com",
    databaseURL: "https://vistaadentu.firebaseio.com",
    projectId: "vistaadentu",
    storageBucket: "vistaadentu.appspot.com",
    messagingSenderId: "813342508827",
    appId: "1:813342508827:web:13df22dd6e3c1ea17df5be"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db=firebase.firestore()
  const storage=firebase.storage()
export{db}
  export{storage}