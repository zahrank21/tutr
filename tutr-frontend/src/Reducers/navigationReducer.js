const initialState = {
  login: true,
  subjects: false,
  reviews: false,
  tutors: false
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

    case 'CHOSEN_SUBJECT':
      console.log('reducer hit')
      return {
        login: false,
        subjects: false,
        reviews: false,
        tutors: true
      }

    default:
      return state;
  }
}
