import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './auth'
import ui from './ui'
import donations from './donations'

const reducer = combineReducers({
  routing: routerReducer,
  auth,
  ui,
  donations,
})

export default reducer
