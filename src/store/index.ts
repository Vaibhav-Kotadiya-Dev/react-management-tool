import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import user from './User'

const reducers = combineReducers({
  user,
})

const store = configureStore({
  reducer: reducers,
})

setupListeners(store.dispatch)

export { store }
