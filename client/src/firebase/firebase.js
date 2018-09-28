// Initialize Firebase
var config = {
  apiKey: "AIzaSyAFesXsHYDuCOYndz6uW5jPGnr6ckNjl9M",
  authDomain: "hacktiveoverflow.firebaseapp.com",
  databaseURL: "https://hacktiveoverflow.firebaseio.com",
  projectId: "hacktiveoverflow",
  storageBucket: "hacktiveoverflow.appspot.com",
  messagingSenderId: "621548392274"
};
firebase.initializeApp(config);
var db = firebase.database()

export default db