import React, { useContext } from 'react';
import { Context } from '../context/Context';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '35ch',
      },
    },
  },
}));

export const Search = () => {
  const classes = useStyles();
  const { searchPosts } = useContext(Context);

  const handleChange = event => {
    searchPosts(event.target.value);
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search in posts…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
      />
    </div>
  )
}