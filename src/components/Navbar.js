import React, { useContext } from 'react';
import { Context } from '../context/Context';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import NavDrawer from './NavDrawer';
import { Search } from './Search';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const Navbar = () => {
  const { title } = useContext(Context)
  const classes = useStyles();
  const showSearch = window.location.pathname === '/posts';
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NavDrawer />
          <Typography className={classes.title} variant="h6" noWrap>
            {title}
          </Typography>
          {showSearch && <Search />}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;