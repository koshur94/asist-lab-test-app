import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import PostIcon from '@material-ui/icons/RssFeed';
import AlbumIcon from '@material-ui/icons/PhotoAlbum';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function NavDrawer() {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({[anchor]: open });
  };

  const ListItemLink = props => <ListItem button component="a" {...props} />;

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Posts', 'Albums'].map((text, index) => (
          <ListItemLink button href={`/${text.toLowerCase()}`} key={text}>
            <ListItemIcon>{index % 2 === 0 ? <PostIcon /> : <AlbumIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemLink>
        ))}
      </List>
      <Divider />
      <List>
          <ListItemLink button href='/'>
            <ListItemIcon><InfoIcon /></ListItemIcon>
            <ListItemText primary={'Task'} />
          </ListItemLink>
      </List>
      <List>
          <ListItemLink button href='/stats'>
            <ListItemIcon><InfoIcon /></ListItemIcon>
            <ListItemText primary={'Statistics'} />
          </ListItemLink>
      </List>
    </div>
  );

  return (
    <div>
      <Fragment>
        <IconButton
          onClick={toggleDrawer('left', true)}
          edge="start"
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor={'left'}
          open={state.left}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
        </Drawer>
      </Fragment>
    </div>
  );
}
