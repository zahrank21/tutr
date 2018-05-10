import React from 'react'
import PropTypes from 'prop-types'
import UserCard from './UserCard'

// redux
import { connect } from 'react-redux'
import { compose } from 'redux'
import { fetchSubjects } from '../Actions/subjectActions'
//

//material
import SubjectCard from './SubjectCard.js';
import GridList, { GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import classNames from 'classnames';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
//



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    alignItems: 'center',

  }
});

class Subjects extends React.Component{

  state = {
    query: ''
  }


  componentWillMount(){
    this.props.fetchSubjects();
    console.log('subject props', this.props)
  }


  componentWillReceiveProps(nextProps){
    if (nextProps.newSubject){
      this.props.subjects.push(nextProps.newSubject)
    }
  }

  mapSubjects = () => {
    let subjectsArray = Object.values(this.props.subjects)
    return subjectsArray.map(subject => <SubjectCard key={subject.id} subject={subject} />)
  }

  handleTutorSearchChange = (event) => {
    this.setState({
      query: event.target.value
    })
  }

  mapUsers = () => {
    console.log(this.props.users)
    let filteredUsers = this.props.users.filter(user => user.username.toLowerCase().includes(this.state.query.toLowerCase()) || user.first_name.toLowerCase().includes(this.state.query.toLowerCase()) || user.last_name.toLowerCase().includes(this.state.query.toLowerCase()) && user.tutor)
    return filteredUsers.map(user => <UserCard key={user.id} user={user}/>)
  }

  renderSubjects = () => {
    const{classes} = this.props;

    if (this.state.query){
      return(
        <Grid>
          <Grid container className={classes.demo} justify="center" spacing={8}>
          {this.mapUsers()}
        </Grid>
      </Grid>
      )
    } else {
      return(
        <div>
        <Paper>
          <br/>
          <Typography variant="display2" gutterBottom>
            Browse By Subject
          </Typography>
          <br/>
        </Paper>
        <br/>
          <Grid>
            <Grid container className={classes.demo} justify="center" spacing={8}>
              {this.mapSubjects()}
            </Grid>
          </Grid>
      </div>
      )
    }
  }

  render () {
    const{classes} = this.props;
    return (
    <div className={classes.root} alignContent='center'>
      <Paper>
        <br/>
        <Typography variant="display2" gutterBottom>
          Search for Tutor
        </Typography>

        <TextField
          label="Search"
          id="Tutor-Search"

          value={this.state.query}
          onChange={this.handleTutorSearchChange}
        />
        <br/>
        <br/>
      </Paper>
      <br/>
      <div>
        {this.renderSubjects()}
      </div>
    </div>
    )
  }
}

Subjects.propTypes = {
  fetchSubjects: PropTypes.func.isRequired,
  subjects: PropTypes.array.isRequired,
  newSubject: PropTypes.object
}

const mapStateToProps = state => ({
  subjects: state.subjects.subjectItems,
  newSubject: state.subjects.subjectItem,
  users: state.users.cards,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { fetchSubjects }))(Subjects);
