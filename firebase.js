import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyBMehQHCz80oxb5gp4O-uwOHvgVv6-7LqM",
    authDomain: "snapchat-clone-c20c5.firebaseapp.com",
    projectId: "snapchat-clone-c20c5",
    storageBucket: "snapchat-clone-c20c5.appspot.com",
    messagingSenderId: "2093547723",
    appId: "1:2093547723:web:f7b68159fdeae538cedb4e"
  };
const firebaseApp= firebase.initializeApp(firebaseConfig);
const db= firebaseApp.firestore();//database.
const auth= firebase.auth();//auth->we know it is for signIn signOut purpose.
const storage= firebase.storage();//This will store data and api stuff.
const provider= new firebase.auth.GoogleAuthProvider();//This is going to call cell for sign in.
export {db, auth, storage, provider};
export default firebase;