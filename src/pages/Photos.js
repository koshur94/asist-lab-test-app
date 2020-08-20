import React, { useEffect, useContext, useRef, useState, Fragment } from 'react';
import { Context } from '../context/Context';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Progress from '@material-ui/core/CircularProgress';
import { PhotoDialog } from '../components/PhotoDialog';
import { DeletePhoto } from '../components/DeletePhoto';
import { ChangePhoto } from '../components/ChangePhoto';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flexGrow: 1,
    margin: theme.spacing(2),
    textAlign: 'center',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  block: {
    maxHeight: 150,
    maxWidth: 150,
    position: 'relative',
  },
  footerPhoto: {
    position: 'absolute',
    top: '50%',
    left: 0,
    zIndex: 1,
    opacity: 0,
    textAlign: 'center',
    color: '#fff',
    transform: 'translate3d(0, -50%, 0)',
    transition: 'opacity .1s linear',
    '&:hover': {
      opacity: 1,
    },
  },
}));

export const Photos = ({match}) => {
  const classes = useStyles();
  const { getAlbum, setTitle, getPhotos, postPhoto,  album, photos, loading } = useContext(Context);
  const [photo, setPhoto] = useState('');
  const [titlePhoto] = useState('');
  const [fileName, setFileName] = useState('');

  const idNumber = match.params.id;

  const inputEl = useRef(null);

  useEffect(() => {
    getAlbum(idNumber);
    getPhotos(idNumber);
    setTitle('Photos');
    // eslint-disable-next-line 
  }, []);

  const handleChangeInput = () => {
    const blobFile = inputEl.current.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(blobFile);
    reader.onload = function (e) {
      setPhoto(e.target.result);
      setFileName(blobFile.name)
    };
  };
  
  const handleClickInput = () => {
    inputEl.current.click()
  };

  const handleAddPhoto = () => {
    const photoData = {
      albumId: idNumber,
      id: photos.length + 1,
      title: titlePhoto || 'Image',
      url: photo,
      thumbnailUrl: photo
    };
    postPhoto(idNumber, photoData);
    setPhoto('');
    setFileName('');
  };

  return (
    <Fragment>
      <div>
        <Typography className={classes.title} variant="h6">
          Album's name: {album.title}
        </Typography>
        <div className={classes.title}>
          <input ref={inputEl} type='file' hidden='hidden' onChange={handleChangeInput} />
          <Button type='submit' onClick={handleClickInput}>{fileName ? 'Ready to send' : 'Add photo to album'}</Button>
          {fileName}
          <Button type='submit' onClick={handleAddPhoto} color='secondary'>{fileName ? 'Send' : ''}</Button>
        </div>
      </div>
      { loading ?
        <div className={classes.loading}>
          <Progress size={50} />
        </div>
      : <Fragment>
        <div className={classes.root}>
          <GridList className={classes.gridList} >
            {photos.map((photo) => (
              <GridListTile key={photo.id + photo.title} className={classes.block}>
                <img src={photo.thumbnailUrl} alt={photo.title} />
                <div className={classes.footerPhoto}>
                  <ChangePhoto image={photo} />
                  <DeletePhoto photo={photo} />
                  <IconButton aria-label={`Open full image`} className={classes.icon}>
                    <PhotoDialog photo={photo}/>
                  </IconButton>
                </div>
              </GridListTile>
            ))}
          </GridList>
        </div>
      </Fragment>
      }
    </Fragment>
  )
}