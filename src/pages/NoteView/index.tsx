/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Alert, Modal, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Button, Card, Menu, Divider } from 'react-native-paper';
import { FontAwesome5, Ionicons, AntDesign } from '@expo/vector-icons';
import { actions, getContentCSS, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from 'firebase';
import 'firebase/firestore';

import { Container, InputTitle, ContainerTitleInput } from './styles';

import Input from '../../components/Input';
import Button2 from '../../components/Button';
import Header from '../../components/Header';

interface RouteParams {
  noteId: string;
  noteDescription: string;
  noteTitle: string;
}

interface Note {
  id: string;
  title: string;
  description: string;
}

interface NoteEdit {
  id: string;
  title: string;
  description: string;
}

type ListNotes = Array<{
  id: string;
  title: string;
  description: string;
}>;

const NoteView: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const richEditorRef = React.createRef<RichEditor>();
  const richEditorRef2 = React.createRef<RichEditor>();

  const [noteDescriptionText, setNoteDescriptionText] = useState<string>();
  const [noteTitleText, setNoteTitleText] = useState<string>();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const firebaseAuth = firebase.auth().currentUser;
  const firebaseFirestore = firebase.firestore();


  useEffect(() => {
    setNoteDescriptionText(routeParams.noteDescription);
    setNoteTitleText(routeParams.noteTitle);
  }, [routeParams.noteDescription, routeParams.noteTitle]);

  const navBackResetRoute = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Notes' }],
    })
  }, [navigation])

  const updateNote = useCallback(
    async () => {
      await firebaseFirestore
        .collection('users')
        .doc(firebaseAuth?.uid)
        .collection('notes')
        .doc(routeParams.noteId)
        .update({
          title: noteTitleText,
          description: noteDescriptionText,
        })
        .then(() => {
          Alert.alert('A nota foi atualizada com sucesso!', '', [
            {
              text: 'Ok',
            },
          ]);
          setEditModalVisible(!editModalVisible);
          navBackResetRoute();
        })
        .catch(() => {
          Alert.alert(
            'Ops! Deu algum erro na criação da nota, favor tentar novamente!',
            '',
            [
              {
                text: 'Ok',
              },
            ],
          );
        });
    },
    [firebaseAuth, firebaseFirestore, editModalVisible, noteDescriptionText, noteTitleText, routeParams.noteId, navBackResetRoute],
  );

  return (

    <Container>
      <Header
        title="SUA ANOTAÇÃO"
        backFunction={navBackResetRoute}
      />

      <ContainerTitleInput>
        <Input style={{ color: 'black' }} defaultValue={routeParams.noteTitle} onChangeText={value => setNoteTitleText(value)} />
      </ContainerTitleInput>


      <RichToolbar
        editor={richEditorRef}
        selectedIconTint="#2095F2"
        disabledIconTint="#bfbfbf"
        style={{ marginTop: -15, marginBottom: 5, backgroundColor: '#FFF' }}
      />
      <ScrollView>
        <RichEditor
          disabled={false}
          ref={richEditorRef}
          style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}
          initialContentHTML={noteDescriptionText}
          scrollEnabled
          onChange={(text) => setNoteDescriptionText(text)}
        />
      </ScrollView>

      <Button2 icon="check" onPress={updateNote} style={{ alignSelf: 'center', marginBottom: 5, width: 60, height: 60, borderRadius: 30 }} />



    </Container>

  );
};

export default NoteView;
