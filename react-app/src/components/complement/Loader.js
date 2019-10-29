import React from 'react';
import { makeStyles } from '@material-ui/core';

import doubleRing from '../../images/double-ring.gif';

const useStyles = makeStyles({
  loadingGif: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100px',
    height: '100px',
    margin: '-50px 0px 0px -50px'
  }
});

const Loader = () => {
  const classes = useStyles();
  return <img src={doubleRing} alt="loading" className={classes.loadingGif} />;
};

export default Loader;
