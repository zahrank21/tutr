import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { fetchSessions } from '../Actions/sessionActions'
import SessionCard from './SessionCard.js';
import GridList, { GridListTile } from 'material-ui/GridList';
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
    const{classes} = this.props;
    return (
    <div className={classes.root} alignContent='center'>
      <Paper>
        <br/>
        <Typography variant="display2" gutterBottom>
          Sessions
        </Typography>
        <br/>
      </Paper>
      <br/>
        <Grid>
          <Grid container className={classes.demo} justify="center" spacing={8}>
            {this.mapSessions()}
          </Grid>
        </Grid>
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

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { fetchSessions }))(Sessions);
