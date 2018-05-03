import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchUsers } from '../Actions/userActions'
import UserCard from './UserCard.js';
import GridList, { GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';




class Users extends React.Component{

  componentWillMount(){
    this.props.fetchUsers();
    console.log(this.props)
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
      <GridList>
          {this.mapUsers()}
      </GridList>
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

export default connect(mapStateToProps, { fetchUsers })(Users);
