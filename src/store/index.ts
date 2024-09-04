import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import user from './User'

const persistConfig = {
  key: 'root',
  storage,
}

const combinedReducer = combineReducers({
  user,
})

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET') {
     state = {};
  }
  return combinedReducer(state, action);
 };

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
  reducer: persistedReducer,
})

setupListeners(store.dispatch)

const persistor = persistStore(store)

export { store, persistor }
