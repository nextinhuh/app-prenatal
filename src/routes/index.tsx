import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import * as SplashScreen from 'expo-splash-screen';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import AuthFirstLoginRoutes from './authFirstLogin.routes';

const Routes: React.FC = () => {
  const [userStatusLogged, setUserStatusLogged] = useState<React.FC>(AppRoutes);
  const [loading, setLoading] = useState(true);
  const dbFirestore = firebase.firestore();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    firebase.auth().onAuthStateChanged(async status => {
      if (status) {
        await dbFirestore
          .collection('users')
          .doc(firebase.auth().currentUser?.uid)
          .get()
          .then(async result => {
            if (result.data()?.firstLogin) {
              let userName: any;

              if (result.exists) {
                userName = result.data();
              }

              await firebase.auth().currentUser?.updateProfile({
                displayName: userName.name,
              });

              await dbFirestore
                .collection('users')
                .doc(firebase.auth().currentUser?.uid)
                .update({ firstLogin: false })
                .then(() => {
                  setUserStatusLogged(AuthFirstLoginRoutes);
                  setLoading(false);
                  SplashScreen.hideAsync();
                });
            } else {
              setUserStatusLogged(AuthRoutes);
              setLoading(false);
              SplashScreen.hideAsync();
            }
          });
      } else {
        setUserStatusLogged(AppRoutes);
        setLoading(false);
        SplashScreen.hideAsync();
      }
    });
  }, []);

  return <>{loading ? null : userStatusLogged}</>;
};

export default Routes;
