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


class Login extends React.Component {


  state = {
    username: '',
    password: '',
    firstName: '',
    lastName:'',
    tutor: false,
    showPassword: false,
    subject: '',
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

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleSignUpSubmit = (event) => {
    event.preventDefault();
    let allUsernames = this.props.users.map(user => user.username)
    console.log(allUsernames)
    if (allUsernames.includes(this.state.username)){
      alert('username already taken')
    } else {
      const user = {
      username: this.state.username,
      first_name: this.state.firstName,
      last_name:this.state.lastName,
      password: this.state.password,
      tutor: this.state.tutor,
      subject_id: parseInt(this.state.subject),
      }

    this.props.createUser(user);
    this.props.setUser(user);
    }
  }

  handleLoginSubmit = (event) => {
    event.preventDefault();
    let allUsernames = this.props.users.map(user => user.username)
    if (allUsernames.includes(this.state.username)){
      let currentUser = this.props.users.find(user => user.username === this.state.username)
      return this.props.setUser(currentUser)
    } else {
      alert('user does not exist')
    }

  }


  render() {
    const { classes } = this.props;
    let subjectsArray = Object.values(this.props.subjects)

    return (
      <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="h3">
            Sign Up
          </Typography>

        <TextField
          label="First Name"
          id="First Name"
          className={classNames(classes.margin, classes.textField)}
          value={this.state.firstName}
          onChange={this.handleChange('firstName')}
        />
        <TextField
          label="Last Name"
          id="Last Name"
          className={classNames(classes.margin, classes.textField)}
          value={this.state.lastName}
          onChange={this.handleChange('lastName')}
        />
        <TextField
          select
          label="Tutor"
          className={classNames(classes.margin, classes.textField)}
          value={this.state.tutor}
          onChange={this.handleChange('tutor')}
        >
          {ranges.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Subject"
          className={classNames(classes.margin, classes.textField)}
          value={this.state.subject}
          onChange={this.handleChange('subject')}
        >
          {subjectsArray.map(subject => (
            <MenuItem key={subject.id} value={subject.id}>
              {subject.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Username"
          id="Username"
          className={classNames(classes.margin, classes.textField)}
          value={this.state.username}
          onChange={this.handleChange('username')}
        />

        <FormControl className={classNames(classes.margin, classes.textField)}>
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            id="adornment-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <CardActions>
          <Button onClick={this.handleSignUpSubmit} size="small">Sign Up</Button>
        </CardActions>

        <Typography variant="headline" component="h3">
          Login
        </Typography>

        <TextField
          label="Username"
          id="Username-Login"
          className={classNames(classes.margin, classes.textField)}
          value={this.state.username}
          onChange={this.handleChange('username')}
        />

        <FormControl className={classNames(classes.margin, classes.textField)}>
          <InputLabel htmlFor="login-password">Password</InputLabel>
          <Input
            id="login-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
          </CardContent>
          <CardActions>
            <Button onClick={this.handleLoginSubmit} size="small">Log In</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  subjects: state.subjects.subjectItems,
  users: state.users.cards
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { createUser, fetchSubjects, fetchUsers, setUser }))(Login)
