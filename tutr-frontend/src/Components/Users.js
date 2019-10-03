import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchUsers } from '../Actions/userActions'
import { compose } from 'redux'


import UserCard from './UserCard.js';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    alignItems: 'center',

  }
});


class Users extends React.Component{

  componentWillMount(){
    this.props.fetchUsers();
  }


  componentWillReceiveProps(nextProps){
    if (nextProps.newUser){
      this.props.users.push(nextProps.newUser)
    }
  }

  mapUsers = () => {
    console.log('mapuser', this.props)
    let usersArray = Object.values(this.props.users)
    let filteredUsers = usersArray.filter(user => user.subject_id === parseInt(this.props.chosenSubject) && user.tutor === true)
    return filteredUsers.map(user => <UserCard key={user.id} user={user} />)
  }

  render () {
    const{classes} = this.props;

    return (
    <div>
      <Paper>
        <br/>
        <Typography variant="display2" gutterBottom>
          Tutors
        </Typography>
        <br/>
      </Paper>
      <br/>
      <Grid>
        <Grid container className={classes.demo} justify="center" spacing={8}>
          {this.mapUsers()}
        </Grid>
      </Grid>
    </div>
    )
  }
}

Users.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  newUser: PropTypes.object
}

const mapStateToProps = state => ({
  users: state.users.cards,
  newUser: state.users.card,
  chosenSubject: state.users.chosenSubject
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { fetchUsers }))(Users);
