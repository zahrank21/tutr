import { combineReducers } from 'redux';
import userReducer from './userReducer'
import subjectReducer from './subjectReducer'
import reviewReducer from './reviewReducer'
import navigationReducer from './navigationReducer'


const rootReducer = combineReducers({
  users: userReducer,
  subjects: subjectReducer,
  reviews: reviewReducer,
  navigation: navigationReducer
})

export default rootReducer
