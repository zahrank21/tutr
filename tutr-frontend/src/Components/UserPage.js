import React from 'react';
import PropTypes from 'prop-types';
import ReviewCard from './ReviewCard'
import SessionCard from './SessionCard'
import Charts from './Charts'

//material ui
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';
import GridList from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
//

//redux
import { connect } from 'react-redux'
import { compose } from 'redux'
import { fetchSubjects } from '../Actions/subjectActions'
import { fetchSessions } from '../Actions/sessionActions'
import { fetchUsers } from '../Actions/userActions'
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

class UserPage extends React.Component{

  componentWillMount = () => {
    this.props.fetchSubjects();
    this.props.fetchSessions();
    this.props.fetchUsers();
  }

  mapTutorReviews = () => {
    let reviewsArray = Object.values(this.props.reviews)
    let filteredReviews = reviewsArray.filter(review => review.tutor_id === this.props.currentUser.id)
    return filteredReviews.map(review => <ReviewCard key={review.id} review={review} />)
  }

  mapTutorSessions = () =>{
    let sessionsArray = Object.values(this.props.sessions)
    let filteredSessions = sessionsArray.filter(session => session.tutor_id === this.props.currentUser.id)
    return filteredSessions.map(session => <SessionCard key={session.id} session={session} />)
  }

  tutorReviewScores = () => {
    let reviewsArray = Object.values(this.props.reviews)
    let filteredReviews = reviewsArray.filter(review => review.tutor_id === this.props.currentUser.id)

    let i;
    let reviewScoreCount = {}

    for (i=0; i < filteredReviews.length; i++){
      reviewScoreCount[filteredReviews[i].score] = 0
    }

    for (i=0; i < filteredReviews.length; i++){
      reviewScoreCount[filteredReviews[i].score]++
    }
    return reviewScoreCount
  }



  studentSubjects = () => {
    let sessionsArray = Object.values(this.props.sessions)
    let studentSessions = sessionsArray.filter(session => session.student_id === this.props.currentUser.id)

    const getSubjectName = (id) => {
      let foundSubject = this.props.subjects.filter(subject => subject.id == id)
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

  studentTutors = () => {
    let sessionsArray = Object.values(this.props.sessions)
    let studentSessions = sessionsArray.filter(session => session.student_id === this.props.currentUser.id)

    const getUsername = (id) => {
      let foundUser = this.props.users.filter(user => user.id == id)
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





  render(){

    const { classes } = this.props;
  return (
    <div>
      {this.props.currentUser ?
        <div>
          <Paper className={classes.root} elevation={4}>
            <Typography variant="headline" component="h3">
              {`${this.props.currentUser.username} Profile`}
            </Typography>
            <div className={classes.row}>

              <Avatar
                src={`https://picsum.photos/2000/2000?image=${Math.floor(Math.random() * 100 )}`}
                className={classNames(classes.avatar, classes.bigAvatar)}
              />
           </div>
            <Typography component="h4">
              {`${this.props.currentUser.first_name} ${this.props.currentUser.last_name}`}
            </Typography>
          </Paper>
          <br/>
            <Paper>
              <br/>
              <Typography variant="headline" component="h3">
                {`Favorite Subjects`}
              </Typography>
              <br/>
            </Paper>
            <br/>
          <Paper>
            <br/>
              <Charts type={'Bar'} title={'Number of Sessions'} data={this.studentSubjects()}/>
            <br/>
          </Paper>
          <br/>
            <Paper>
              <br/>
              <Typography variant="headline" component="h3">
                {`Favorite Tutors`}
              </Typography>
              <br/>
            </Paper>
            <br/>
          <Paper>
            <br/>
              <Charts type={'Bar'} title={'Number of Sessions'} data={this.studentTutors()}/>
            <br/>
          </Paper>
          <div>
          </div>
        </div>
        :

        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3">
            Please Log In or Sign Up to Continue
          </Typography>
        </Paper>

        }

    </div>
  );
}
}



UserPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  reviews: state.reviews.reviewItems,
  sessions: state.sessions.sessionItems,
  subjects: state.subjects.subjectItems,
  users: state.users.cards
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {fetchSubjects, fetchSessions, fetchUsers}))(UserPage);
