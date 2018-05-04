import React from 'react';

import {connect} from 'react-redux'
import {compose} from 'redux'
import { fetchUsers } from '../Actions/userActions'
import { fetchSubjects } from '../Actions/subjectActions'

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';



const styles = {
  card: {
    width: 300,
    height: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

const ReviewCard = props => {

  const componentWillMount = () => {
    props.fetchSubjects();
    props.fetchUsers();
    console.log('SessionCard props', props)
  }

  const getUsername = (id) => {
    let foundUser = props.users.filter(user => user.id == id)
    console.log(foundUser)
    return foundUser[0].username
  }

  const getSubjectName = (id) => {
    let foundSubject = props.subjects.filter(subject => subject.id == id)
    console.log(foundSubject)
    return foundSubject[0].name
  }

  const { classes } = props;
  return (

    <div>
      <div>
      <Card className={classes.card} aligncontent= 'center'>
        <CardMedia
          className={classes.media}
          image= {`https://picsum.photos/2000/2000?image=${Math.floor(Math.random() * 500)}`}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {`${props.review.title}`}
          </Typography>
          <Typography component="p">
            {`${props.review.body}`}
          </Typography>
          <Typography component="p">
            Tutor: {`${getUsername(props.review.tutor_id)}`}
          </Typography>
          <Typography component="p">
            Student: {`${getUsername(props.review.student_id)}`}
          </Typography>
          <Typography component="p">
            Rating: {`${props.review.score}`}
          </Typography>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  subjects: state.subjects.subjectItems,
  users: state.users.cards,
  currentUser: state.users.currentUser
})

export default compose(withStyles(styles),
connect(mapStateToProps))(ReviewCard);
