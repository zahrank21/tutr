import React from 'react';
import PropTypes from 'prop-types';
import ReviewCard from './ReviewCard'
import SessionCard from './SessionCard'
import Charts from './Charts'

//material ui
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
//

//redux
import { connect } from 'react-redux'
import { compose } from 'redux'
//

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 200,
    height: 200,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },

});

function MyTutorProfile(props) {
  const { classes } = props;

  let componentWillMount = () => {
    console.log('tutor profile props', props)
    // props.fetchSubjects();
    // props.fetchSessions();
    // props.fetchUsers();
  }

  let mapTutorReviews = () => {
    let reviewsArray = Object.values(props.reviews)
    let filteredReviews = reviewsArray.filter(review => review.tutor_id === props.currentUser.id)
    return filteredReviews.map(review => <ReviewCard key={review.id} review={review} />)
  }

  let mapTutorSessions = () =>{
    let sessionsArray = Object.values(props.sessions)
    let filteredSessions = sessionsArray.filter(session => session.tutor_id === props.currentUser.id)
    return filteredSessions.map(session => <SessionCard key={session.id} session={session} />)
  }

  let tutorReviewScores = () => {
    let reviewsArray = Object.values(props.reviews)
    let filteredReviews = reviewsArray.filter(review => review.tutor_id === props.currentUser.id)

    let i;
    let reviewScoreCount = {}

    for (i=0; i < filteredReviews.length; i++){
      reviewScoreCount[`${filteredReviews[i].score} Stars`] = 0
    }

    for (i=0; i < filteredReviews.length; i++){
      reviewScoreCount[`${filteredReviews[i].score} Stars`]++
    }
    return reviewScoreCount
  }



  let studentSubjects = () => {
    let sessionsArray = Object.values(props.sessions)
    let studentSessions = sessionsArray.filter(session => session.student_id === props.currentUser.id)

    const getSubjectName = (id) => {
      let foundSubject = props.subjects.filter(subject => subject.id == id)
      return foundSubject[0].name
    }

    let i;
    let subjectCountObject = {}
    for (i = 0; i < studentSessions.length; i++){
        subjectCountObject[getSubjectName(studentSessions[i].subject_id)] = 0
    }

    for (i = 0; i < studentSessions.length; i++){
        subjectCountObject[getSubjectName(studentSessions[i].subject_id)]++
    }
    return subjectCountObject
  }

  let studentTutors = () => {
    let sessionsArray = Object.values(props.sessions)
    let studentSessions = sessionsArray.filter(session => session.student_id === props.currentUser.id)

    const getUsername = (id) => {
      let foundUser = props.users.filter(user => user.id == id)
      return foundUser[0].username
    }

    let i;
    let tutorCountObject = {}
    for (i = 0; i < studentSessions.length; i++){
        tutorCountObject[getUsername(studentSessions[i].tutor_id)] = 0
    }

    for (i = 0; i < studentSessions.length; i++){
        tutorCountObject[getUsername(studentSessions[i].tutor_id)]++
    }
    return tutorCountObject
  }






  return (

              <div>
                {componentWillMount()}
                <br/>
                <Paper>
                  <br/>
                  <Typography variant="headline" component="h3">
                    {`Tutor Hub`}
                  </Typography>
                  <br/>
                </Paper>
                <br/>
              <br/>
              <Paper>
                <br/>
                <Typography variant="headline" component="h3">
                  {`Ratings`}
                </Typography>
                <br/>
                <br/>
                <Charts type={'Pie'} title={'Number of Ratings'} data={tutorReviewScores()}/>
                <br/>
              </Paper>
              <br/>
              <Paper>
                <br/>
                <Typography variant="headline" component="h3">
                  {`Reviews`}
                </Typography>
                <br/>
              </Paper>
              <br/>
              <Paper>
                <br/>
                <Grid>
                  <Grid container className={classes.demo} justify="center" spacing={8}>

                    {mapTutorReviews()}
                  </Grid>

                </Grid>
                <br/>
              </Paper>
              <Divider />
              <br/>
              <Paper>
                  <br/>
                <Typography variant="headline" component="h3">
                  {`Sessions`}
                </Typography>
                <br/>
                </Paper>
                <br/>
                <Paper>
                  <br/>
                <Grid>
                  <Grid container className={classes.demo} justify="center" spacing={8}>
                    {mapTutorSessions()}
                  </Grid>
                </Grid>
                <br/>
              </Paper>
              <br/>
            </div>

  );
}



MyTutorProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  reviews: state.reviews.reviewItems,
  sessions: state.sessions.sessionItems,
  subjects: state.subjects.subjectItems,
  users: state.users.cards,
  user: state.users.card,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps))(MyTutorProfile);
