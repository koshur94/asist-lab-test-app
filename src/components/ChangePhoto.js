import React, { useContext, useState, useRef, Fragment } from 'react';
import { Context } from '../context/Context';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ChangeIcon from '@material-ui/icons/Autorenew';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export const ChangePhoto = ({ image }) => {
  const classes = useStyles();
  const { changePhoto } = useContext(Context);
  const [photo, setPhoto] = useState('');

  const inputEl = useRef(null);

  const handleImageChange = event => {
    const blobFile = inputEl.current.files[0];
    
    let reader = new FileReader();
    reader.readAsDataURL(blobFile);
    reader.onload = e => {
      console.log(e.target.result);
      setPhoto(e.target.result);
    };
  };
  
  const handleClickInput = () => {
    inputEl.current.click()
  };

  const handleChangePhoto = () => {
    const photoData = {
      albumId: image.albumId,
      id: image.id,
      title: image.title,
      url: photo,
      thumbnailUrl: photo
    };
    console.log(photoData);
    changePhoto(image.albumId, photoData);
    setPhoto('');
  }

  return (
    <Fragment>
      <input
        ref={inputEl}
        type='file'
        hidden='hidden'
        onChange={handleImageChange}
      />
      <IconButton aria-label={`Edit image`} onClick={handleClickInput} className={classes.icon}>
        <ChangeIcon color='action' />
      </IconButton>
      <Button type='submit' onClick={handleChangePhoto} color='default'>{'Send'}</Button>
    </Fragment>
  )
}