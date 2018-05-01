export const fetchSubjects = () => dispatch => {
    fetch('http://localhost:3000/api/v1/subjects')
      .then(res=> res.json())
      .then(subjects => dispatch({
        type: 'FETCH_SUBJECTS',
        payload: subjects
      }));
}

export const createSubject = (subjectData) => dispatch => {
  console.log('action called')
  fetch('http://localhost:3000/api/v1/subjects', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },

    body: JSON.stringify(subjectData)
  })
    .then(res=> res.json())
    .then(subject => dispatch({
      type: 'NEW_SUBJECT',
      payload: subject
    }))
}
