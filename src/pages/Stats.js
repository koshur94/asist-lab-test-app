import React, { useContext, useEffect, Fragment } from 'react';
import { Context } from '../context/Context';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { VictoryPie } from 'victory';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    margin: theme.spacing(2),
    textAlign: 'center',
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}
));

export const Stats = () => {
  const { title, setTitle, getPosts, getAlbums, posts, albums } = useContext(Context);

  const classes = useStyles();

  useEffect(() => {
    getPosts();
    getAlbums();
    setTitle('Statistics');
    // eslint-disable-next-line    
  }, [])

  return (
    <Fragment>
      <Typography className={classes.title} variant="h6">
        {title}
      </Typography>
      <VictoryPie
        name = "series-1"
        padding={{ top: 20, bottom: 60 }}
        colorScale={[ "orange", "navy" ]}
        height={200}
        data={[
          { x: "Posts", y: posts.length },
          { x: "Albums", y: albums.length },
        ]}
      />
    </Fragment>
    
  )
}