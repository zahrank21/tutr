import React from 'react';
import UserCard from './UserCard'
//


import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
//redux
import {connect} from 'react-redux'
import {compose} from 'redux'
import { handleSubjectCardClick } from '../Actions/userActions'
import { handleClickTutors } from '../Actions/navigationActions'

//



const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};


const SubjectCard = props => {

  let handleSubjectCardClick = () => {
    console.log(props)
    props.dispatchSubjectFilter(props.subject)
  }


  const { classes } = props;
  return (

    <div>
      <Card onClick={handleSubjectCardClick} className={classes.card}>
        <CardMedia
          className={classes.media}
          image={`https://picsum.photos/2000/2000?image=${Math.floor(Math.random() * 1000)}`}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {props.subject.name}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

const mapStateToProps = state => ({
  chosenSubject: state.users.chosenSubject,
  users: state.users
})

const mapDispatchToProps = dispatch => {
  return {
    dispatchSubjectFilter: subject => dispatch(handleSubjectCardClick(subject)),
  }
}



export default compose(withStyles(styles),
connect( mapStateToProps, mapDispatchToProps))(SubjectCard);
