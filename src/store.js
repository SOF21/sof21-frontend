import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()

const initialState = {
  reduxTokenAuth: {
    currentUser: {
      isLoading: false,
      isSignedIn: false,
      attributes: {
        authUrl: null,
        userAttributes: null,
        userRegistrationAttributes: null,
      },
    },
  },
  // All your other state
  locale : {lang : localStorage.getItem('sofLang') || 'sv'},
  title : '',

}

export default function configureStore() {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  )
}
