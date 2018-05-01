import React from 'react';
//redux
import {connect} from 'react-redux'
import {compose} from 'redux'

//

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

const UserCard = props => {


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
            Tutor: {`${props.user.tutor}`}
          </Typography>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}

export default withStyles(styles)(UserCard);
