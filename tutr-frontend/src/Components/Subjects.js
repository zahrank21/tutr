import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchSubjects } from '../Actions/subjectActions'
import SubjectCard from './SubjectCard.js';
import GridList, { GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';




class Subjects extends React.Component{

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

  render () {
    return (
    <div>
    <Typography variant="display2" gutterBottom>
    Subjects
    </Typography>
        <GridList>
          {this.mapSubjects()}
        </GridList>
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
  newSubject: state.subjects.subjectItem
})

export default connect(mapStateToProps, { fetchSubjects })(Subjects);
