const initialState = {
  sessionItems: [],
  sessionItem: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_SESSIONS':
      return {
        ...state,
        sessionItems: action.payload
      }
    case 'NEW_SESSION':
      return {
        ...state,
        sessionItem: action.payload
      }
    default:
      return state;
  }
}
