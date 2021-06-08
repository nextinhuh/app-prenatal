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
import { useTheme } from '../../hooks/theme';

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
  const { color } = useTheme();

  const routeParams = route.params as RouteParams;
  const [isToCreateNewNote, setIsToCreateNewNote] = useState<boolean>();

  const richEditorRef = React.createRef<RichEditor>();
  const richEditorRef2 = React.createRef<RichEditor>();

  const [noteDescriptionText, setNoteDescriptionText] = useState<string>();
  const [noteTitleText, setNoteTitleText] = useState<string>();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const firebaseAuth = firebase.auth().currentUser;
  const firebaseFirestore = firebase.firestore();


  useEffect(() => {
    if (routeParams.noteId === "newNote") {
      setIsToCreateNewNote(true);
    } else {
      setIsToCreateNewNote(false);
    }
    setNoteDescriptionText(routeParams.noteDescription);
    setNoteTitleText(routeParams.noteTitle);

  }, [routeParams.noteDescription, routeParams.noteTitle, routeParams.noteId]);

  const navBackResetRoute = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Notes' }],
    })
  }, [navigation])

  const updateNote = useCallback(
    async () => {
      if (noteTitleText === '' || noteDescriptionText === '') {
        Alert.alert('Favor preencha o título e a descrição da nota!', '', [
          {
            text: 'Ok',
          },
        ]);
      } else {
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
      }
    },
    [firebaseAuth, firebaseFirestore, noteDescriptionText, noteTitleText, routeParams.noteId, navBackResetRoute],
  );

  const createNewNote = useCallback(
    async () => {
      if (noteTitleText === '' || noteDescriptionText === '') {
        Alert.alert('Favor preencha o título e a descrição da nota!', '', [
          {
            text: 'Ok',
          },
        ]);
      } else {
        const time = new Date().getTime();
        await firebaseFirestore
          .collection('users')
          .doc(firebaseAuth?.uid)
          .collection('notes')
          .doc(time.toString())
          .set({
            id: time.toString(),
            title: noteTitleText,
            description: noteDescriptionText,
          })
          .then(() => {
            Alert.alert('A nota foi criada com sucesso!', '', [
              {
                text: 'Ok',
              },
            ]);
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
      }

    },
    [firebaseAuth, firebaseFirestore, navBackResetRoute, noteDescriptionText, noteTitleText],
  );

  return (

    <Container>
      <Header
        title="SUA ANOTAÇÃO"
        backFunction={navBackResetRoute}
        iconColor={color && color.colorTwo}
      />

      <ContainerTitleInput>
        <Input style={{ color: 'black' }} defaultValue={routeParams.noteTitle} onChangeText={value => setNoteTitleText(value)} borderColor={color ? color.colorTwo : "#F54F51"} />
      </ContainerTitleInput>


      <RichToolbar
        editor={richEditorRef}
        selectedIconTint="#2095F2"
        disabledIconTint="#bfbfbf"
        style={{ marginTop: -15, marginBottom: 5, backgroundColor: '#FFF' }}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10 }}>
        <RichEditor
          disabled={false}
          ref={richEditorRef}
          style={{ padding: 2, borderWidth: 3, borderColor: color ? color.colorTwo : "#F54F51", borderRadius: 10 }}
          initialContentHTML={noteDescriptionText}
          scrollEnabled
          onChange={(text) => setNoteDescriptionText(text)}
        />
      </ScrollView>

      {isToCreateNewNote ?
        <Button2 icon="check" onPress={createNewNote} style={{ alignSelf: 'center', marginBottom: 5, width: 60, height: 60, borderRadius: 30, backgroundColor: color && color.colorTwo }} /> :
        <Button2 icon="check" onPress={updateNote} style={{ alignSelf: 'center', marginBottom: 5, width: 60, height: 60, borderRadius: 30, backgroundColor: color && color.colorTwo }} />}




    </Container>

  );
};

export default NoteView;
