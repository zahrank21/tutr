export let handleClickLogin = () => {
  console.log('action hit')
  return{
    type: 'LOGIN_TAB',
    payload: {
      login: true,
      userPage: false,
      sessions: false,
      subjects: false,
      reviews: false,
      tutors: false,
      myTutorPage:false,
    }
  }
}

export let handleClickSubjects = () => {
  console.log('action hit')
  return {
    type: 'SUBJECTS_TAB',
    payload: {
      login: false,
      userPage: false,
      sessions: false,
      subjects: true,
      reviews: false,
      tutors: false,
      myTutorPage:false,
    }
  }
}

export let handleClickReviews = () => {
  console.log('action hit')
  return {
    type: 'REVIEWS_TAB',
    payload: {
      login: false,
      userPage: false,
      sessions: false,
      subjects: false,
      reviews: true,
      tutors: false,
      myTutorPage:false,
    }
  }
}

export let handleClickTutors = () => {
  console.log('action hit')
  return {
    type: 'TUTORS_TAB',
    payload: {
      login: false,
      userPage: false,
      sessions: false,
      subjects: false,
      reviews: false,
      tutors: true,
      myTutorPage:false,

    }
  }
}

export let handleClickSessions = () => {
  console.log('action hit')
  return {
    type: 'SESSIONS_TAB',
    payload: {
      login: false,
      userPage: false,
      sessions: true,
      subjects: false,
      reviews: false,
      tutors: false,
      myTutorPage:false,
    }
  }
}

export let handleClickUserProfile = () => {
  console.log('action hit')
  return {
    type: 'PROFILE_TAB',
    payload: {
      login: false,
      userPage: true,
      sessions: false,
      subjects: false,
      reviews: false,
      tutors: false,
      myTutorPage:false,
    }
  }
}

export let handleClickMyTutorProfile = () => {
  console.log('action hit')
  return{
    type: 'MY_TUTOR_PAGE',
    payload: {
      login: false,
      userPage: false,
      sessions: false,
      subjects: false,
      reviews: false,
      tutors: false,
      myTutorPage: true,
    }
  }
}
