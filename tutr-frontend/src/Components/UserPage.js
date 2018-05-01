import React from 'react';
import PropTypes from 'prop-types';

//material ui
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
//

//redux
import { connect } from 'react-redux'
import { compose } from 'redux'
//

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),

});

function UserPage(props) {
  const { classes } = props;
  console.log('user page props', props)
  return (
    <div>
      {props.currentUser ?
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3">
            {`Welcome Back ${props.currentUser.username}!`}
          </Typography>
          
          <Typography component="p">
            Paper can be used to build surface or other elements for your application.
          </Typography>
        </Paper>

        :

        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3">
            Please Log In or Sign Up to Continue
          </Typography>
        </Paper>

        }

    </div>
  );
}



UserPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  currentUser: state.users.currentUser
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps))(UserPage);
