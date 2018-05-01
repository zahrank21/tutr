import React from 'react';
import {connect} from 'react-redux'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';



const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

const ReviewCard = props => {


  const { classes } = props;
  return (

    <div>
      <div>
      <Card className={classes.card}>
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
            Tutor: {`${props.review.tutor_id}`}
          </Typography>
          <Typography component="p">
            Student: {`${props.review.rating}`}
          </Typography>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}

export default withStyles(styles)(ReviewCard);
