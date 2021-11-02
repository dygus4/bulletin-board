/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import { NotFound } from '../NotFound/NotFound';
import ImageUploader from 'react-images-upload';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { fetchEditPost, getPost, fetchPost } from '../../../redux/postsRedux';

import styles from './PostEdit.module.scss';

class Component extends React.Component {

  state = {
    post: {
      _id: this.props.isLoading._id,
      title: this.props.isLoading.title,
      text: this.props.isLoading.text,
      price: this.props.isLoading.price,
      photo: this.props.isLoading.photo,
      author: this.props.isLoading.author,
      location: this.props.isLoading.location,
      phone: this.props.isLoading.phone,
      status: this.props.isLoading.status,
      created: this.props.isLoading.created,
      updated: this.props.isLoading.updated,
    },
  };


  handleChange = (event) => {
    const { post } = this.state;

    this.setState({
      post: { ...post, [event.target.name]: event.target.value },
    });
  };

  handleChangePrice = (event) => {
    const { post } = this.state;

    this.setState({
      post: { ...post, [event.target.name]: parseInt(event.target.value) },
    });
    console.log('this.state', this.state);
  };

  handleImage = (files) => {
    const { post } = this.state;
    console.log('files', files[0].name);

    if (files !== undefined)
      this.setState({ post: { ...post, photo: files[0].name } });
  };

  submitForm = (event) => {
    const { post } = this.state;
    const { editPost } = this.props;
    event.preventDefault();

    //if (post.title.length < 10) return alert('Min. 10 characters in title');
    //if (post.text.length < 20) return alert('Min. 20 characters in text');
    //if (post.price <= 0) return alert('Wrong price');
    //const authorPattern = new RegExp(
    //  '^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9_.-]+.{1,3}[a-zA-Z]{2,4}'
    //);
    //const authorMatched = post.author.match(authorPattern);
    //const authorMatchedJoined = (authorMatched || []).join('');
    //if (authorMatchedJoined.length < post.author.length)
    //  return alert('Wrong format email');

    //if (
    //  post.title.length > 9 &&
    //  post.text.length > 19 &&
    //  post.author.length === authorMatchedJoined.length
    //) {
    // post._id = uniqid();
    post.updated = new Date().toISOString();
    editPost(post);

    //alert('Your post was edit.');
    //}
  };

  componentDidMount() {
    this.props.fetchOnePost();
  }
    
  render() {
    const { className, postById, user, isLoading } = this.props;
    const { post } = this.state;
    
    console.log('postById w postEdit', postById);
    
    if (isLoading) {
      return (
        <div>Loading</div>
      );
    }
    
    return (
      <div className={clsx(className, styles.root)}>
        <h2>Edit &quot;{postById.title}&quot; </h2>
        <Grid
          container
          spacing={3}
          className={styles.addContainer}
          justifyContent='center'
        >
          <Grid item xs={12} sm={9}>
            {user.active === true ? (
              <Paper className={styles.paperCard}>
                <form onSubmit={this.submitForm}>
                  <Typography variant='h6' gutterBottom align='center'>
                    Edit your announcement
                  </Typography>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField
                      required
                      defaultValue={postById.title}
                      name='title'
                      label='Title'
                      fullWidth
                      onChange={this.handleChange}
                      helperText='min. 10 characters'
                      className={styles.textInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField
                      required
                      defaultValue={postById.text}
                      name='text'
                      label='Describe'
                      fullWidth
                      multiline
                      onChange={this.handleChange}
                      helperText='min. 20 characters'
                    />
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField
                      required
                      defaultValue={postById.price}
                      name='price'
                      label='Price ($)'
                      fullWidth
                      type='number'
                      onChange={this.handleChangePrice}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField
                      required
                      defaultValue={postById.author}
                      name='author'
                      label='Email address'
                      fullWidth
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField
                      defaultValue={postById.phone}
                      name='phone'
                      label='Phone number'
                      fullWidth
                      type='number'
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <TextField
                      defaultValue={postById.location}
                      name='location'
                      label='Localization'
                      fullWidth
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <FormControl required fullWidth variant='filled'>
                      <InputLabel id='demo-simple-select-label'>
                        Status
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        fullWidth
                        name='Published'
                        value={post.status}
                        onChange={this.handleChange}
                      >
                        <MenuItem value='draft'>Draft</MenuItem>
                        <MenuItem value='published'>Published</MenuItem>
                        <MenuItem value='finished'>Finished</MenuItem>
                      </Select>
                    </FormControl>
                    <FormHelperText>
                      Choose status your announcement
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <Typography variant='body1' gutterBottom align='center'>
                      Add photo
                    </Typography>
                    <Typography variant='body2' gutterBottom align='center'>
                      Your photo: {postById.photo}
                    </Typography>
                    <ImageUploader
                      withIcon={true}
                      buttonText='Choose image'
                      imgExtension={['.jpg', '.gif', '.png', '.gif']}
                      maxFileSize={5242880}
                      withPreview={true}
                      onChange={this.handleImage}
                      singleImage={true}
                      className={styles.file}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={9}
                    className={styles.paperCard__item}
                    align='center'
                  >
                    <Button
                      variant='outlined'
                      type='submit'
                      color='secondary'
                      className={styles.paperCard__btn}
                    >
                      Save
                    </Button>
                  </Grid>
                </form>
              </Paper>
            ) : (
              <NotFound />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  postById: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  addPost: PropTypes.func,
  editPost: PropTypes.func,
  user: PropTypes.object,
  fetchOnePost: PropTypes.func,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state, props) => ({
  postById: getPost(state),
  user: state.user,
  isLoading: state.posts.loading.active,
});

const mapDispatchToProps = (dispatch, props) => ({
  editPost: (post) => dispatch(fetchEditPost(post)),
  fetchOnePost: () => dispatch(fetchPost(props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export { Container as PostEdit, Component as PostEditComponent };