import React from 'react';
import ReviewForm from './ReviewForm'
//redux
import {connect} from 'react-redux'
import {compose} from 'redux'
import {createSession} from '../Actions/sessionActions'
//

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';



const styles = {
  card: {
    width: 300,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

const UserCard = props => {

  const handleBookSessionClick = () => {
    props.createSession({
      title: 'Session',
      tutor_id: props.user.id,
      student_id: props.currentUser.id,
      subject_id: props.currentUser.subject_id,
      completed: false
    });
  }

  const handleTutorReviewClick = () => {
    console.log('hit')
  }

  const { classes } = props;
  return (

    <div>
      <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image= {`https://picsum.photos/2000/2000?image=${Math.floor(Math.random() * 1000)}`}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {`${props.user.first_name} ${props.user.last_name}`}
          </Typography>
          <Typography component="p">
            {`${props.user.username}`}
          </Typography>
          <Typography component="p">
            {props.user.tutor ? 'Tutor' : 'Student'}
          </Typography>
          <CardActions>
            <Button onClick={handleTutorReviewClick} size="small">Review</Button>
            <Button onClick={handleBookSessionClick} size="small">Book Session</Button>
          </CardActions>
          <ReviewForm />
        </CardContent>
      </Card>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchBookSession: session => dispatch(createSession(session)),
  }
}

const mapStateToProps = state => ({
  users: state.users.cards,
  currentUser: state.users.currentUser
})

export default compose(
  connect(mapStateToProps, { createSession }),
  withStyles(styles))(UserCard);
