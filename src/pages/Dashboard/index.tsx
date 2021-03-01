/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import firebase from 'firebase';
import 'firebase/firestore';
import { AdMobBanner } from 'expo-ads-admob';

import Carousel from 'react-native-snap-carousel';

import imgUserIcon from '../../assets/user.png';

import {
  Container,
  Header,
  UserAvatar,
  WelcomeText,
  DrawerMenuButton,
  CarouselCard,
  AdMobContainer,
  CarouselContainer,
  ImageBannerCard,
  TitleBannerCard,
  DescriptionBannerCard,
  LogoutButton,
} from './styles';

interface User {
  name: string | undefined | null;
  photoUrl: string | undefined | null;
}

interface ItemProps {
  title: string;
  text: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigation();
  const dbFirestore = firebase.firestore();
  const [userInfo, setUserInfo] = useState<User>({} as User);
  const [indexCarousel, setIndexCarousel] = useState(0);
  const [carouselTeste, setCarouselTeste] = useState({
    activeIndex: 0,
    carouselItems: [
      {
        title: "O que fazer no primeiro trimestre ?",
        text: "A maioria dos remédios não foram testados durante a gravidez e por isso não se sabe se são seguros para a mãe e para o bebê. Alguns passam pela placenta e podem causar graves alterações, como é o caso do Roacutan. Normalmente os únicos remédios que a grávida pode tomar são a Novalgina e o Paracetamol.",
      },
      {
        title: "Item 2",
        text: "Text 2",
      },
      {
        title: "Item 3",
        text: "Text 3",
      },
      {
        title: "Item 4",
        text: "Text 4",
      },
      {
        title: "Item 5",
        text: "Text 5",
      },
    ]
  });

  const renderCarouselItem = ({ item, index }: { item: ItemProps; index: number }) => {
    return (
      <CarouselCard>
        <ImageBannerCard source={{ uri: 'https://images.pexels.com/photos/3662773/pexels-photo-3662773.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' }} />
        <TitleBannerCard>{item.title}</TitleBannerCard>
        <DescriptionBannerCard>{item.text}</DescriptionBannerCard>
      </CarouselCard>
    );
  };


  useEffect(() => {
    const user = {
      name: firebase.auth().currentUser?.displayName,
      photoUrl: firebase.auth().currentUser?.photoURL,
    };
    setUserInfo(user);
  }, []);

  const handleNavProfileUpdate = useCallback(() => {
    navigate.navigate('ProfileUpdate');
  }, [navigate]);

  const handleNavLogOff = useCallback(() => {
    firebase.auth().signOut();
  }, []);

  return (
    <Container>
      <Header>
        <DrawerMenuButton onPress={() => navigate.dispatch(DrawerActions.toggleDrawer())}>
          <FontAwesome5
            name="grip-lines"
            size={30}
            color="#FE637A"
          />
        </DrawerMenuButton>

        <WelcomeText>
          Olá, {` ${userInfo?.name}`}
        </WelcomeText>
      </Header>

      <CarouselContainer>
        <Carousel
          layout="default"
          data={carouselTeste.carouselItems}
          sliderWidth={100}
          itemWidth={400}
          renderItem={renderCarouselItem}
          onSnapToItem={(index: number) => setIndexCarousel(index)}
        />
      </CarouselContainer>

      {userInfo.photoUrl ? (
        <UserAvatar
          source={{
            uri: `${userInfo.photoUrl}`,
          }}
        />
      ) : (
          <UserAvatar source={imgUserIcon} />
        )}

    </Container>
  );
};

export default Dashboard;
