import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Context } from '../context/Context';
import { CommentForm } from '../components/CommentForm';
import { makeStyles } from '@material-ui/core/styles';
import { DeletePost } from '../components/DeletePost';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Progress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { red } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    flexGrow: 1,
    margin: `${theme.spacing(1)}px auto`,
    padding: '10px',
    textDecoration: 'none',
  },
  avatar: {
    backgroundColor: red[500],
  },
  header: {
    textAlign: 'center',
  },
  separator: {
    width: '125px',
    opacity: '.4',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  title: {
    flexGrow: 1,
    margin: theme.spacing(2),
    textAlign: 'center',
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

export const Post = ({match}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const { getPost, setTitle, getComments, post, comments, loading, title } = useContext(Context);

  const idNumber = match.params.id;

  useEffect(() => {
    getPost(idNumber);
    getComments(idNumber);
    setTitle('Post');
    // eslint-disable-next-line 
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const actionButton = (
    <div>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component='a' href='#add' onClick={handleClose}>Add comment</MenuItem>
        <DeletePost id={idNumber} />
      </Menu>
    </div>
  )

  return (
    <Fragment>
      <Typography className={classes.title} variant="h6">
        {title}
      </Typography>
      { loading ?
        <div className={classes.loading}>
          <Progress size={50} />
        </div>
        : <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {post.userId}
            </Avatar>
          }
          action={actionButton}
          title={post.title}
          subheader={`Post #${post.id}`}
        />  
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.body}
          </Typography>
        </CardContent>
        <hr/>
        <Typography className={classes.header} variant="h6">
          Comments
        </Typography>
        {comments.map(comment => (
          <div key={comment.id}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe">
                  {comment.email.split('')[0].toUpperCase()}
                </Avatar>
              }
              title={comment.name}
              subheader={comment.email.toLowerCase()}
            />  
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {comment.body}
              </Typography>
            </CardContent>
            <hr className={classes.separator} />
          </div>
        ))}
        <Typography id='add' className={classes.header} variant="h6">
          Add new comment
        </Typography>
        <CommentForm id={idNumber} />
      </Card>
      }
    </Fragment>
  );
}