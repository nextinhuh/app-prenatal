/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { useCallback, useState } from 'react';
import { Alert, Modal, ModalProps, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { ModalContainer, ModalTitle, ModalCard } from './styles';

import Input from '../Input';
import Button from '../Button';
import { useTheme } from '../../hooks/theme';

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
  const { color } = useTheme();
  const [visible, setVisible] = useState(modalVisible);
  const [albumName, setAlbumName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const firebaseAuth = getAuth().currentUser;
  const firebaseFirestore = getFirestore();

  const handleCreateNewAlbum = useCallback(async () => {
    if (albumName !== '') {
      setLoading(true);
      /*await firebaseFirestore
        .collection('users')
        .doc(firebaseAuth?.uid)
        .collection('album')
        .doc()
        .set({ albumName })
        .then(() => {
          setLoading(false);
          setVisibleState();
          updateAlbumList();
        });*/
    } else {
      Alert.alert('O nome do álbum não pode estar vazio!', '', [
        {
          text: 'Ok',
        },
      ]);
    }
  }, [
    albumName,
    firebaseAuth,
    firebaseFirestore,
    setVisibleState,
    updateAlbumList,
  ]);

  const handleEditAlbumName = useCallback(async () => {
    setLoading(true);
    /*
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
      });*/
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
            color={color ? color.colorTwo : '#F54F51'}
            style={{ position: 'absolute', top: '5%', right: '8%' }}
            onPress={() => setVisibleState()}
          />
          <ModalTitle style={{ color: color && color.colorTwo }}>
            {albumTitle ? 'Editar Nome' : 'Novo Álbum'}
          </ModalTitle>

          <Input
            borderColor={color ? color.colorTwo : '#F54F51'}
            style={{ borderColor: '#f54f51', color: 'black' }}
            placeholder="Título do álbum"
            textPlaceHolderColor="black"
            onChangeText={value => setAlbumName(value)}
            defaultValue={albumTitle}
          />

          {loading ? (
            <ActivityIndicator
              size="large"
              color={color ? color.colorTwo : '#F54F51'}
            />
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
                backgroundColor: color && color.colorTwo,
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
