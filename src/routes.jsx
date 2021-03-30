import React from 'react';
import { Switch, Route } from 'react-router-dom';
import uuid from 'react-uuid';
import All from './Components/All';
import Active from './Components/Active';
import Complete from './Components/Complete';
import Title from './Components/Title';
import Todo from './Components/todo';
export const Routes = {
  Title: {
    path: '/',
    component: Title,
    routes: {
      All: {
        path: '/all',
        component: All,
        routes: {
          Todo: {
            path: '/all/todo',
            component: Todo,
          },
        },
      },
      Active: {
        path: '/active',
        component: Active,
        routes: {
          Todo: {
            path: '/active/todo',
            component: Todo,
          },
        },
      },
      Completed: {
        path: '/completed',
        component: Complete,
        routes: {
          Todo: {
            path: '/completed/todo',
            component: Todo,
          },
        },
      },
    },
  },
};

export default function RouteConfig({ routes }) {
  return (
    <Switch>
      {Object.values(routes).map((route) => (
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
      ))}
      {/* {Object.values.map((route) => (
        <Route
          key={uuid()}
          path={route.path}
          render={(props) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <route.component {...props}>
              {route[routes] ? RouteConfig({ routes: route.routes }) : null}
            </route.component>
          )}
        />
      ))} */}
    </Switch>
  );
}

// export function showContentMenus(routes) {
//   let result = null;
//   if (routes.length > 0) {
//     result = routes.map((route) => (
//       <Route path={route.path} exact component={route.component} />
//     ));
//   }
//   return result;
// }
