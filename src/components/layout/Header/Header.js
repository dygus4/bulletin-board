import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getStatus } from '../../../redux/userSwitcherRedux.js';

import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { yellow } from '@material-ui/core/colors';
import AccountCircle from '@material-ui/icons/AccountCircle';
//import Switch from '@material-ui/core/Switch';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import FormGroup from '@material-ui/core/FormGroup';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Component = ({ className, children, userStatus }) => {
  const classes = useStyles();

  

  return (
    <div className={clsx(className, styles.root)}>
      
      <AppBar position='static'>
        <Toolbar className={styles.toolbar}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            component={Link}
            to={'/'}
          >
            <HomeIcon style={{ color: yellow[500] }} />
          </IconButton>
          
          <Typography variant='h6' className={classes.title}>
            
            Announcements
          </Typography>

          {!userStatus && (
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                color='inherit'
                href='https://google.com'
              >
                <AccountCircle /> Login
              </IconButton>
            </div>
          )}
          {userStatus && (
            <div>
              <Link to={'/'} className={styles.link}>
                Your Announcements
              </Link>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                color='inherit'
                component={Link}
                to={'/'}
              >
                

                <AccountCircle />
                Logout
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>

      {children}
    </div>
  );
};


Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  userStatus: PropTypes.bool,
};

const mapStateToProps = state => ({
  userStatus: getStatus(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  //Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
