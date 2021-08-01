import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
 
import rootReducer from "./rootReducer";
 
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
};
 
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);