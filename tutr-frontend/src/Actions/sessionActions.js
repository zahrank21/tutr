export const fetchSessions = () => dispatch => {
    fetch('/api/v1/sessions')
      .then(res=> res.json())
      .then(sessions => dispatch({
        type: 'FETCH_SESSIONS',
        payload: sessions
      }));
}

export const createSession = (sessionData) => dispatch => {
  fetch('/api/v1/sessions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },

    body: JSON.stringify(sessionData)
  })
          .then(res=> res.json())
    .then(session => dispatch({
      type: 'NEW_SESSION',
      payload: session
    }))
}
