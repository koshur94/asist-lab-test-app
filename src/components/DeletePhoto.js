import React, { useContext } from 'react';
import { Context } from '../context/Context';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export const DeletePhoto = ({ photo }) => {
  const classes = useStyles();
  const { deletePhoto } = useContext(Context);

  const deleteThisPhoto = () => {
    deletePhoto(photo);
  };

  return (
    <IconButton aria-label={`Delete image`} onClick={deleteThisPhoto} className={classes.icon}>
      <DeleteIcon color='action' />
    </IconButton>
  )
}