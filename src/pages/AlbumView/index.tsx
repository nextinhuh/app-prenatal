/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useState } from 'react';
import ImageView from 'react-native-image-viewing';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import {
  Alert,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import Header from '../../components/Header';
import Button2 from '../../components/Button';
import ModalTitleAlbum from '../../components/ModalTitleAlbum';
import { useTheme } from '../../hooks/theme';

import {
  Container,
  AlbumList,
  Image,
  ImageButton,
  ImageButtonDelete,
  CancelDeleteButton,
  DeleteButtonText,
  DeleteContainer,
  ConfirmDeleteButton,
  ImageContainer,
  ModalContainer,
} from './styles';

type Images = Array<{
  id: string;
  uri: string;
}>;

interface Album {
  id: string;
  albumName: string;
  listPhotos: Images;
}

interface RouteParams {
  albumId: string;
}

const AlbumView: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { color } = useTheme();

  const [album, setAlbum] = useState<Album>({} as Album);

  const [visibleModalEditAlbum, setVisibleModalEditAlbum] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [selectionDelete, setSelectionDelete] = useState(false);
  const [buttonDeleteActive, setButtonDeleteActive] = useState(true);
  const [selectedImages, setSelectedIamges] = useState<string[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const firebaseAuth = getAuth().currentUser;
  const storageFirebase = getStorage();
  const firebaseFirestore = getFirestore();

  const routeParams = route.params as RouteParams;

  useEffect(() => {
    async function listImagesUrl() {
      /*await firebaseFirestore
        .collection('users')
        .doc(firebaseAuth?.uid)
        .collection('album')
        .doc(routeParams?.albumId)
        .get()
        .then(result => {
          if (result.data()?.listPhotos) {
            const album = {
              id: result.id,
              albumName: result.data()?.albumName,
              listPhotos: result.data()?.listPhotos,
            };
            setAlbum(album);
          } else {
            const album = {
              id: result.id,
              albumName: result.data()?.albumName,
              listPhotos: [] as Images,
            };
            setAlbum(album);
          }
        });*/
    }

    listImagesUrl();
  }, [firebaseAuth, firebaseFirestore, routeParams, color]);

  const handleAlbumEdit = useCallback(() => {
    setVisibleModalEditAlbum(!visibleModalEditAlbum);
  }, [setVisibleModalEditAlbum, visibleModalEditAlbum]);

  const handleGaleryPhotoPicker = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    /*
       if (!result.canceled) {
         setModalVisible(true);
         const image = await fetch(result.assets[0].uri);
         const blobImage = await image.blob();
         const time = new Date().getTime();

         const imageRef = storageFirebase
           .ref()
           .child(`album/${firebaseAuth?.uid}/${time}`);

         await imageRef.put(blobImage);

         let linkImage = '';

         await imageRef.getDownloadURL().then(url => {
           if (url) {
             linkImage = url;
           }
         });
         album?.listPhotos.push({
           id: time.toString(),
           uri: linkImage,
         });

         const listPhotos = album?.listPhotos;

         await firebaseFirestore
           .collection('users')
           .doc(firebaseAuth?.uid)
           .collection('album')
           .doc(routeParams?.albumId)
           .update({ listPhotos });

         setAlbum(album);
         setModalVisible(false);
       }*/
  }, [
    firebaseAuth,
    firebaseFirestore,
    storageFirebase,
    album,
    routeParams.albumId,
  ]);

  const handleTakePhoto = useCallback(async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    /*
        if (!result.canceled) {
          setModalVisible(true);
          const image = await fetch(result.assets[0].uri);
          const blobImage = await image.blob();
          const time = new Date().getTime();

          const imageRef = await storageFirebase
            .ref()
            .child(`album/${firebaseAuth?.uid}/${time}`);

          await imageRef.put(blobImage);

          let linkImage = '';

          await imageRef.getDownloadURL().then(url => {
            if (url) {
              linkImage = url;
            }
          });

          album?.listPhotos.push({
            id: time.toString(),
            uri: linkImage,
          });

          const listPhotos = album?.listPhotos;

          await firebaseFirestore
            .collection('users')
            .doc(firebaseAuth?.uid)
            .collection('album')
            .doc(routeParams?.albumId)
            .update({ listPhotos });

          setAlbum(album);
          setModalVisible(false);
        }*/
  }, [
    firebaseAuth,
    firebaseFirestore,
    storageFirebase,
    album,
    routeParams.albumId,
  ]);

  const handleAddPhoto = useCallback(() => {
    Alert.alert('', 'Favor escolha alguma das opções abaixo:', [
      {
        text: 'Cancelar',
      },
      { text: 'Tirar uma foto agora', onPress: handleTakePhoto },
      {
        text: 'Escolher uma foto da galeria',
        onPress: handleGaleryPhotoPicker,
      },
    ]);
  }, [handleGaleryPhotoPicker, handleTakePhoto]);

  const handleToggleImageView = useCallback(
    (index: any) => {
      setImageIndex(index);
      setIsVisible(!visible);
    },
    [visible],
  );

  const handleToggleSelectionDelete = useCallback(() => {
    setSelectionDelete(!selectionDelete);
    setButtonDeleteActive(!buttonDeleteActive);
    setSelectedIamges([]);
  }, [selectionDelete, buttonDeleteActive]);

  const handleSelectPicture = useCallback(
    (id: string) => {
      if (selectedImages.indexOf(id) > -1) {
        const selectedImagesUpdate = selectedImages.filter(imageId => {
          return imageId !== id;
        });
        setSelectedIamges([...selectedImagesUpdate]);
        return;
      }

      selectedImages.push(id);
      setSelectedIamges([...selectedImages]);
    },
    [selectedImages],
  );

  const confirmImagesDelete = useCallback(async () => {
    Alert.alert(
      'Tem certeza que deseja deletar essas fotos ?',
      '',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim, tenho certeza!',
          onPress: () => deletePhotos(),
        },
      ],
      { cancelable: false },
    );

    async function deletePhotos() {
      setModalVisible(true);
      /*
            await firebaseFirestore
              .collection('users')
              .doc(firebaseAuth?.uid)
              .collection('album')
              .doc(routeParams?.albumId)
              .get()
              .then(result => {
                result.data()?.listPhotos.map((photo: any) => {
                  selectedImages.map(idImagesToDelete => {
                    if (idImagesToDelete === photo.id) {
                      const imageRef = storageFirebase.refFromURL(photo.uri);
                      imageRef.delete();
                    }
                  });
                });

                const listPhotos = album?.listPhotos.filter(
                  photo => !selectedImages.includes(photo.id),
                );

                if (listPhotos.length > 0) {
                  firebaseFirestore
                    .collection('users')
                    .doc(firebaseAuth?.uid)
                    .collection('album')
                    .doc(routeParams?.albumId)
                    .update({ listPhotos });

                  Alert.alert('As fotos foram deletadas com sucesso!', '', [
                    {
                      text: 'Ok',
                    },
                  ]);

                  firebaseFirestore
                    .collection('users')
                    .doc(firebaseAuth?.uid)
                    .collection('album')
                    .doc(routeParams?.albumId)
                    .get()
                    .then(result => {
                      setAlbum(result.data() as Album);
                    });

                  handleToggleSelectionDelete();
                  setModalVisible(false);
                } else {
                  const { albumName } = album;
                  setAlbum({
                    id: album.id,
                    albumName,
                    listPhotos,
                  });
                  firebaseFirestore
                    .collection('users')
                    .doc(firebaseAuth?.uid)
                    .collection('album')
                    .doc(routeParams?.albumId)
                    .set({ albumName });

                  Alert.alert('As fotos foram deletadas com sucesso!', '', [
                    {
                      text: 'Ok',
                    },
                  ]);

                  handleToggleSelectionDelete();
                  setModalVisible(false);
                }
              });*/
    }
  }, [
    firebaseAuth,
    firebaseFirestore,
    selectedImages,
    storageFirebase,
    handleToggleSelectionDelete,
    routeParams.albumId,
    album,
  ]);

  const navBackResetRoute = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Album' }],
    });
  }, [navigation]);

  const updateAlbumTitle = useCallback(async () => {
    /*
    await firebaseFirestore
      .collection('users')
      .doc(firebaseAuth?.uid)
      .collection('album')
      .doc(routeParams?.albumId)
      .get()
      .then(result => {
        if (result.data()?.listPhotos) {
          const album = {
            id: result.id,
            albumName: result.data()?.albumName,
            listPhotos: result.data()?.listPhotos,
          };
          setAlbum(album);
        } else {
          const album = {
            id: result.id,
            albumName: result.data()?.albumName,
            listPhotos: [] as Images,
          };
          setAlbum(album);
        }
      });*/
  }, [firebaseAuth, firebaseFirestore, routeParams]);

  return (
    <Container>
      <Header
        title={album.albumName}
        backFunction={navBackResetRoute}
        iconColor={color && color.colorTwo}
      />

      <TouchableOpacity
        onPress={handleToggleSelectionDelete}
        style={{ position: 'absolute', right: 25, top: 70 }}
      >
        <AntDesign
          name="delete"
          size={25}
          color={color ? color.colorTwo : '#F54F51'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleAlbumEdit}
        style={{ position: 'absolute', right: 70, top: 72 }}
      >
        <FontAwesome5
          name="pencil-alt"
          size={22}
          color={color ? color.colorTwo : '#F54F51'}
        />
      </TouchableOpacity>

      {visibleModalEditAlbum && (
        <ModalTitleAlbum
          modalVisible={visibleModalEditAlbum}
          setVisibleState={handleAlbumEdit}
          albumTitle={album.albumName}
          albumId={album.id}
          updateAlbumTItle={updateAlbumTitle}
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
              color={color ? color.colorTwo : '#F54F51'}
            />
          </ConfirmDeleteButton>

          <CancelDeleteButton onPress={handleToggleSelectionDelete}>
            <DeleteButtonText style={{ color: color && color.colorTwo }}>
              Cancelar
            </DeleteButtonText>
            <FontAwesome5
              name="times"
              size={22}
              color={color ? color.colorTwo : '#F54F51'}
            />
          </CancelDeleteButton>
        </DeleteContainer>
      ) : null}

      <AlbumList
        data={album?.listPhotos}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        extraData={selectedImages}
        keyExtractor={(image: { id: any; }) => image.id}
        renderItem={({ item: image, index }: any) => (
          <ImageContainer>
            <ImageButton
              disabled={selectionDelete}
              onPress={() => handleToggleImageView(index)}
            >
              {image.uri ? (
                <Image
                  isSelected={selectedImages.indexOf(image.id) > -1}
                  source={{ uri: image.uri }}
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
                onPress={() => handleSelectPicture(image.id)}
              >
                {!buttonDeleteActive ? (
                  selectedImages.indexOf(image.id) < 0 ? (
                    <FontAwesome5
                      name="square"
                      size={30}
                      color={color ? color.colorTwo : '#F54F51'}
                    />
                  ) : (
                    <FontAwesome5
                      name="check-square"
                      size={30}
                      color={color ? color.colorTwo : '#F54F51'}
                    />
                  )
                ) : null}
              </ImageButtonDelete>
            </ImageButton>
          </ImageContainer>
        )}
      />

      <ImageView
        images={album?.listPhotos}
        imageIndex={imageIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Para cancelar, pressione o botão fechar janela.');
        }}
      >
        <ModalContainer>
          <ActivityIndicator size={50} color="#503d77" />
        </ModalContainer>
      </Modal>

      <Button2
        onPress={handleAddPhoto}
        icon="plus"
        style={{
          width: 45,
          height: 45,
          borderRadius: 23,
          position: 'absolute',
          bottom: 25,
          right: 15,
          backgroundColor: color && color.colorTwo,
        }}
      />
    </Container>
  );
};

export default AlbumView;
