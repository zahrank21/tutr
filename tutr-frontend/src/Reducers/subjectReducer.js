const initialState = {
  subjectItems: [],
  subjectItem: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_SUBJECTS':
      return {
        ...state,
        subjectItems: action.payload
      }
    case 'NEW_SUBJECT':
      return {
        ...state,
        subjectItem: action.payload
      }
    default:
      return state;
  }
}
