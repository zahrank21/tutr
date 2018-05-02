import { combineReducers } from 'redux';
import userReducer from './userReducer'
import subjectReducer from './subjectReducer'
import reviewReducer from './reviewReducer'
import navigationReducer from './navigationReducer'
import sessionReducer from './sessionReducer'


const rootReducer = combineReducers({
  users: userReducer,
  subjects: subjectReducer,
  reviews: reviewReducer,
  navigation: navigationReducer,
  sessions: sessionReducer
})

export default rootReducer
