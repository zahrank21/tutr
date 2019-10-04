import React from 'react';
import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createSession } from '../Actions/sessionActions'
import { fetchUsers } from '../Actions/userActions'
import { fetchSubjects } from '../Actions/subjectActions'
//

//material-ui imports
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
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


class SessionForm extends React.Component {


  state = {
    title: ''
  };

  componentWillMount(){
    this.props.fetchSubjects();
    this.props.fetchUsers();
  }



  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleSubmitSessionClick = () => {
    this.props.createSession({
      title: this.state.title,
      tutor_id: this.props.tutor.id,
      student_id: this.props.currentUser.id,
      subject_id: this.props.user.subject_id,
      completed: false
    });
    alert('Session Booked')
    this.setState({title: ''})
  }



  render() {
    const { classes } = this.props;
    let subjectsArray = Object.values(this.props.subjects)

    return (
      <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>

        <Typography variant="headline" component="h3">
          Book Session
        </Typography>

        <TextField
          label="Title"
          id='title'
          className={classNames(classes.margin, classes.textField)}
          onChange={this.handleChange('title')}
          value={this.state.title}
          multiline={true}
        />

          </CardContent>
          <CardActions>
            <Button onClick={this.handleSubmitSessionClick} size="small">Submit</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

SessionForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchSession: session => dispatch(createSession(session)),
  }
}


const mapStateToProps = state => ({
  subjects: state.subjects.subjectItems,
  currentUser: state.users.currentUser,
})

export default compose(
  withStyles(styles),
  connect( mapStateToProps, { createSession, fetchUsers, fetchSubjects }))(SessionForm)
