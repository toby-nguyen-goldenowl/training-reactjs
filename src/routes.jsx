import React, { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import uuid from 'react-uuid';
import { connect } from 'react-redux';
// import All from './Components/All';
// import Active from './Components/Active';
// import Complete from './Components/Complete';
// import Title from './Components/Title';
// import Todo from './Components/todo';
// import SignForm from './Components/SignForm';
// import SignUpForm from './Components/SignUp';
import './connectdb/firebaseConnect';

const AllComponent = lazy(() => import('./Components/All'));
const ActiveComponent = lazy(() => import('./Components/Active'));
const CompleteComponent = lazy(() => import('./Components/Complete'));
const TitleComponent = lazy(() => import('./Components/Title'));
const TodoComponent = lazy(() => import('./Components/todo'));
const SignFormComponent = lazy(() => import('./Components/SignForm'));
const SignUpFormComponent = lazy(() => import('./Components/SignUp'));
const LoadingComponent = lazy(() => import('./Components/Loading'));
const SuccessSignUp = lazy(() => import('./Components/SuccessSignUp'));
const NotSuccessSignUp = lazy(() => import('./Components/NotSuccessSignUp'));

export const Routes = {
  SignIn: {
    path: '/signin',
    component: SignFormComponent,
  },
  SignUp: {
    path: '/signup',
    component: SignUpFormComponent,
    routes: {
      NotSuccessSign: {
        path: '/signup/not-success-signin',
        component: NotSuccessSignUp,
      },
      SuccessSign: {
        path: '/signup/success-signin',
        component: SuccessSignUp,
      },
    },
  },
  Title: {
    path: '/',
    component: TitleComponent,
    auth: false,
    routes: {
      All: {
        path: '/all',
        component: AllComponent,
        auth: true,
        routes: {
          Todo: {
            path: '/all/todo',
            component: TodoComponent,
            auth: true,
          },
        },
      },
      Active: {
        path: '/active',
        component: ActiveComponent,
        auth: true,
        routes: {
          Todo: {
            path: '/active/todo',
            auth: true,
            component: TodoComponent,
          },
        },
      },
      Completed: {
        path: '/completed',
        component: CompleteComponent,
        auth: true,
        routes: {
          Todo: {
            path: '/completed/todo',
            component: TodoComponent,
            auth: true,
          },
        },
      },
    },
  },
};

export default function RouteConfig({ routes }) {
  return (
    <Switch>
      {Object.values(routes).map((route) => {
        if (route.auth) {
          return (
            <Route
              key={uuid()}
              path={route.path}
              render={(props) => (
                // <route.layout>
                // eslint-disable-next-line react/jsx-props-no-spreading
                <User {...props} route={route} />
                // <route.component {...props} >
                //   {route.routes
                //     ? RouteConfig({ routes: route.routes, userId })
                //     : null}
                // </route.component>
                // </route.layout>
              )}
            />
          );
        }
        if (!route.auth) {
          return (
            <Route
              key={uuid()}
              path={route.path}
              render={(props) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <route.component {...props}>
                  {route.routes ? RouteConfig({ routes: route.routes }) : null}
                </route.component>
              )}
            />
          );
        }

        if (!route.auth) {
          return <Redirect to="/aaaaaa" />;
        }
        return null;
      })}
    </Switch>
  );
}

const RouteWapper = (props) => {
  const { route, loading, userId, ...rest } = props;
  if (loading) {
    return <LoadingComponent />;
  }
  if (userId) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <route.component {...rest}>
        {route.routes ? RouteConfig({ routes: route.routes }) : null}
      </route.component>
    );
  }
  return <Redirect to="/signin" />;
};

const mapStateToProps = (state) => ({
  toDoItemsList: state.todo.toDoItemsList,
  newItem: state.todo.newItem,
  userId: state.user.userId,
  loading: state.user.loading,
});

const User = connect(mapStateToProps)(RouteWapper);
