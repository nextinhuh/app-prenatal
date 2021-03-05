/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import firebase from 'firebase';
import 'firebase/firestore';
import { AdMobBanner } from 'expo-ads-admob';
import Timeline from 'react-native-timeline-flatlist';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import imgUserIcon from '../../assets/user.png';
import imgDegrade1 from '../../assets/degrade1.png';
import imgDegrade2 from '../../assets/degrade2.png';

import TestButton from '../../components/Button';

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
  CarouselContainer2,
  CarouselCard2,
  TitleBannerCard2,
  Line,
  DividerContainer,
  SelectWeekButtonContainer,
  SelectWeekButton,
  SelectWeekCountText,
  SelectWeekText,
  ContainerButton,
  BackgroudImage,
  FilledCircle,
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
  const refCarousel = React.createRef<Carousel<ItemProps>>();
  const refCarousel2 = React.createRef<Carousel<ItemProps>>();
  const dbFirestore = firebase.firestore();
  const [userInfo, setUserInfo] = useState<User>({} as User);
  const [indexCarousel, setIndexCarousel] = useState(1);
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
  const [carouselTeste2, setCarouselTeste2] = useState({
    activeIndex: 0,
    carouselItems: [
      {
        title: "1",
        text: "Text 2",
      },
      {
        title: "2",
        text: "Text 2",
      },
      {
        title: "3",
        text: "Text 2",
      },
      {
        title: "4",
        text: "Text 2",
      },
      {
        title: "5",
        text: "Text 2",
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

  const renderCarouselItem2 = ({ item, index }: { item: ItemProps; index: number }) => {
    return (
      <DividerContainer>
        <Line />
        <CarouselCard2>
          <TitleBannerCard2>{item.title}</TitleBannerCard2>
        </CarouselCard2>
        <Line />
      </DividerContainer>
    );
  };

  useEffect(() => {
    const user = {
      name: firebase.auth().currentUser?.displayName,
      photoUrl: firebase.auth().currentUser?.photoURL,
    };
    setUserInfo(user);
  }, []);

  const handleChangeCardMovingTimeLine = useCallback((index: number) => {

    refCarousel.current?.snapToItem(index);
    refCarousel2.current?.snapToItem(index);
    setIndexCarousel(index + 1);
  }, [refCarousel, refCarousel2]);
  const handleChangeCardMovingTimeLine1 = useCallback((index: number) => {

    refCarousel.current?.snapToItem(index);
    setIndexCarousel(index + 1);
  }, [refCarousel]);
  const handleChangeCardMovingTimeLine2 = useCallback((index: number) => {

    refCarousel2.current?.snapToItem(index);
    setIndexCarousel(index + 1);
  }, [refCarousel2]);

  const handleChangeWeekNumberForMore = useCallback((index: number) => {
    if (index < carouselTeste.carouselItems.length) {
      setIndexCarousel(index + 1);
      handleChangeCardMovingTimeLine(index);
    }
  }, [handleChangeCardMovingTimeLine, carouselTeste]);

  const handleChangeWeekNumberForLess = useCallback((index: number) => {
    if (index > 1) {
      setIndexCarousel(index - 1);
      handleChangeCardMovingTimeLine(index - 2);
    } else if (index === 1) {
      setIndexCarousel(index);
      handleChangeCardMovingTimeLine(index - 1);
    }
  }, [handleChangeCardMovingTimeLine])

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
          ref={refCarousel}
          onSnapToItem={(index: number) => handleChangeCardMovingTimeLine2(index)}
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

      <CarouselContainer2>
        <Carousel
          layout="default"
          data={carouselTeste2.carouselItems}
          sliderWidth={350}
          itemWidth={80}
          renderItem={renderCarouselItem2}
          ref={refCarousel2}
          onSnapToItem={(index: number) => handleChangeCardMovingTimeLine1(index)}
        />
      </CarouselContainer2>

      <SelectWeekButtonContainer>
        <ContainerButton>
          <BackgroudImage source={imgDegrade2} imageStyle={{ borderRadius: 70 }} resizeMode="cover">
            <SelectWeekButton onPress={() => handleChangeWeekNumberForMore(indexCarousel)}>
              <Ionicons
                name="ios-arrow-up"
                size={30}
                color="white"
              />
            </SelectWeekButton>

            <SelectWeekCountText style={{ textShadowOffset: { width: 2, height: 3 }, textShadowRadius: 10, textShadowColor: '#223322' }}>{indexCarousel}</SelectWeekCountText>
            <SelectWeekText style={{ textShadowOffset: { width: 2, height: 3 }, textShadowRadius: 10, textShadowColor: '#223322' }}>Semanas</SelectWeekText>

            <SelectWeekButton onPress={() => handleChangeWeekNumberForLess(indexCarousel)}>
              <Ionicons
                name="ios-arrow-down"
                size={30}
                color="white"
              />
            </SelectWeekButton>
          </BackgroudImage>
        </ContainerButton>

      </SelectWeekButtonContainer>


    </Container>
  );
};

export default Dashboard;
