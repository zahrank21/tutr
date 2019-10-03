export let handleClickLogin = () => {
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
      chat: false,
      tutorPage: false,
    }
  }
}

export let handleClickSubjects = () => {
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
      chat: false,
      tutorPage: false,
    }
  }
}

export let handleClickReviews = () => {
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
      chat: false,
      tutorPage: false,
    }
  }
}

export let handleClickTutors = () => {
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
      chat: false,
      tutorPage: false,

    }
  }
}

export let handleClickSessions = () => {
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
      chat: false,
      tutorPage: false,
    }
  }
}

export let handleClickUserProfile = () => {
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
      chat: false,
      tutorPage: false,
    }
  }
}

export let handleClickMyTutorProfile = () => {
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
      chat: false,
      tutorPage: false,
    }
  }
}

export let handleClickChat = () => {
  return{
    type: 'CHAT_PAGE',
    payload: {
      login: false,
      userPage: false,
      sessions: false,
      subjects: false,
      reviews: false,
      tutors: false,
      myTutorPage: false,
      chat: true,
      tutorPage: false,
    }
  }
}

export let handleTutorProfileClick = (user) => {
  return{
    type: 'TUTOR_PAGE',
    payload: {
      navigation: {
        login: false,
        userPage: false,
        sessions: false,
        subjects: false,
        reviews: false,
        tutors: false,
        myTutorPage: false,
        chat: false,
        tutorPage: true,
      },
    tutorProfile: user,
    }
  }
}
