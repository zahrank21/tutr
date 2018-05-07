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
import Grid from 'material-ui/Grid';




const styles = {
  card: {
    width: 350,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  }
};

class UserCard extends React.Component{

  state = {
    reviewClick: false
  }

  handleBookSessionClick = () => {
    this.props.createSession({
      title: 'Session',
      tutor_id: this.props.user.id,
      student_id: this.props.currentUser.id,
      subject_id: this.props.user.subject_id,
      completed: false
    });
  }

  handleTutorReviewClick = () => {
    this.setState({
      reviewClick: !this.state.reviewClick
    })
  }

  render(){
  const { classes } = this.props;
  return (

    <Grid item>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image= {`https://picsum.photos/2000/2000?image=${Math.floor(Math.random() * 1000)}`}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {`${this.props.user.first_name} ${this.props.user.last_name}`}
          </Typography>
          <Typography component="p">
            {`${this.props.user.username}`}
          </Typography>
          <Typography component="p">
            {this.props.user.tutor ? 'Tutor' : 'Student'}
          </Typography>
          <CardActions>
            <div justify={'center'}>
              <Button justify={'center'} onClick={this.handleTutorReviewClick} size="small">Review</Button>
              <Button justify={'center'} onClick={this.handleBookSessionClick} size="small">Book Session</Button>
            </div>
          </CardActions>
          {this.state.reviewClick ? <ReviewForm tutor={this.props.user.id} /> : null}
        </CardContent>
      </Card>
    </Grid>
  )
  }
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
