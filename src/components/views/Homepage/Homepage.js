/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Collapse from '@material-ui/core/Collapse';

import clsx from 'clsx';

import { connect } from 'react-redux';

// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { getAll, fetchPublished } from '../../../redux/postsRedux';

import styles from './Homepage.module.scss';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { getStatus } from '../../../redux/userSwitcherRedux';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Component = ({ className, postsAll, userStatus, fetchPublishedPosts }) => {
  
  const [expanded, setExpanded] = React.useState(false);

  const classes = useStyles();
 
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() =>{
    fetchPublishedPosts();
  });
  

  return (
    <div className={clsx(className, styles.root)}>
      

      {userStatus && (
        <div >
          <Link 
            className={styles.addCard} 
            to={'/post/add'} 
            variant='subtitle1' 
            color='secondary'
          >
            <Fab
              size='small'
              color='secondary'
              aria-label='add'
              variant='extended'
            >
              Add new
            </Fab>
          </Link>
        </div>
      )}
      <div className={styles.card}>
        {postsAll.map((post) => (
          <Card key={post._id} className={styles.card__item}>
            <CardHeader
              avatar={
                <Avatar aria-label='recipe' className={classes.avatar}>
                      
                </Avatar>
              }
              action={
                <IconButton aria-label='settings'>
                  <MoreVertIcon />
                </IconButton>
              }
              title={post.title}
              subheader={post.created}
            />

            <CardActionArea href={`/post/${post._id}`}>
              <CardMedia
                className={styles.image}
                component='img'
                image={post.photo}
                title={post.title}
              />
              <CardContent>
                
                <div className={styles.price}>
                  <Typography component='p' variant='subtitle2'>
                        Price: {post.price}
                  </Typography>
                  <Typography component='p' variant='subtitle2'>
                        Location: {post.location}
                  </Typography>
                </div>
              </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
              <IconButton aria-label='add to favorites'>
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label='share'>
                <ShareIcon />
              </IconButton>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label='show more'
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <CardContent>
                <Typography paragraph>{post.text}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </div>
        
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  userStatus: PropTypes.bool,
  fetchPublishedPosts: PropTypes.func,
  postsAll: PropTypes.objectOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
      created: PropTypes.string,
      updated: PropTypes.string,
      author: PropTypes.string,
      status: PropTypes.string,
      photo: PropTypes.string,
      price: PropTypes.string,
      phone: PropTypes.string,
      location: PropTypes.string,
    })
  ),
};

const mapStateToProps = (state) => ({
  postsAll: getAll(state),
  userStatus: getStatus(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};