import React from 'react';

import {connect} from 'react-redux'
import {compose} from 'redux'

import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';




const styles = {
  card: {
    width: 300,
    height: 300
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

const SessionCard = props => {

  const { classes } = props;

  const componentWillMount = () => {
    props.fetchSubjects();
    props.fetchUsers();
  }

  const getUsername = (id) => {
    let foundUser = props.users.filter(user => user.id == id)
    return foundUser[0].username
  }

  const getSubjectName = (id) => {
    let foundSubject = props.subjects.filter(subject => subject.id == id)
    return foundSubject[0].name
  }




  return (

    <Grid item>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image= {`https://picsum.photos/2000/2000?image=${Math.floor(Math.random() * 500)}`}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {`${props.session.title}`}
          </Typography>
          <Typography component="p">
            Student: {`${getUsername(props.session.student_id)}`}
          </Typography>
          <Typography component="p">
            Tutor: {`${getUsername(props.session.tutor_id)}`}
          </Typography>
          <Typography component="p">
            Subject: {`${getSubjectName(props.session.subject_id)}`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

const mapStateToProps = state => ({
  subjects: state.subjects.subjectItems,
  users: state.users.cards,
  currentUser: state.users.currentUser
})

export default compose(withStyles(styles),
connect(mapStateToProps))(SessionCard);
