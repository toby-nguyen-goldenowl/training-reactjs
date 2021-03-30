import React from 'react';
import { Switch, Route } from 'react-router-dom';
import uuid from 'react-uuid';
import All from './Components/All';
import Active from './Components/Active';
import Complete from './Components/Complete';
import Title from './Components/Title';
import Test from './Components/Test';
export const Routes = [
  {
    path: '/',
    component: Title,
    routes: [
      {
        path: '/all',
        component: All,
      },
      {
        path: '/active',
        component: Active,
        routes: [
          {
            path: '/active/test',
            component: Test,
          },
        ],
      },
      {
        path: '/completed',
        component: Complete,
      },
    ],
  },
];

export default function RouteConfigExample({ routes }) {
  return (
    <Switch>
      {routes.map((route) => (
        <Route
          key={uuid()}
          path={route.path}
          render={(props) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <route.component {...props}>
              {route.routes
                ? RouteConfigExample({ routes: route.routes })
                : null}
            </route.component>
          )}
        />
      ))}
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
