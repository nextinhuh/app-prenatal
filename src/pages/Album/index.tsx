/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useState } from 'react';
import ImageView from 'react-native-image-viewing';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Menu, Divider, ActivityIndicator } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform, Modal } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

import {
  Container,
  Title,
  Header,
  BackButton,
  OptionButton,
  AlbumList,
  Image,
  ImageButton,
  ImageButtonDelete,
  CancelDeleteButton,
  CancelDeleteButtonText,
  DeleteContainer,
  ConfirmDeleteButton,
  ConfirmDeleteButtonText,
  ImageContainer,
  ModalContainer,
} from './styles';

type Images = Array<{
  id: string;
  uri: string;
}>;

const Album: React.FC = () => {
  const navigation = useNavigation();
  const [visible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [selectionDelete, setSelectionDelete] = useState(false);
  const [buttonDeleteActive, setButtonDeleteActive] = useState(true);
  const [selectedImages, setSelectedIamges] = useState<number[]>([]);
  const [listImages, setListImages] = useState<Images>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const firebaseAuth = firebase.auth().currentUser;
  const storageFirebase = firebase.storage();
  const firebaseFirestore = firebase.firestore();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert(
            'Desculpe, nós precisamos da permissão de câmera para isto funcionar!',
          );
        }
      }
    })();

    async function listImagesUrl() {
      await firebaseFirestore
        .collection('users')
        .doc(firebaseAuth?.uid)
        .collection('album')
        .get()
        .then(result => {
          const resultList: any = [];
          result.forEach(doc => {
            resultList.push({
              id: doc.data().id,
              uri: doc.data().linkImage,
            });
          });
          setListImages(resultList);
        });
    }

    listImagesUrl();
  }, [firebaseAuth, firebaseFirestore]);

  const handleGaleryPhotoPicker = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setModalVisible(true);
      const image = await fetch(result.uri);
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

      await firebaseFirestore
        .collection('users')
        .doc(firebaseAuth?.uid)
        .collection('album')
        .doc(time.toString())
        .set({ linkImage, id: time.toString() });

      const newImage = {
        id: time.toString(),
        uri: linkImage,
      };

      setVisibleMenu(false);
      setListImages([newImage, ...listImages]);
      setModalVisible(false);
    }
  }, [firebaseAuth, firebaseFirestore, storageFirebase, listImages]);

  const handleTakePhoto = useCallback(async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setModalVisible(true);
      const image = await fetch(result.uri);
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

      await firebaseFirestore
        .collection('users')
        .doc(firebaseAuth?.uid)
        .collection('album')
        .doc(time.toString())
        .set({ linkImage, id: time.toString() });

      const newImage = {
        id: time.toString(),
        uri: linkImage,
      };

      setVisibleMenu(false);
      setListImages([newImage, ...listImages]);
      setModalVisible(false);
    }
  }, [firebaseAuth, firebaseFirestore, storageFirebase, listImages]);

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

  const handleToggleMenu = useCallback(() => {
    setVisibleMenu(!visibleMenu);
  }, [visibleMenu]);

  const handleNavBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleToggleImageView = useCallback(
    index => {
      setImageIndex(index);
      setIsVisible(!visible);
    },
    [visible],
  );

  const handleToggleSelectionDelete = useCallback(() => {
    setVisibleMenu(false);
    setSelectionDelete(!selectionDelete);
    setButtonDeleteActive(!buttonDeleteActive);
    setSelectedIamges([]);
  }, [selectionDelete, buttonDeleteActive]);

  const handleSelectPicture = useCallback(
    (id: number) => {
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
    setModalVisible(true);

    await firebaseFirestore
      .collection('users')
      .doc(firebaseAuth?.uid)
      .collection('album')
      .get()
      .then(result => {
        const batch = firebaseFirestore.batch();

        result.forEach(doc => {
          selectedImages.map(image => {
            if (image.toString() === doc.id) {
              const imageRef = storageFirebase.refFromURL(doc.data().linkImage);
              batch.delete(doc.ref);
              imageRef.delete();
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
            result.forEach(doc => {
              resultList.push({
                id: doc.data().id,
                uri: doc.data().linkImage,
              });
            });
            setListImages(resultList);
          });

        handleToggleSelectionDelete();
        setModalVisible(false);

        return batch.commit();
      });
  }, [
    firebaseAuth,
    firebaseFirestore,
    selectedImages,
    storageFirebase,
    handleToggleSelectionDelete,
  ]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleNavBack}>
          <FontAwesome5 name="chevron-left" size={25} color="#503d77" />
        </BackButton>

        <Title>Album</Title>

        <Menu
          visible={visibleMenu}
          onDismiss={handleToggleMenu}
          anchor={
            <OptionButton onPress={handleToggleMenu}>
              <FontAwesome5 name="ellipsis-v" size={25} color="#503d77" />
            </OptionButton>
          }
        >
          <Menu.Item
            onPress={() => {
              handleAddPhoto();
            }}
            title="Adicionar uma foto"
          />
          <Divider />
          <Menu.Item
            onPress={handleToggleSelectionDelete}
            title="Apagar foto(s)"
          />
        </Menu>
      </Header>

      {selectionDelete ? (
        <DeleteContainer>
          <ConfirmDeleteButton onPress={confirmImagesDelete}>
            <ConfirmDeleteButtonText>Apagar</ConfirmDeleteButtonText>
            <FontAwesome5 name="check" size={22} color="#503d77" />
          </ConfirmDeleteButton>

          <CancelDeleteButton onPress={handleToggleSelectionDelete}>
            <CancelDeleteButtonText>Cancelar</CancelDeleteButtonText>
            <FontAwesome5 name="times" size={22} color="#503d77" />
          </CancelDeleteButton>
        </DeleteContainer>
      ) : null}

      <AlbumList
        data={listImages}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        extraData={selectedImages}
        keyExtractor={image => image.id}
        renderItem={({ item: image, index }) => (
          <ImageContainer>
            <ImageButton
              disabled={selectionDelete}
              onPress={() => handleToggleImageView(index)}
            >
              <Image
                isSelected={selectedImages.indexOf(image.id) > -1}
                source={{ uri: image.uri }}
              />

              <ImageButtonDelete
                disabled={buttonDeleteActive}
                onPress={() => handleSelectPicture(image.id)}
              >
                {!buttonDeleteActive ? (
                  selectedImages.indexOf(image.id) < 0 ? (
                    <FontAwesome5 name="square" size={30} color="#E03CFB" />
                  ) : (
                    <FontAwesome5
                      name="check-square"
                      size={30}
                      color="#E03CFB"
                    />
                  )
                ) : null}
              </ImageButtonDelete>
            </ImageButton>
          </ImageContainer>
        )}
      />

      <ImageView
        images={listImages}
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
    </Container>
  );
};

export default Album;
