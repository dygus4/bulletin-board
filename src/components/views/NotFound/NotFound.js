import React from 'react';
import PropTypes from 'prop-types';

import styles from './NotFound.module.scss';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Component = ({className, children}) => (
  <Paper className={styles.root} elevation={3}>
    <Grid  justifyContent='center'>
      <Grid item >
        <Typography variant="h4" gutterBottom component="div" className={styles.title}>
          <h2>Not Found</h2>
        </Typography>
      </Grid>
      <Grid item className={styles.button2}>
        <Button
          className={styles.button}
          variant='contained'
          color='primary'
          component={Link}
          to={'/'}
        >
          Homepage
        </Button>
      </Grid>
    </Grid>

  </Paper>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};


export {
  Component as NotFound,
  // Container as NotFound,
  Component as NotFoundComponent,
};
