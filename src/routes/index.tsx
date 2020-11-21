import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import BottomTabs from './bottom.tabs.routes';

const Routes: React.FC = () => {
  const [userStatus, setUserStatus] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(status => {
      if (status) {
        setUserStatus(true);
      } else setUserStatus(false);
    });
  }, []);

  return userStatus ? <AuthRoutes /> : <AppRoutes />;
};

export default Routes;
