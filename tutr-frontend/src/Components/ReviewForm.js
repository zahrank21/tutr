import React from 'react';
import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createReview } from '../Actions/reviewActions'
import { fetchUsers } from '../Actions/userActions'
import { fetchSubjects } from '../Actions/subjectActions'
//

//material-ui imports
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
//

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
});

const ranges = [
  {
    value: true,
    label: 'Tutor',
  },
  {
    value: false,
    label: 'Student',
  },
];


class ReviewForm extends React.Component {


  state = {
    title: '',
    body: '',
    rating: ''
  };

  componentWillMount(){
    this.props.fetchSubjects();
    this.props.fetchUsers();
  }



  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleSubmitReviewClick = () => {
    this.props.createReview({
      tutor_id: parseInt(this.props.tutor),
      student_id: parseInt(this.props.currentUser.id),
      body: this.state.body,
      title: this.state.title,
      score: parseInt(this.state.rating),
      subject_id: parseInt(this.props.currentUser.subject_id)
    })
    alert('Your Review Was Submitted')
    this.setState({title: '',
    body: '',
    rating: ''})
  }



  render() {
    const { classes } = this.props;
    let subjectsArray = Object.values(this.props.subjects)

    return (
      <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>

        <Typography variant="headline" component="h3">
          Send Review
        </Typography>

        <TextField
          label="Title"
          id='title'
          className={classNames(classes.margin, classes.textField)}
          onChange={this.handleChange('title')}
          value={this.state.title}
          multiline={true}
        />

      <FormControl onChange={this.handleChange} className={classNames(classes.margin, classes.textField)}>
          <InputLabel>Body</InputLabel>
          <Input
            id='Body'
            value={this.state.body}
            onChange={this.handleChange('body')}
            multiline={true}
          />
        </FormControl>

        <TextField
          select
          label="Rating"
          className={classNames(classes.margin, classes.textField)}
          value={this.state.rating}
          onChange={this.handleChange('rating')}
        >
          {[1,2,3,4,5].map(int => (
            <MenuItem key={int} value={int}>
              {int}
            </MenuItem>
          ))}
        </TextField>


          </CardContent>
          <CardActions>
            <Button onClick={this.handleSubmitReviewClick} size="small">Submit</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

ReviewForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchReview: review => dispatch(createReview(review)),
  }
}


const mapStateToProps = state => ({
  subjects: state.subjects.subjectItems,
  currentUser: state.users.currentUser,
})

export default compose(
  withStyles(styles),
  connect( mapStateToProps, { createReview, fetchUsers, fetchSubjects }))(ReviewForm)
