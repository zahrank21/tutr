import React from 'react';
import PropTypes from 'prop-types';
import Users from './Users' ;
import Subjects from './Subjects';
import Login from './Login'
import Reviews from './Reviews'
import UserPage from './UserPage'
// redux imports
import { connect } from 'react-redux'
import { compose } from 'redux'
import {handleClickLogin, handleClickSubjects, handleClickReviews} from '../Actions/navigationActions'
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

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Tutr
          </Typography>
          <Button onClick={handleClickLogin} color="inherit">
            {props.currentUser ? 'Log Out' : 'Login/Sign Up'}
          </Button>
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
          <ListItem button >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>
          <Divider />

          <ListItem button>
            <ListItemIcon>
              <AccessAlarmIcon />
            </ListItemIcon>
            <ListItemText primary="My Schedule" />
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
          <UserPage />
          {props.navigation.login ? <Login /> : null}
          {props.navigation.subjects ? <Subjects /> : null}
          {props.navigation.reviews ? <Reviews /> : null}
          {props.navigation.tutors ? <Users /> : null}
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
    dispatchReviews: () => dispatch(handleClickReviews())
  }
}




export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps))(Navigation)
