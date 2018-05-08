const initialState = {
  login: true,
  userPage: false,
  sessions: false,
  subjects: false,
  reviews: false,
  tutors: false,
  myTutorPage: false,
  chat: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_TAB':
      console.log('reducer hit')
      return action.payload

    case 'SUBJECTS_TAB':
      console.log('reducer hit')
      return action.payload

    case 'REVIEWS_TAB':
      console.log('reducer hit')
      return action.payload

    case 'SESSIONS_TAB':
      console.log('reducer hit')
      return action.payload

    case 'PROFILE_TAB':
      console.log('reducer hit')
      return action.payload

    case 'CHOSEN_SUBJECT':
      console.log('reducer hit')
      return {
        login: false,
        userPage: false,
        sessions: false,
        subjects: false,
        reviews: false,
        tutors: true,
        myTutorPage: false
      }

    case 'MY_TUTOR_PAGE':
      console.log('reducer hit')
      return action.payload

    case 'CHAT_PAGE':
      console.log('reducer hit')
      return action.payload
      
    default:
      return state;
  }
}
