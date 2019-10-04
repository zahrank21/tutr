import React from 'react';
import PropTypes from 'prop-types';
import Users from './Users' ;
import Subjects from './Subjects';
import Login from './Login'
import Reviews from './Reviews'
import UserPage from './UserPage'
import Sessions from './Sessions'
import MyTutorProfile from './MyTutorProfile'
import TutorProfile from './TutorProfile'
import Chat from './Chat'
// redux imports
import { connect } from 'react-redux'
import { compose } from 'redux'
import {handleClickLogin, handleClickSubjects, handleClickReviews, handleClickSessions, handleClickUserProfile, handleClickMyTutorProfile, handleClickChat} from '../Actions/navigationActions'
import {clearSession} from '../Actions/userActions'
//material-ui imports
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import DraftsIcon from '@material-ui/icons/Drafts';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FaceIcon from '@material-ui/icons/Face';
import SchoolIcon from '@material-ui/icons/School';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';


//

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 'flex',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

const Navigation = (props) =>  {
  const { classes } = props;

  const handleClickLogin = () => {
    props.dispatchLogin()
  }

  const handleClickSubjects = () => {
    props.dispatchSubjects()
  }

  const handleClickReviews = () => {
    props.dispatchReviews()
  }

  const handleClickSessions = () => {
    props.dispatchSessions()
  }

  const handleClickUserProfile = () => {
    props.dispatchUserPage()
  }

  const handleClickLogout = () => {
    props.dispatchClearSession()
  }

  const handleClickMyTutorProfile = () => {
    props.dispatchMyTutorProfile()
  }

  const handleClickChat = () => {
    props.dispatchChat()
  }

  const renderMyTutorProfile = () => {
    if (props.currentUser){
      if (props.currentUser.tutor){
        return (
          <div>
            <ListItem button onClick={handleClickMyTutorProfile}>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Tutor Hub" />
            </ListItem>
            <Divider />
          </div>
        )
      }
    }
  }

  const handleNavigation = () => {
    if (props.currentUser){
        if (props.navigation.userPage){
          return <UserPage />
        }

        else if (props.navigation.login){
          return <Login />
        }

        else if (props.navigation.subjects){
          return <Subjects />
        }

        else if (props.navigation.reviews){
          return <Reviews />
        }

        else if (props.navigation.tutors){
          return <Users />
        }

        else if (props.navigation.sessions){
          return <Sessions />
        }

        else if (props.navigation.myTutorPage){
          return <MyTutorProfile />
        }

        else if (props.navigation.chat){
          return <Chat />
        }

        else if (props.navigation.tutorPage){
          return <TutorProfile />
        }

        else {
          return null
        }
      } else {
        return (
          <div>
            <UserPage />
            <Login />
          </div>
        )
      }

  }

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Tutr
          </Typography>
          {props.currentUser ?

            <Button onClick={handleClickLogout} color="inherit">
              Logout
            </Button>

            :

            <Button onClick={handleClickLogin} color="inherit">
              Login/Sign Up
            </Button>
          }

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List component="nav">

          {renderMyTutorProfile()}

          <ListItem button onClick={handleClickUserProfile}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>
          <Divider />

          <ListItem button onClick={handleClickSessions}>
            <ListItemIcon>
              <AccessAlarmIcon />
            </ListItemIcon>
            <ListItemText primary="Sessions" />
          </ListItem>
          <Divider />

          <ListItem button onClick={handleClickSubjects}>
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText primary="Browse Tutors" />
          </ListItem>
          <Divider />

          <ListItem button onClick={handleClickReviews}>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="My Reviews" />
          </ListItem>
          <Divider />

          <ListItem button onClick={handleClickChat}>
            <ListItemIcon>
              <QuestionAnswerIcon />
            </ListItemIcon>
            <ListItemText primary="Community Chat" />
          </ListItem>
          <Divider />

        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>

          {handleNavigation()}


        </div>
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
  navigation: state.navigation,
  currentUser: state.users.currentUser
})

const mapDispatchToProps = dispatch => {
  return {
    dispatchLogin: () => dispatch(handleClickLogin()),
    dispatchSubjects: () => dispatch(handleClickSubjects()),
    dispatchReviews: () => dispatch(handleClickReviews()),
    dispatchSessions: () => dispatch(handleClickSessions()),
    dispatchUserPage: () => dispatch(handleClickUserProfile()),
    dispatchClearSession: () => dispatch(clearSession()),
    dispatchMyTutorProfile: () => dispatch(handleClickMyTutorProfile()),
    dispatchChat: () => dispatch(handleClickChat()),
  }
}




export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps))(Navigation)
