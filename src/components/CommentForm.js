import React, { useState, useContext, Fragment } from 'react';
import { Context } from '../context/Context';
import { makeStyles } from '@material-ui/core/styles';
import Progress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  button: {
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '95%',
  },
  textField: {
    margin: '5px auto 5px auto',
    width: '95%'
  },
}));

const initialState = {
  name: '',
  email: '',
  body: ''
}

export const CommentForm = ({id}) => {
  const classes = useStyles();
  const { postComment, loading } = useContext(Context);
  const [commentData, setCommentData] = useState(initialState);

  const handleChange = event => {
    setCommentData({
      ...commentData,
      [event.target.name]: event.target.value
    })
  };

  const handleSubmit = event => {
    event.preventDefault();
    postComment(id, commentData);
    setCommentData(initialState);
}

  const { name, email, body } = commentData;

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className={classes.form} >
        <TextField
            id='name'
            name='name'
            type='text'
            label='Nickname'
            className={classes.textField}
            value={name}
            onChange={handleChange}
            required
            fullWidth />
        <TextField
            id='email'
            name='email'
            type='email'
            label='Email'
            className={classes.textField}
            value={email}
            onChange={handleChange}
            required
            fullWidth />
        <TextField
            id='body'
            name='body'
            type='text'
            label='Comment'
            multiline
            rows='3'
            className={classes.textField}
            value={body}
            onChange={handleChange}
            required
            fullWidth />
        <Button
            type='submit'
            variant='contained'
            className={classes.button}
            disabled={loading}
        >
            Submit
            {loading && (
                <Progress size={20} className={classes.progress} />
            )}
        </Button>
      </form>
    </Fragment>
  )
}