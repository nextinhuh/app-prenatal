import React, { useCallback, useState } from 'react';
import {
  View,
  useWindowDimensions,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, updateDoc, doc } from 'firebase/firestore';

import { LinearGradient } from 'expo-linear-gradient';
import {
  TabView,
  SceneMap,
  TabBar,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  Container,
  WelcomeContainer,
  WelcomeTitle,
  WelcomeText,
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useTheme } from '../../hooks/theme';

interface ThemeData {
  colorOne: string | undefined;
  colorTwo: string | undefined;
}

const Welcome: React.FC = () => {
  const { updateThemeColor, updateLogged } = useTheme();
  const layout = useWindowDimensions();
  const firebaseAuth = getAuth().currentUser;
  const dbFirestore = getFirestore();
  const navigate = useNavigation();

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDateOnPicker, setSelectedDateOnPicker] = useState('');
  const [selectedDropDown, setSelectedDropDown] = useState(
    'Selecione uma opção...',
  );
  const [show, setShow] = useState(false);
  const [index, setIndex] = React.useState(0);

  const onChangeDate = useCallback(
    (event: any, selectedDate: any) => {
      setShow(false);
      const currentDate = selectedDate || date;
      setDate(currentDate);

      const dd = String(currentDate.getDate()).padStart(2, '0');
      const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = currentDate.getFullYear();

      setSelectedDateOnPicker(`${dd} / ${mm} / ${yyyy}`);
    },
    [date],
  );

  const [routes] = React.useState([
    { key: 'first', title: 'Menstruação' },
    { key: 'second', title: 'Gênero' },
  ]);

  const FirstRoute = () => (
    <View style={{ height: '100%' }}>
      <Text
        style={{
          color: 'white',
          fontFamily: 'Montserrat_400Regular',
          fontSize: 15,
          textAlign: 'center',
          marginTop: 20,
          marginBottom: 15,
        }}
      >
        Qual a data da sua última menstruação ?
      </Text>

      <Input
        value={selectedDateOnPicker}
        onFocus={() => setShow(true)}
        textAlign="center"
        placeholder="Seleciona uma data.."
      />
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={(event, selectedDate) => onChangeDate(event, selectedDate)}
          dateFormat="dayofweek day month"
        />
      )}
    </View>
  );

  const SecondRoute = () => (
    <View style={{ height: '100%', alignItems: 'center' }}>
      <Text
        style={{
          color: 'white',
          fontFamily: 'Montserrat_400Regular',
          fontSize: 15,
          textAlign: 'center',
          marginTop: 20,
          marginBottom: 15,
        }}
      >
        Qual é o desejo dos pais quanto ao sexo da criança ?
      </Text>
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: NavigationState<any> },
  ) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: '#FFF',
        width: '20%',
        height: 4,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginLeft: '11%',
      }}
      style={{
        backgroundColor: '#FE3855',
        justifyContent: 'center',
      }}
      activeColor="#FFF"
      inactiveColor="gray"
      renderIcon={({ route, focused, color }) => (
        <>
          {route.key === 'first' ? (
            <Entypo name="drop" size={32} color={color} />
          ) : (
            <MaterialIcons name="child-care" size={32} color={color} />
          )}
        </>
      )}
    />
  );

  const handleSubmit = useCallback(async () => {
    if (selectedDateOnPicker !== '' && selectedDropDown !== '') {
      setLoading(true);
      let colorThemeObject: ThemeData;
      if (selectedDropDown === 'Menino') {
        updateThemeColor({
          colorOne: '#5787FF',
          colorTwo: '#5831CC',
        });
        colorThemeObject = {
          colorOne: '#5787FF',
          colorTwo: '#5831CC',
        };
      } else if (selectedDropDown === 'Menina') {
        updateThemeColor({
          colorOne: '#FAAFEB',
          colorTwo: '#D68BC7',
        });
        colorThemeObject = {
          colorOne: '#FAAFEB',
          colorTwo: '#D68BC7',
        };
      } else {
        updateThemeColor({
          colorOne: undefined,
          colorTwo: undefined,
        });
        colorThemeObject = {
          colorOne: undefined,
          colorTwo: undefined,
        };
      }

      const usersCollection = doc(dbFirestore, 'users', String(firebaseAuth?.uid));

      await updateDoc(usersCollection, {
        menstruationDate: selectedDateOnPicker,
        genderPreference: selectedDropDown,
        themeColor: colorThemeObject,
        firstLogin: false,
      }).then(() => {
        setLoading(false);
        navigate.navigate('Dashboard');
      });

      /*await dbFirestore
        .collection('users')
        .doc(firebaseAuth?.uid)
        .update({
          menstruationDate: selectedDateOnPicker,
          genderPreference: selectedDropDown,
          themeColor: colorThemeObject,
          firstLogin: false,
        })
        .then(() => {
          setLoading(false);
          navigate.navigate('Dashboard');
        });*/
    } else {
      Alert.alert('Porfavor, preencha as informações!', '', [
        {
          text: 'Ok',
        },
      ]);
    }
    setLoading(false);
  }, [
    dbFirestore,
    firebaseAuth,
    selectedDateOnPicker,
    selectedDropDown,
    navigate,
    updateThemeColor,
  ]);

  return (
    <Container>
      <LinearGradient
        colors={['#F74462', '#FE3855']}
        style={{
          width: '100%',
          height: 680,
          borderBottomLeftRadius: 70,
          borderBottomRightRadius: 70,
          alignItems: 'center',
        }}
      >
        <WelcomeContainer>
          <WelcomeTitle>BEM-VINDO(A)!</WelcomeTitle>

          <WelcomeText>
            Antes de tudo, precisamos de algumas informações sobre você!!
          </WelcomeText>

          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width, height: layout.height }}
            style={{
              width: '100%',
              marginBottom: 15,
            }}
            renderTabBar={renderTabBar}
            tabBarPosition="bottom"
          />
        </WelcomeContainer>
      </LinearGradient>

      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 25 }}
          size={40}
          color="#fd3954"
        />
      ) : (
        <Button
          icon="check"
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            marginBottom: 35,
            marginTop: 10,
          }}
          onPress={() => handleSubmit()}
        />
      )}
    </Container>
  );
};

export default Welcome;
