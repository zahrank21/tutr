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
    console.log(this.props)
  }


  componentWillReceiveProps(nextProps){
    if (nextProps.newSession){
      this.props.sessions.push(nextProps.newSession)
    }
  }

  mapSessions = () => {
    let sessionsArray = Object.values(this.props.sessions)
    return sessionsArray.map(session => <SessionCard key={session.id} session={session} />)
  }

  render () {
    return (
    <div>
      <Typography variant="display2" gutterBottom>
        Sessions
      </Typography>
          {this.mapSessions()}
    </div>
    )
  }
}

Sessions.propTypes = {
  fetchSessions: PropTypes.func.isRequired,
  sessions: PropTypes.array.isRequired,
  newSession: PropTypes.object
}

const mapStateToProps = state => ({
  sessions: state.sessions.sessionItems,
  newSession: state.sessions.sessionItem
})

export default connect(mapStateToProps, { fetchSessions })(Sessions);
