import {applyMiddleware, createStore} from 'redux'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore } from 'redux-persist'
const middleware: any[] = []

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware),))
export const persistor = persistStore(store)
