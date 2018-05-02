
export const fetchUsers = () => dispatch => {
    fetch('http://localhost:3000/api/v1/users')
      .then(res=> res.json())
      .then(users => dispatch({
        type: 'FETCH_USERS',
        payload: users
      }));
}

export const createUser = (userData) => dispatch => {
  console.log('action called')
  fetch('http://localhost:3000/api/v1/users', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },

    body: JSON.stringify(userData)
  })
    .then(res=> res.json())
    .then(user => dispatch({
      type: 'NEW_USER',
      payload: user
    }))
}

export const  handleSubjectCardClick = (subject) => {
  console.log(subject)
  return {
    type: 'CHOSEN_SUBJECT',
    payload: {
      subjectId: subject.id
    }
  }
}

export const setUser = (userData) => {
  console.log(userData)
  return {
    type: 'SET_USER',
    payload: userData
  }
}

export const clearSession = () => {
  return {
    type: 'CLEAR_SESSION',
    payload: {}
  }
}
