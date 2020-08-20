import React, { Fragment, useState, useContext } from 'react';
import {Context} from '../context/Context';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Progress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    margin: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  closeButton: {
      position: 'absolute',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  image: {
    width: '100%',
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    margin: theme.spacing(2),
    textAlign: 'center',
  },
}));

export const PhotoDialog = ({photo}) => {
  const classes = useStyles();
  const { loading } = useContext(Context);
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  
  const dialog = loading ? (
      <div className={classes.loading}>
        <Progress size={50} />
      </div>
    ) : (
        <img src={photo.url} alt='Profile' className={classes.image} />
    )

  return (
    <Fragment>
      <VisibilityIcon color='action' onClick={handleOpen} />
      <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth='sm'
      >
          <IconButton
              onClick={handleClose}
              className={classes.closeButton}
          >
              <CloseIcon/>
          </IconButton>
          <DialogContent className={classes.dialogContent}>
            <Typography className={classes.title} variant="h6">
              {photo.title}
            </Typography>
              {dialog}
          </DialogContent>
      </Dialog>
    </Fragment>
  )
}