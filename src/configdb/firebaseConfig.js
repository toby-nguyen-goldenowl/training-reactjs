import firebase from 'firebase/app';
import 'firebase/database';
// import * as firebaseui from 'firebaseui';

require('firebase/auth');
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'todoapp-e2276.firebaseapp.com',
  projectId: 'todoapp-e2276',
  storageBucket: 'todoapp-e2276.appspot.com',
  messagingSenderId: '51771712713',
  appId: '1:51771712713:web:52693a2a4285a78f66d918',
  measurementId: 'G-0E990KRQQY',
};
const firebaseConnect = firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

// const ui = new firebaseui.auth.AuthUI(firebase.auth());
// ui.start('#firebaseui-auth-container', {
//   signInOptions: [
//     {
//       provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
// eslint-disable-next-line max-len
//       signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
//     },
//   ],
//   // Other config options...
// });
// Initialize Firebase
export default { firebaseConnect };
// import firebase from 'firebase/app';
// import 'firebase/database';
// const dataLink = 'user1';
// const data = firebase.database().ref(`users/${dataLink}`);
// data.once('value').then((snapshot) => {
//   console.log(snapshot);
// });
// console.log(firebase.auth());
