const initialState = {
  login: true,
  userPage: false,
  sessions: false,
  subjects: false,
  reviews: false,
  tutors: false,
  myTutorPage: false,
  chat: false,
  tutorPage: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_TAB':
      return action.payload

    case 'SUBJECTS_TAB':
      return action.payload

    case 'REVIEWS_TAB':
      return action.payload

    case 'SESSIONS_TAB':
      return action.payload

    case 'PROFILE_TAB':
      return action.payload

    case 'CHOSEN_SUBJECT':
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
      return action.payload

    case 'CHAT_PAGE':
      return action.payload

    case 'TUTOR_PAGE':
      return action.payload.navigation

    default:
      return state;
  }
}
