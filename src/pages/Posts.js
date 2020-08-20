import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Context } from '../context/Context';
import { Card } from '../components/Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Progress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Pagination from '../components/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: `${theme.spacing(1)}px auto`,
    textDecoration: 'none',
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
  results: {
    flexGrow: 1,
    margin: theme.spacing(2),
    textAlign: 'center',
  }
}
));

export const Posts = () => {
  const { getPosts, setTitle, posts, loading, title } = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const classes = useStyles();

  useEffect(() => {
    getPosts();
    setTitle('Feed');
    // eslint-disable-next-line    
  }, [])

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleChangePagination = (event, value) => {
    setCurrentPage(value);
  }

  const postType = 'posts';
  const time = Math.floor(Math.random() * 100) / 100;

  return (
    <Fragment>
      <Typography className={classes.title} variant="h6">
        {title}
      </Typography>
      { loading ?
        <div className={classes.loading}>
          <Progress size={50} />
        </div>
      : <Fragment>
          <Typography className={classes.results} variant="subtitle2">
            { posts.length > 0 ? `About ${posts.length} results... (${time} seconds)` : 'Your search did not match any documents...'}
          </Typography>
          <div className={classes.root}>
            {currentPosts.map(post => (
              <Card data={post} type={postType} key={post.id} />
            ))}
              <Grid container justify="center" alignItems="center">
              <Pagination perPage={postsPerPage} total={posts.length} page={currentPage} onChange={handleChangePagination} />
            </Grid>
          </div>
      </Fragment>
      }
    </Fragment>
  )
}