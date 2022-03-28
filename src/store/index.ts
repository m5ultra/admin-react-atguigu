import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore } from 'redux-persist'
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
import { rootSagas } from './redux-saga'
const middleware = [sagaMiddleware]

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))
export const persistor = persistStore(store)
sagaMiddleware.run(rootSagas)
