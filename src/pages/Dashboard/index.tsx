import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, View, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import { Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons'; 
import {useNavigation} from '@react-navigation/native';

import Carousel from 'react-native-snap-carousel';

import {LogoutButton, LogoutButtonText} from './styles';

const Dashboard: React.FC = () => {
    const navigation = useNavigation();

    const carouselItens = [
      {
        title: 'Casal com gravida',
        image: 'https://images.pexels.com/photos/4598109/pexels-photo-4598109.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      },
      {
        title: 'Filha beijando barriga da mãe',
        image: 'https://images.pexels.com/photos/160776/maternity-baby-belly-pregnant-pregnancy-160776.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      },
      {
        title: 'Gravida com roupa branca',
        image: 'https://images.pexels.com/photos/3330705/pexels-photo-3330705.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      },
    ];

    function renderImages({item}: any) {
      return (
        <View style={styles.carouselContainer}>
          <Text style={styles.carouselTitle}>{item.title}</Text>
          <Image style={styles.carouselImage} source={{uri: `${item.image}`}}/>
        </View>
      )
    }

    const styles = StyleSheet.create({
        card: {
          display: 'flex',
          backgroundColor: '#e54b4b',
          borderBottomRightRadius: 60,
          borderBottomLeftRadius: 60,
          alignItems: 'center'
        },
        carouselContainer: {
          backgroundColor: '#333',
          borderRadius: 4,
          height: 300,
          padding: 20,
          marginTop: 20,
        },
        carouselTitle: {
          fontSize: 21,
          fontWeight: 'bold',
          color: '#FFF',
        },
        carouselImage: {
          width: '100%',
          height: 200,
          borderRadius: 4,
        },
        background: {
          flex: 1,
          backgroundColor: '#f7ebe8',
        },
        cardHeader: {
          marginTop: 45,
          fontSize: 30,
          color: '#FFF',
        },
        cardMessage: {
          color: '#FFF',
          marginTop: 90
        },
        cardValue: {
          color: '#FFF',
          fontSize: 25
        },
        cardChoice: {
          color: '#FFF',
          fontSize: 20,
          marginTop: 100
        },
        choicesContainer: {
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: "space-evenly",
        },
        textChoices: {
          color: '#FFF',
        },
        btnChoice: {
          marginTop: 10,
          width: 90,
          height: 40,
      
        },
        cardInfo: {
          flex: 1,
          alignItems: 'center'
        },
        btnList: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
          marginTop: 25
        },
        btnStyle: {
          backgroundColor: '#444140',
          width: 50,
          height: 50
        },
        listContent: {
          display: 'flex',
          width: '90%',
          justifyContent: "space-evenly",
        },
        itenList: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FFF',
          width: '100%',
          height: 50,
          alignItems: 'center',
          paddingRight: 10,
          paddingLeft: 10,
          marginTop: 30,
        }
      });

    return (
      <ScrollView>
        <View style={styles.background}>
          <StatusBar style="light"/>
          <View style={styles.card}>
            <Text style={styles.cardHeader}>Bem vindo, Mamãe</Text>

            <Carousel 
              layout={'tinder'}
              layoutCardOffset={10}
              data={carouselItens}
              sliderWidth={300}
              itemWidth={300}
              renderItem={renderImages}
            />
    
    
    
            <Text style={styles.cardChoice}>ESCOLHER PERÍODO:</Text>
    
            <View style={styles.choicesContainer}>
              <TouchableOpacity style={styles.btnChoice}>
                <Text style={styles.textChoices}>Hoje</Text>
              </TouchableOpacity>
    
              <TouchableOpacity style={styles.btnChoice}>
                <Text style={styles.textChoices}>Essa Semana</Text>
              </TouchableOpacity>
    
              <TouchableOpacity style={styles.btnChoice}>
                <Text style={styles.textChoices}>Esse Mês</Text>
              </TouchableOpacity>
            </View>
    
          </View>
    
          <View style={styles.cardInfo}>
    
            <View style={styles.btnList}>
              <Button icon={{ name: 'flight', color: '#FFF' }} buttonStyle={styles.btnStyle} />
              <Button icon={{ name: 'home', color: '#FFF' }} buttonStyle={styles.btnStyle} />
              <Button icon={{ name: 'local-dining', color: '#FFF' }} buttonStyle={styles.btnStyle} />
              <Button icon={{ name: 'directions-car', color: '#FFF' }} buttonStyle={styles.btnStyle} />
              <Button icon={{ name: 'build', color: '#FFF' }} buttonStyle={styles.btnStyle} />
            </View>

    
            <View style={styles.listContent}>
              <View style={styles.itenList}>
                <Text>Pizza (R$ 30)</Text>
                <Text>20/01/2020</Text>
              </View>
              <View style={styles.itenList}>
                <Text>Coca-Cola (R$ 10)</Text>
                <Text>20/01/2020</Text>
              </View>
            </View>

            <LogoutButton onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={20} color="#444140" />
              <LogoutButtonText>Sair</LogoutButtonText>
            </LogoutButton>
          </View>
    
    
    
        </View>
        </ScrollView>
      );
    }
    
    


export default Dashboard;