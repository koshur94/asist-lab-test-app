import React, { useState, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));

export const DeletePost = ({id}) => {
  const classes = useStyles();
  const { deletePost } = useContext(Context);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const deleteThisPost = () => {
    deletePost(id);
    setOpen(false);
  };
  

  return (
    <Fragment>
      <MenuItem onClick={handleOpen}>
        Delete post
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='sm'
        >
          <DialogTitle>
            Are you sure you want delete this post?
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={deleteThisPost} color='secondary'>
              <Link to='/posts' className={classes.link}>
                Delete
              </Link>
            </Button>
          </DialogActions>
      </Dialog>
    </Fragment>
  )
}