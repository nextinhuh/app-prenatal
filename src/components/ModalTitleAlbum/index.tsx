/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { useCallback, useState } from 'react';
import { Alert, Modal, ModalProps, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import firebase from 'firebase';
import 'firebase/firestore';

import { ModalContainer, ModalTitle, ModalCard } from './styles';

import Input from '../Input';
import Button from '../Button';

interface ModalNewAlbumProps extends ModalProps {
  modalVisible?: boolean;
  setVisibleState?: any;
  updateAlbumList?: any;
  albumId?: string;
  albumTitle?: any;
  updateAlbumTItle?: any;
}

const ModalTitleAlbum: React.FC<ModalNewAlbumProps> = ({
  modalVisible,
  setVisibleState,
  updateAlbumList,
  albumId,
  albumTitle,
  updateAlbumTItle,
  ...rest
}) => {
  const [visible, setVisible] = useState(modalVisible);
  const [albumName, setAlbumName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const firebaseAuth = firebase.auth().currentUser;
  const firebaseFirestore = firebase.firestore();

  const handleCreateNewAlbum = useCallback(async () => {
    setLoading(true);
    await firebaseFirestore
      .collection('users')
      .doc(firebaseAuth?.uid)
      .collection('album')
      .doc()
      .set({ albumName })
      .then(() => {
        setLoading(false);
        setVisibleState();
        updateAlbumList();
      });
  }, [
    albumName,
    firebaseAuth,
    firebaseFirestore,
    setVisibleState,
    updateAlbumList,
  ]);

  const handleEditAlbumName = useCallback(async () => {
    setLoading(true);
    await firebaseFirestore
      .collection('users')
      .doc(firebaseAuth?.uid)
      .collection('album')
      .doc(albumId)
      .update({ albumName })
      .then(() => {
        updateAlbumTItle();
        setLoading(false);
        setVisibleState();
      });
  }, [
    albumId,
    albumName,
    firebaseAuth,
    firebaseFirestore,
    setVisibleState,
    updateAlbumTItle,
  ]);

  return (
    <Modal
      {...rest}
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setVisible(!visible);
      }}
    >
      <ModalContainer>
        <ModalCard>
          <Entypo
            name="cross"
            size={30}
            color="#f54f51"
            style={{ position: 'absolute', top: '5%', right: '8%' }}
            onPress={() => setVisibleState()}
          />
          <ModalTitle>{albumTitle ? 'Editar Nome' : 'Novo Álbum'}</ModalTitle>

          <Input
            borderColor="#f54f51"
            style={{ borderColor: '#f54f51', color: 'black' }}
            placeholder="Título do álbum"
            textPlaceHolderColor="black"
            onChangeText={value => setAlbumName(value)}
            defaultValue={albumTitle}
          />

          {loading ? (
            <ActivityIndicator size="large" color="#f54f51" />
          ) : (
            <Button
              icon="check"
              style={{
                alignSelf: 'center',
                marginTop: 1,
                marginBottom: 15,
                width: 60,
                height: 60,
                borderRadius: 30,
              }}
              onPress={albumTitle ? handleEditAlbumName : handleCreateNewAlbum}
            />
          )}
        </ModalCard>
      </ModalContainer>
    </Modal>
  );
};

export default ModalTitleAlbum;
