import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes['main-header']}>
      <h1>A Typical Page</h1>
      {/* Here we are receiving isAuthenticated() and onLogout() via props and not using them. we just pass them to
      other component which is not ideal. we should avoid such prop chains.
      time to use react context
      */}
      <Navigation />
    </header>
  );
};

export default MainHeader;
