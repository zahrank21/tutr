import React from 'react';
import PropTypes from 'prop-types';
import Users from './Users' ;
import Subjects from './Subjects';
import Login from './Login'
import Reviews from './Reviews'
import UserPage from './UserPage'
import Sessions from './Sessions'
// redux imports
import { connect } from 'react-redux'
import { compose } from 'redux'
import {handleClickLogin, handleClickSubjects, handleClickReviews, handleClickSessions, handleClickUserProfile} from '../Actions/navigationActions'
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
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FaceIcon from '@material-ui/icons/Face';
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
            <ListItemText primary="Subjects" />
          </ListItem>
          <Divider />

          <ListItem button onClick={handleClickReviews}>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="My Reviews" />
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
    dispatchClearSession: () => dispatch(clearSession())
  }
}




export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps))(Navigation)
