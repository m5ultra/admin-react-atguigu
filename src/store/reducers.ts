import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import storageSession from 'redux-persist/lib/storage/session'

const persistConfig = {
  key: 'num',
  storage,
  whitelist: ['num'],
  version: 1.2,
}
const persistConfig2 = {
  key: 'num',
  storage: storageSession,
  blacklist: ['num'],
  version: 1.3,
}
// TODO 拆分
import { combineReducers } from 'redux'
import { reducer as home } from '../pages/home/store'
import { reducer as b } from './b_module'
const homeReducer = persistReducer(persistConfig, home)
const persistedReducerB = persistReducer(persistConfig2, b)
export default combineReducers({
  home: homeReducer,
  b: persistedReducerB,
})
