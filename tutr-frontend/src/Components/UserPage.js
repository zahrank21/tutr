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

function UserPage(props) {
  const { classes } = props;
  console.log('user page props', props)

  const componentWillMount = () => {
    this.props.fetchSubjects();
    this.props.fetchSessions();
    this.props.fetchUsers();
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
      console.log(foundUser)
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
    console.log(tutorCountObject)
    return tutorCountObject
  }



  return (
    <div>
      {props.currentUser ?
        <div>
          <Paper className={classes.root} elevation={4}>
            <Typography variant="headline" component="h3">
              {`${props.currentUser.username} Profile`}
            </Typography>
            <div className={classes.row}>

              <Avatar
                src={`https://picsum.photos/2000/2000?image=${Math.floor(Math.random() * 100 )}`}
                className={classNames(classes.avatar, classes.bigAvatar)}
              />
           </div>
            <Typography component="h4">
              {`${props.currentUser.first_name} ${props.currentUser.last_name}`}
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
              <Charts title={'Number of Sessions'} data={studentSubjects()}/>
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
              <Charts title={'Number of Sessions'} data={studentTutors()}/>
            <br/>
          </Paper>
          <div>
            {props.currentUser.tutor ?
              <div>
                <br/>
                <Paper>
                  <br/>
                  <Typography variant="headline" component="h3">
                    {`Tutor Hub`}
                  </Typography>
                  <br/>
                </Paper>
                <br/>
              <Paper>
                <br/>
                <Typography variant="headline" component="h3">
                  {`Reviews`}
                </Typography>
                <br/>
                <GridList justify='center'>
                  {mapTutorReviews()}
                </GridList>
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
                <GridList justify='center'>
                  {mapTutorSessions()}
                </GridList>
                <br/>
              </Paper>
              </div> : null }
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
  connect(mapStateToProps))(UserPage);
