export const fetchSubjects = () => dispatch => {
    fetch('/api/v1/subjects')
      .then(res=> res.json())
      .then(subjects => dispatch({
        type: 'FETC_SUBJECTS',
        payload: subjects
      }));
}

export const createSubject = (subjectData) => dispatch => {
  fetch('/api/v1/subjects', {
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
