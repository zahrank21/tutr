import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { fetchReviews } from '../Actions/reviewActions'
import ReviewCard from './ReviewCard.js';
import GridList from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class Reviews extends React.Component{


  componentWillMount(){
    this.props.fetchReviews();
    console.log(this.props)
  }


  componentWillReceiveProps(nextProps){
    if (nextProps.newReview){
      this.props.reviews.push(nextProps.newReview)
    }
  }

  mapStudentReviews = () => {
    let reviewsArray = Object.values(this.props.reviews)
    let filteredReviews = reviewsArray.filter(review => review.student_id === this.props.currentUser.id)
    return filteredReviews.map(review => <ReviewCard key={review.id} review={review} />)
  }



  render () {
    const {classes} = this.props;
    return (
    <div className={classes.root} justify='center'>
      <Paper>
        <br/>
        <Typography variant="display2" gutterBottom>
          Reviews
        </Typography>
        <br/>
      </Paper>
      <br/>
        <GridList justify='center'>
          {this.mapStudentReviews()}
        </GridList>
    </div>
    )
  }
}

Reviews.propTypes = {
  fetchReviews: PropTypes.func.isRequired,
  reviews: PropTypes.array.isRequired,
  newReview: PropTypes.object
}

const mapStateToProps = state => ({
  reviews: state.reviews.reviewItems,
  newReview: state.reviews.reviewItem,
  currentUser: state.users.currentUser
})

export default  compose(
  withStyles(styles),
  connect(mapStateToProps, { fetchReviews }))(Reviews);
