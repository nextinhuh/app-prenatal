/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable radix */
import React, { useCallback, useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import 'firebase/firestore';

import ConsultList from '../../components/ConsultList';
import MedicalRecordAndPrescription from '../../components/MedicalRecordAndPrescription';
import Header from '../../components/Header';
import { useConsult } from '../../hooks/consults';

import imgUserIcon from '../../assets/user.png';

import {
  Container,
  UserAvatar,
  HeaderTitle,
  HeaderContainer,
  TabViewContainer,
} from './styles';

interface User {
  name: string | undefined | null;
  photoUrl: string | undefined | null;
}

const Consults: React.FC = () => {
  const firebaseAuth = firebase.auth().currentUser;
  const firebaseFirestore = firebase.firestore();
  const [userInfo, setUserInfo] = useState<User>({} as User);

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'ConsultList' },
    { key: 'MedicalRecordAndPrescription' },
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: '#FE3855',
        width: '20%',
        height: 4,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginLeft: '11%',
      }}
      style={{
        backgroundColor: 'rgb(242,242,242)',
        borderBottomLeftRadius: 45,
        borderBottomRightRadius: 45,
        elevation: 25,
      }}
      activeColor="#FE3855"
      inactiveColor="gray"
      renderIcon={({ route, focused, color }) => (
        <>
          {route.key === 'ConsultList' ? (
            <FontAwesome name="list-alt" size={32} color={color} />
          ) : (
            <FontAwesome5 name="book-medical" size={32} color={color} />
          )}
        </>
      )}
    />
  );

  const renderScene = SceneMap({
    ConsultList,
    MedicalRecordAndPrescription,
  });

  useEffect(() => {
    const user = {
      name: firebase.auth().currentUser?.displayName,
      photoUrl: firebase.auth().currentUser?.photoURL,
    };
    setUserInfo(user);
  }, [firebaseFirestore, firebaseAuth]);

  return (
    <Container>
      <HeaderContainer>
        <Header iconColor="#FFF" borderWhiteColor style={{ height: '18%' }}>
          <HeaderTitle>CONSULTAS</HeaderTitle>
        </Header>
      </HeaderContainer>

      {userInfo.photoUrl ? (
        <UserAvatar
          source={{
            uri: `${userInfo.photoUrl}`,
          }}
        />
      ) : (
        <UserAvatar source={imgUserIcon} />
      )}

      <TabViewContainer style={{ backgroundColor: 'rgb(242,242,242)' }}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </TabViewContainer>
    </Container>
  );
};

export default Consults;
