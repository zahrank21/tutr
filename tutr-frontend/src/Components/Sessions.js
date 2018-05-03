import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchSessions } from '../Actions/sessionActions'
import SessionCard from './SessionCard.js';
import GridList, { GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';



class Sessions extends React.Component{

  componentWillMount(){
    this.props.fetchSessions();
  }


  componentWillReceiveProps(nextProps){
    if (nextProps.newSession){
      this.props.sessions.push(nextProps.newSession)
    }
  }

  mapSessions = () => {
    let sessionsArray = Object.values(this.props.sessions)
    let filteredSessions = sessionsArray.filter(session => session.student_id === this.props.currentUser.id)
    return filteredSessions.map(session => <SessionCard key={session.id} session={session} />)
  }

  render () {
    return (
    <div>
      <Typography variant="display2" gutterBottom>
        Sessions
      </Typography>
      <GridList>
          {this.mapSessions()}
      </GridList>
    </div>
    )
  }
}

Sessions.propTypes = {
  fetchSessions: PropTypes.func.isRequired,
  newSession: PropTypes.object
}

const mapStateToProps = state => ({
  sessions: state.sessions.sessionItems,
  newSession: state.sessions.sessionItem,
  currentUser: state.users.currentUser
})

export default connect(mapStateToProps, { fetchSessions })(Sessions);
