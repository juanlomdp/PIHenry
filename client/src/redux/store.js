import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducer'
import thunkiddleware from 'redux-thunk'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // conecta la extensio

const store = createStore(rootReducer,
  composeEnhancer(applyMiddleware(thunkiddleware)) // hace peticiones al servidor
)

export default store
