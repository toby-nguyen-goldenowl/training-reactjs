import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/configureStore';
const DSN = process.env.REACT_APP_SENTRY_DSN;

Sentry.init({
  dsn: DSN,
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
// {
//   /* <Sentry.ErrorBoundary fallback="An error has occurred">
//   <Test />
// </Sentry.ErrorBoundary>; */
// }

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store().store}>
      <PersistGate loading="null" persistor={store().persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
//
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
