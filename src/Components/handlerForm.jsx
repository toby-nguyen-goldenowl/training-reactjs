import './HandlerForm.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import '../connectdb/firebaseConnect';
import { sha256 } from 'js-sha256';

export const HandleFormSignup = (values) => {
  const { email } = values;
  const password = sha256(values.password);
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((value) => {
      const dataUser = firebase.database().ref(`users/${value.user.uid}`);
      dataUser.set({
        email,
        password,
      });
      window.location = '/signup/success-signin';
    })
    .catch(() => {
      window.location = '/signup/not-success-signin';
    });
};

export const HandleFormSignin = (values) => {
  const { email } = values;
  const password = sha256(values.password);
  const dataToDo = firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (result) => {
      const dataUser = firebase.database().ref(`users/${result.user.uid}`);
      const data = await dataUser
        .once('value')
        .then((snapshot) => snapshot.val().todo);
      return data;
    })
    .catch(() => {
      // window.location = '/signin';
    });
  return dataToDo;
  // firebase.auth().onAuthStateChanged((user) => {
  //   // const userKey = Object.keys(window.localStorage).filter((it) =>
  //   //   it.startsWith('persist:primary'),
  //   // )[0];
  //   // const local = userKey
  //   //   ? JSON.parse(localStorage.getItem(userKey))
  //   //   : undefined;

  //   // console.log(JSON.parse(local.todo));
  //   // console.log(userKey);
  //   // console.log(user);
  //   if (user) {
  //     // window.location = '/all/todo';
  //   }
  // });
};
