import React from 'react';
import { Formik } from 'formik';
import './HandlerForm.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import '../../configdb/firebaseConfig';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sha256 } from 'js-sha256';
import { loadData } from '../../store/actions/index';

const HandleFormSignin = (values) => {
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

const SignForm = (props) => {
  const { loadDatas } = props;
  return (
    <>
      <div>
        <h1>Sign In</h1>
        <Formik
          initialValues={{ email: '', password: '', isLoggedIn: false }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            values.isLoggedIn = true;
            HandleFormSignin(values)
              .then((result) => loadDatas(result))
              .then(() => {
                window.location = '/all/todo';
              });
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <div className="container">
              <form className="form-login" onSubmit={handleSubmit}>
                <div className=".form-content">
                  <label htmlFor="email">
                    Email:
                    <input
                      id="email"
                      className="ipemail"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </label>
                  {errors.email && touched.email && errors.email}
                  <label htmlFor="pwd">
                    Password:
                    <input
                      id="pwd"
                      className="ippassword"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </label>
                  <div>
                    <Link to="/signup" className="MyLink">
                      Sign Up
                    </Link>
                  </div>
                  {errors.password && touched.password && errors.password}
                  <button
                    className="btnSubmit"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  loadDatas: loadData,
};

export default connect(null, mapDispatchToProps)(SignForm);

// export default SignForm;
