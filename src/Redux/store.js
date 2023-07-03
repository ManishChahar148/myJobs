import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import rootSaga from './rootSaga';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
    // blacklist: ['jobs']
  }

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(persistedReducer, applyMiddleware(...[ ...( (process.env.NODE_ENV !== 'production' && [logger]) || [] ), sagaMiddleware ]));
export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga);
