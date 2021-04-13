import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/app';
import './App.css';
import RouteConfig, { Routes } from './routes';
import { authUser } from './store/actions/index';
require('dotenv').config();
require('firebase/auth');
function App(props) {
  let { userId } = props;
  const { authUserId } = props;
  useEffect(() => {
    console.log(1);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userId = user.uid;
        authUserId(userId);
      } else {
        userId = undefined;
        authUserId(userId);
      }
    });
  }, [userId]);
  // componentDidMount() {
  //   const { authUserId } = this.props;
  //   let { userId } = this.props;
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       userId = user.uid;
  //       authUserId(userId);
  //     } else {
  //       userId = undefined;
  //       authUserId(userId);
  //     }
  //   });
  // }

  return (
    // const { userId } = this.props;
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="App">
          <div>{RouteConfig({ routes: Routes })}</div>
        </div>
      </Suspense>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  toDoItemsList: state.todo.toDoItemsList,
  newItem: state.todo.newItem,
  userId: state.user.userId,
  loading: state.user.loading,
});

const mapDispatchToProps = {
  authUserId: authUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
