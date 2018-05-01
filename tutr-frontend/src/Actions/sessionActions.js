export const fetchSessions = () => dispatch => {
    fetch('http://localhost:3000/api/v1/sessions')
      .then(res=> res.json())
      .then(sessions => dispatch({
        type: 'FETCH_REVIEWS',
        payload: sessions
      }));
}

export const createSession = (reviewData) => dispatch => {
  console.log('action called')
  fetch('http://localhost:3000/api/v1/sessions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },

    body: JSON.stringify(reviewData)
  })
    .then(res=> res.json())
    .then(review => dispatch({
      type: 'NEW_REVIEW',
      payload: review
    }))
}
