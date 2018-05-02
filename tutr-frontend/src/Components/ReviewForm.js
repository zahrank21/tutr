import React from 'react';
import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createUser, fetchUsers, setUser } from '../Actions/userActions'
import { fetchSubjects } from '../Actions/subjectActions'
//

//material-ui imports
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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
    console.log('login props', this.props)
  }



  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
    console.log(`${[prop]}: ${event.target.value}`)
  };







  render() {
    const { classes } = this.props;
    let subjectsArray = Object.values(this.props.subjects)

    return (
      <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>

        <Typography variant="headline" component="h3">
          ReviewForm
        </Typography>

        <TextField
          label="Title"
          className={classNames(classes.margin, classes.textField)}
        />

        <FormControl className={classNames(classes.margin, classes.textField)}>
          <InputLabel>Body</InputLabel>
          <Input
          />
        </FormControl>

        <TextField
          select
          label="Rating"
          className={classNames(classes.margin, classes.textField)}
          value={this.state.rating}
          onChange={this.handleChange('subject')}
        >
          {[1,2,3,4,5].map(int => (
            <MenuItem key={int} value={int}>
              {int}
            </MenuItem>
          ))}
        </TextField>


          </CardContent>
          <CardActions>
            <Button size="small">Submit</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

ReviewForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  subjects: state.subjects.subjectItems,
  users: state.users.cards
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { createUser, fetchSubjects, fetchUsers, setUser }))(ReviewForm)
