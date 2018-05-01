import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchReviews } from '../Actions/reviewActions'
import ReviewCard from './ReviewCard.js';
import GridList, { GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';



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

  mapReviews = () => {
    let reviewsArray = Object.values(this.props.reviews)
    return reviewsArray.map(review => <ReviewCard key={review.id} review={review} />)
  }

  render () {
    return (
    <div>
      <Typography variant="display2" gutterBottom>
        Reviews
      </Typography>
          {this.mapReviews()}
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
  newReview: state.reviews.reviewItem
})

export default connect(mapStateToProps, { fetchReviews })(Reviews);
