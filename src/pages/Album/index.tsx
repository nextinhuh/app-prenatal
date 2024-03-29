/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import Header from '../../components/Header';
import ModalTitleAlbum from '../../components/ModalTitleAlbum';
import { useTheme } from '../../hooks/theme';

import {
  Container,
  AlbumList,
  AlbumTitle,
  Image,
  ImageButton,
  ImageButtonDelete,
  CancelDeleteButton,
  DeleteButtonText,
  DeleteContainer,
  ConfirmDeleteButton,
  ImageContainer,
} from './styles';

type Albuns = Array<{
  id: string;
  uri: string;
  albumName: string;
}>;

const Album: React.FC = () => {
  const navigation = useNavigation();
  const { color } = useTheme();
  const [visibleModalNewAlbum, setVisibleModalNewAlbum] = useState(false);
  const [selectionDelete, setSelectionDelete] = useState(false);
  const [buttonDeleteActive, setButtonDeleteActive] = useState(true);
  const [selectedAlbuns, setSelectedAlbuns] = useState<string[]>([]);
  const [albumList, setAlbumList] = useState<Albuns>([]);
  const firebaseAuth = getAuth().currentUser;
  const firebaseFirestore = getFirestore();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert(
            'Desculpe, nós precisamos da permissão de câmera para isto funcionar!',
          );
        }
      }
    })();

    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert(
            'Desculpe, nós precisamos da permissão de câmera para isto funcionar!',
          );
        }
      }
    })();

    async function getListAlbuns() {
      /*await firebaseFirestore
        .collection('users')
        .doc(firebaseAuth?.uid)
        .collection('album')
        .get()
        .then(result => {
          const resultList: any = [];

          result.forEach((doc: any) => {
            if (doc.data()?.listPhotos) {
              resultList.push({
                id: doc.id,
                uri: doc.data().listPhotos[0].uri,
                albumName: doc.data().albumName,
              });
            } else {
              resultList.push({
                id: doc.id,
                uri: undefined,
                albumName: doc.data().albumName,
              });
            }
          });
          setAlbumList(resultList);
        });*/
    }

    getListAlbuns();
  }, [firebaseAuth, firebaseFirestore]);

  const getListAlbuns = useCallback(async () => {
    /*await firebaseFirestore
      .collection('users')
      .doc(firebaseAuth?.uid)
      .collection('album')
      .get()
      .then(result => {
        const resultList: any = [];

        result.forEach((doc: any) => {
          if (doc.data()?.listPhotos) {
            resultList.push({
              id: doc.id,
              uri: doc.data().listPhotos[0].uri,
              albumName: doc.data().albumName,
            });
          } else {
            resultList.push({
              id: doc.id,
              uri: undefined,
              albumName: doc.data().albumName,
            });
          }
        });
        setAlbumList(resultList);
      });*/
  }, [firebaseAuth, firebaseFirestore]);

  const handleAlbumAdd = useCallback(() => {
    setVisibleModalNewAlbum(!visibleModalNewAlbum);
  }, [setVisibleModalNewAlbum, visibleModalNewAlbum]);

  const showAlbumView = useCallback(
    (albumId: string) => {
      navigation.navigate('AlbumView', {
        albumId,
      });
    },
    [navigation],
  );

  const handleToggleSelectionDelete = useCallback(() => {
    // setVisibleMenu(false);
    setSelectionDelete(!selectionDelete);
    setButtonDeleteActive(!buttonDeleteActive);
    setSelectedAlbuns([]);
  }, [selectionDelete, buttonDeleteActive]);

  const handleSelectAlbumToDelete = useCallback(
    (id: string) => {
      if (selectedAlbuns.indexOf(id) > -1) {
        const selectedAlbunsUpdate = selectedAlbuns.filter(imageId => {
          return imageId !== id;
        });
        setSelectedAlbuns([...selectedAlbunsUpdate]);
        return;
      }

      selectedAlbuns.push(id);
      setSelectedAlbuns([...selectedAlbuns]);
    },
    [selectedAlbuns],
  );

  const confirmImagesDelete = useCallback(async () => {
    Alert.alert(
      'Tem certeza que deseja deletar esse(s) álbun(s) ?',
      '',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim, tenho certeza!',
          onPress: () => deleteAlbuns(),
        },
      ],
      { cancelable: false },
    );

    async function deleteAlbuns() {
      /*
      await firebaseFirestore
        .collection('users')
        .doc(firebaseAuth?.uid)
        .collection('album')
        .get()
        .then(result => {
          const batch = firebaseFirestore.batch();

          result.forEach(doc => {
            selectedAlbuns.map(album => {
              if (album === doc.id) {
                batch.delete(doc.ref);
              }
            });
          });

          Alert.alert('As fotos foram deletadas com sucesso!', '', [
            {
              text: 'Ok',
            },
          ]);

          firebaseFirestore
            .collection('users')
            .doc(firebaseAuth?.uid)
            .collection('album')
            .get()
            .then(result => {
              const resultList: any = [];
              result.forEach((doc: any) => {
                if (doc.data()?.listPhotos) {
                  resultList.push({
                    id: doc.id,
                    uri: doc.data().listPhotos[0].uri,
                    albumName: doc.data().albumName,
                  });
                } else {
                  resultList.push({
                    id: doc.id,
                    uri: undefined,
                    albumName: doc.data().albumName,
                  });
                }
              });
              setAlbumList(resultList);
            });

          handleToggleSelectionDelete();

          return batch.commit();
        });*/
    }
  }, [
    firebaseAuth,
    firebaseFirestore,
    handleToggleSelectionDelete,
    selectedAlbuns,
  ]);

  return (
    <Container>
      <Header
        title="ÁLBUNS DE FOTOS"
        borderWhiteColor={false}
        iconColor={color && color.colorTwo}
      >
        <TouchableOpacity onPress={handleAlbumAdd}>
          <MaterialCommunityIcons
            name="book-plus-multiple-outline"
            size={25}
            color={color ? color.colorTwo : '#f54f51'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleToggleSelectionDelete}>
          <AntDesign
            name="delete"
            size={25}
            color={color ? color.colorTwo : '#f54f51'}
          />
        </TouchableOpacity>
      </Header>

      {visibleModalNewAlbum && (
        <ModalTitleAlbum
          modalVisible={visibleModalNewAlbum}
          setVisibleState={handleAlbumAdd}
          updateAlbumList={getListAlbuns}
        />
      )}

      {selectionDelete ? (
        <DeleteContainer>
          <ConfirmDeleteButton onPress={confirmImagesDelete}>
            <DeleteButtonText style={{ color: color && color.colorTwo }}>
              Apagar
            </DeleteButtonText>
            <FontAwesome5
              name="check"
              size={22}
              color={color ? color.colorTwo : '#f54f51'}
            />
          </ConfirmDeleteButton>

          <CancelDeleteButton onPress={handleToggleSelectionDelete}>
            <DeleteButtonText style={{ color: color && color.colorTwo }}>
              Cancelar
            </DeleteButtonText>
            <FontAwesome5
              name="times"
              size={22}
              color={color ? color.colorTwo : '#f54f51'}
            />
          </CancelDeleteButton>
        </DeleteContainer>
      ) : null}

      <AlbumList
        data={albumList}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        extraData={selectedAlbuns}
        keyExtractor={(album: { id: any; }) => album.id}
        renderItem={({ item }: any) => (
          <ImageContainer>
            <ImageButton
              disabled={selectionDelete}
              onPress={() => showAlbumView(item.id)}
            >
              {item.uri ? (
                <Image
                  isSelected={selectedAlbuns.indexOf(item.id) > -1}
                  source={{ uri: item.uri }}
                />
              ) : (
                <MaterialCommunityIcons
                  name="image-off"
                  size={35}
                  color="black"
                  style={{ marginTop: 35 }}
                />
              )}

              <ImageButtonDelete
                disabled={buttonDeleteActive}
                onPress={() => handleSelectAlbumToDelete(item.id)}
              >
                {!buttonDeleteActive ? (
                  selectedAlbuns.indexOf(item.id) < 0 ? (
                    <FontAwesome5
                      name="square"
                      size={30}
                      color={color ? color.colorTwo : '#f54f51'}
                    />
                  ) : (
                    <FontAwesome5
                      name="check-square"
                      size={30}
                      color={color ? color.colorTwo : '#f54f51'}
                    />
                  )
                ) : null}
              </ImageButtonDelete>
              <AlbumTitle style={{ backgroundColor: color && color.colorTwo }}>
                {item.albumName}
              </AlbumTitle>
            </ImageButton>
          </ImageContainer>
        )}
      />
    </Container>
  );
};

export default Album;
