import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
  }
}));

export const Home = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Container fixed className={classes.container} >
        <Typography className={classes.header} variant="h6">
          Task:
        </Typography>
        <Typography component="div">
          Provide application that gives option to work with posts, albums and photos.
          As server need to use https://jsonplaceholder.typicode.com/.
          All application should provide option to display/update/delete/add photos.
          Use User material design framework.
          Posts, display list of posts + search. 
          When user clicks on every items - the next page should display info about post + list of comments.
          The same is for albums and photos - for every album display list of photos.
          User will have option to make comment under post.
          For every albums you should display list of photos, every photo should be displayed as popup.
          For posts and albums you need to provide statitics: display information as charts.
        </Typography>
      </Container>
    </Fragment>
  )
}

