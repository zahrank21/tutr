import React from 'react';
import PropTypes from 'prop-types';
import ReviewCard from './ReviewCard'
import ReviewForm from './ReviewForm'
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
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

//

//redux
import { connect } from 'react-redux'
import { compose } from 'redux'
import { fetchSubjects } from '../Actions/subjectActions'
import { fetchSessions } from '../Actions/sessionActions'
import { fetchUsers } from '../Actions/userActions'
import { fetchReviews } from '../Actions/reviewActions'
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

class TutorProfile extends React.Component{

  state = {
    reviewClick: false
  }

  componentWillMount(){
    console.log('tutor profile this.props', this.props);
    this.props.fetchReviews();
  }

  mapTutorReviews = () => {
    let reviewsArray = Object.values(this.props.reviews)
    let filteredReviews = reviewsArray.filter(review => review.tutor_id === this.props.user.id)
    return filteredReviews.map(review => <ReviewCard key={review.id} review={review} />)
  }

  mapTutorSessions = () =>{
    let sessionsArray = Object.values(this.props.sessions)
    let filteredSessions = sessionsArray.filter(session => session.tutor_id === this.props.user.id)
    return filteredSessions.map(session => <SessionCard key={session.id} session={session} />)
  }

  tutorReviewScores = () => {
    console.log(this.props.reviews)
    let reviewsArray = Object.values(this.props.reviews)
    let filteredReviews = reviewsArray.filter(review => review.tutor_id === this.props.user.id)

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

  handleTutorReviewClick = () => {
    this.setState({
      reviewClick: !this.state.reviewClick
    })
  }

  render(){
    const { classes } = this.props;
    return (

              <div>
                <br/>
                <Paper>
                  <br/>
                  <Typography variant="headline" component="h3">
                    {`${this.props.user.username}'s Profile`}
                  </Typography>
                  <br/>
                    <CardActions className={classes.row}>
                        <Button onClick={this.handleTutorReviewClick} size="small">Review</Button>
                        <Button onClick={this.handleBookSessionClick} size="small">Book Session</Button>
                    </CardActions>
                    {this.state.reviewClick ? <ReviewForm tutor={this.props.user.id} /> : null}
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
                <Charts type={'Pie'} title={'Number of Ratings'} data={this.tutorReviewScores()}/>
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

                    {this.mapTutorReviews()}
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
                    {this.mapTutorSessions()}
                  </Grid>
                </Grid>
                <br/>
              </Paper>
              <br/>
            </div>

    );}
}




TutorProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  reviews: state.reviews.reviewItems,
  sessions: state.sessions.sessionItems,
  subjects: state.subjects.subjectItems,
  users: state.users.cards,
  user: state.users.tutorProfile,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {fetchSubjects, fetchSessions, fetchUsers, fetchReviews}))(
    TutorProfile);
