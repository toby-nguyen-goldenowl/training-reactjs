import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import '../../configdb/firebaseConfig';

function clickLogOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(() => {
      // An error happened.
    });
}

export default function LogOut() {
  return (
    <>
      <button type="button" onClick={clickLogOut}>
        Log out
      </button>
    </>
  );
}
