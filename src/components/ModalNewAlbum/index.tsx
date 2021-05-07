/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ModalProps,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { ModalContainer, ModalTitle, ModalCard } from './styles';

import Input from '../Input';
import Button from '../Button';

interface ModalNewAlbumProps extends ModalProps {
  modalVisible?: boolean;
  setVisibleState?: any;
}

const ModalNewAlbum: React.FC<ModalNewAlbumProps> = ({
  modalVisible,
  setVisibleState,
  ...rest
}) => {
  const [visible, setVisible] = useState(modalVisible);

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
          <ModalTitle>Novo Álbum</ModalTitle>

          <Input
            borderColor="#f54f51"
            style={{ borderColor: '#f54f51', color: 'black' }}
            placeholder="Título do álbum"
            textPlaceHolderColor="black"
          />

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
            onPress={() => setVisibleState()}
          />
        </ModalCard>
      </ModalContainer>
    </Modal>
  );
};

export default ModalNewAlbum;
