import React from 'react';
import PropTypes from 'prop-types';
import ReviewCard from './ReviewCard'

//material ui
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';

//

//redux
import { connect } from 'react-redux'
import { compose } from 'redux'
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


  let mapTutorReviews = () => {
    let reviewsArray = Object.values(props.reviews)
    let filteredReviews = reviewsArray.filter(review => review.tutor_id === props.currentUser.id)
    return filteredReviews.map(review => <ReviewCard key={review.id} review={review} />)
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
                src={`https://picsum.photos/2000/2000?image=${Math.floor(Math.random() * 500 )}`}
                className={classNames(classes.avatar, classes.bigAvatar)}
              />
           </div>
            <Typography component="h4">
              {`${props.currentUser.first_name} ${props.currentUser.last_name}`}
            </Typography>
          </Paper>
          <div>
            {props.currentUser.tutor ?
              <Paper>
                <Typography variant="headline" component="h3">
                  {`Reviews`}
                </Typography>
                {mapTutorReviews()}
              </Paper> : null }
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
  reviews: state.reviews.reviewItems
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps))(UserPage);
