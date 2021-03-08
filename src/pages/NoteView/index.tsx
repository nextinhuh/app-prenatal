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

import { Container, InputTitle } from './styles';

import Input from '../../components/Input';
import Button2 from '../../components/Button';
import Header from '../../components/Header';

interface RouteParams {
  noteId: string;
  noteDescription: string;
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
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectionDelete, setSelectionDelete] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | undefined>();
  const [listNotesToDelete, setListNotesToDelete] = useState<string[]>([]);
  const [noteList, setNoteList] = useState<ListNotes | undefined>();
  const firebaseAuth = firebase.auth().currentUser;
  const firebaseFirestore = firebase.firestore();


  useEffect(() => {
    setNoteDescriptionText(routeParams.noteDescription);
  }, [routeParams.noteDescription]);

  /*
    const handleToggleMenu = useCallback(() => {
      setVisibleMenu(!visibleMenu);
    }, [visibleMenu]);

    const handleCreateNewNote = useCallback(() => {
      setModalVisible(true);
      setVisibleMenu(!visibleMenu);
    }, [visibleMenu]);
  */

  const updateNote = useCallback(
    async (note: NoteEdit) => {
      await firebaseFirestore
        .collection('users')
        .doc(firebaseAuth?.uid)
        .collection('notes')
        .doc(note.id)
        .update({
          title: note.title,
          description: note.description,
        })
        .then(() => {
          noteList?.map(noteToUpdate => {
            if (noteToUpdate.id === note.id) {
              noteToUpdate.title = note.title;
              noteToUpdate.description = note.description;
            }
          });
          setNoteList(noteList);
          Alert.alert('A nota foi atualizada com sucesso!', '', [
            {
              text: 'Ok',
            },
          ]);
          setEditModalVisible(!editModalVisible);
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
    [firebaseAuth, firebaseFirestore, editModalVisible, noteList],
  );

  function editorInitializedCallback() {
    richEditorRef.current?.registerToolbar(function (items) {
      // items contain all the actions that are currently active
      console.log(
        "Toolbar click, selected items (insert end callback):",
        items
      );
    });
  }

  return (

    <Container>
      <Header
        title="SUA ANOTAÇÂO"
        teste={() => navigation.reset({
          index: 0,
          routes: [{ name: 'Notes' }],
        })}
      />

      <Text>{routeParams.noteId}</Text>
      <RichToolbar
        editor={richEditorRef}
        selectedIconTint="#2095F2"
        disabledIconTint="#bfbfbf"
      />
      <ScrollView>
        <RichEditor
          disabled={false}
          ref={richEditorRef}
          style={{ marginLeft: 10, marginRight: 10 }}
          initialContentHTML={noteDescriptionText}
          scrollEnabled
          onChange={(text) => setNoteDescriptionText(text)}
        />
      </ScrollView>



    </Container>

  );
};

export default NoteView;
