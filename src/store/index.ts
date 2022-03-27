import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import storageSession from 'redux-persist/lib/storage/session'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
const persistConfig = {
  key: 'test',
  storage,
}
// TODO 拆分
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, composeWithDevTools())
export const persistor = persistStore(store)


