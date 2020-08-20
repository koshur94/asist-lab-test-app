import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  }
}));

export const Card = ({data, type}) => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <div className={classes.root}>
      <Paper className={classes.paper}> 
        <Link
          to={`/${type}/${data.id}`}
          className={classes.link}
          >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar>{data.userId}</Avatar>
            </Grid>
            <Grid item xs>
              <Typography>{data.title}</Typography>
            </Grid>
          </Grid>
        </Link>
      </Paper>
    </div>
    </Grid>
  );
}
