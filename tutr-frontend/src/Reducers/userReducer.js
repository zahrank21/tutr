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
      return {
        ...state,
        chosenSubject: action.payload.subjectId
      }

    case 'TUTOR_PAGE':
      return {
        ...state,
        tutorProfile: action.payload.tutorProfile
      }

    default:
      return state;
  }
}
