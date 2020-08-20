import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialPagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    margin: '0 auto',
    padding: theme.spacing(2, 2),
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Pagination = ({ perPage, total, page, onChange }) => {
  const classes = useStyles();

  return (
    <Fragment>
      {total ? <div className={classes.root}>
        <MaterialPagination page={page} count={Math.ceil(total / perPage)} onChange={onChange} />
      </div>
      : null}
    </Fragment>
  );
}

export default Pagination;