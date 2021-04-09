import React from 'react';
import { Formik } from 'formik';
import './HandlerForm.css';
import 'firebase/database';
import 'firebase/auth';
import '../connectdb/firebaseConnect';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadData } from '../store/actions/index';
import { HandleFormSignin } from './handlerForm';

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
