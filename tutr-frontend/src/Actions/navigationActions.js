export let handleClickLogin = () => {
  console.log('action hit')
  return{
    type: 'LOGIN_TAB',
    payload: {
      login: true,
      subjects: false,
      reviews: false,
      tutors: false
    }
  }
}

export let handleClickSubjects = () => {
  console.log('action hit')
  return {
    type: 'SUBJECTS_TAB',
    payload: {
      login: false,
      subjects: true,
      reviews: false,
      tutors: false
    }
  }
}

export let handleClickReviews = () => {
  console.log('action hit')
  return {
    type: 'REVIEWS_TAB',
    payload: {
      login: false,
      subjects: false,
      reviews: true,
      tutors: false
    }
  }
}

export let handleClickTutors = () => {
  console.log('action hit')
  return {
    type: 'TUTORS_TAB',
    payload: {
      login: false,
      subjects: false,
      reviews: false,
      tutors: true

    }
  }
}
