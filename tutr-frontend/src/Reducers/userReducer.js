const initialState = {
  cards: [],
  card: {},
  chosenSubject: '',
  currentUser: null,
  tutorProfile: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_USERS':
    console.log('fetch user reducer hit')
      return {
        ...state,
        cards: action.payload
      }
    case 'NEW_USER':
      return {
        ...state,
        card: action.payload
      }
    case 'SET_USER':
      console.log('set user', action.payload)
      return {
        ...state,
        currentUser: action.payload
      }

    case 'CLEAR_SESSION':
      return {
        ...state,
        currentUser: null
      }

    case 'CHOSEN_SUBJECT':
      console.log(action.payload.subjectId)
      return {
        ...state,
        chosenSubject: action.payload.subjectId
      }

    case 'TUTOR_PAGE':
      console.log(action.payload.tutorProfile)
      return {
        ...state,
        tutorProfile: action.payload.tutorProfile
      }

    default:
      return state;
  }
}
