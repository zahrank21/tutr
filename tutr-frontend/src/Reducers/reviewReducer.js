const initialState = {
  reviewItems: [],
  reviewItem: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_REVIEWS':
      return {
        ...state,
        reviewItems: action.payload
      }
    case 'NEW_REVIEW':
      return {
        ...state,
        reviewItem: action.payload
      }
    default:
      return state;
  }
}
