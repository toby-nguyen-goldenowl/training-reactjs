import { createStore } from 'redux';
import { createMigrate, persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers/rootReducer';

const migrations = {
  1: (state) =>
    // migration clear out device state
    ({
      ...state,
      device: undefined,
    }),
  2: (state) =>
    // migration to keep only device state
    ({
      ...state,
      device: true,
    }),
};

const persistConfig = {
  key: 'primary',
  version: 1,
  storage,
  migrate: createMigrate(migrations, { debug: false }),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
};
