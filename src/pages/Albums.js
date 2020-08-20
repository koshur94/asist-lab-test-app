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
}));

export const Albums = () => {

  const albumType = 'albums';

  const { getAlbums, setTitle, albums, loading, title } = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);
  const [albumsPerPage] = useState(10);

  const classes = useStyles();

  useEffect(() => {
    getAlbums();
    setTitle('Albums');
    // eslint-disable-next-line    
  }, [])

  // Pagination
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  const handleChangePagination = (event, value) => {
    setCurrentPage(value);
  };

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
            { albums.length > 0 ? `About ${albums.length} results... (${time} seconds)` : 'Your search did not match any documents...'}
          </Typography>
          <div className={classes.root}>
            {currentAlbums.map(albums => (
                <Card data={albums} type={albumType} key={albums.id} />
            ))}
            <Grid container justify="center" alignItems="center">
              <Pagination perPage={albumsPerPage} total={albums.length} page={currentPage} onChange={handleChangePagination} />
            </Grid>
          </div>
      </Fragment>
      }
    </Fragment>
  )
}
