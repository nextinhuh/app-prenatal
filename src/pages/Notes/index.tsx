/* eslint-disable react/jsx-fragments */
/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Alert, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import 'firebase/firestore';
import HTML from "react-native-render-html";

import {
  Container,
  TitleCard,
  DeleteButtonSquare,
  DeleteButton,
  DeleteButtonText,
  DeleteContainer,
} from './styles';

import Button2 from '../../components/Button';
import Header from '../../components/Header';

type ListNotes = Array<{
  id: string;
  title: string;
  description: string;
}>;

const Notes: React.FC = () => {
  const navigation = useNavigation();
  const [selectionDelete, setSelectionDelete] = useState(false);
  const [listNotesToDelete, setListNotesToDelete] = useState<string[]>([]);
  const [noteList, setNoteList] = useState<ListNotes | undefined>();
  const firebaseAuth = firebase.auth().currentUser;
  const firebaseFirestore = firebase.firestore();

  useEffect(() => {
    async function listNotes() {
      await firebaseFirestore
        .collection('users')
        .doc(firebaseAuth?.uid)
        .collection('notes')
        .get()
        .then(result => {
          const resultList: any = [];
          result.forEach(doc => {
            resultList.push(doc.data());
          });
          setNoteList(resultList);
        });
    }

    listNotes();
  }, [firebaseFirestore, firebaseAuth]);

  const handleToCreateNewNote = useCallback(() => {
    navigation.navigate('NoteView', { noteId: "newNote", noteDescription: "", noteTitle: "" })
  }, [navigation]);

  const handleToggleSelectionDelete = useCallback(() => {
    setSelectionDelete(!selectionDelete);
    setListNotesToDelete([]);
  }, [selectionDelete]);


  const addNotesToDelete = useCallback(
    (noteId: string) => {
      setListNotesToDelete([...listNotesToDelete, noteId]);
    },
    [listNotesToDelete],
  );

  const removeNotesToDelete = useCallback(
    (noteId: string) => {
      const noteRemove = listNotesToDelete.filter(note => {
        if (note !== noteId) {
          return note;
        }
      });
      setListNotesToDelete(noteRemove);
    },
    [listNotesToDelete],
  );

  const confirmNoteDelete = useCallback(async () => {
    Alert.alert(
      'Tem certeza que deseja deletar essa(s) nota(s) ?',
      '',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim, tenho certeza!',
          onPress: () => deleteNotes(),
        },
      ],
      { cancelable: false },
    );

    async function deleteNotes() {
      await firebaseFirestore
        .collection('users')
        .doc(firebaseAuth?.uid)
        .collection('notes')
        .get()
        .then(result => {
          const batch = firebaseFirestore.batch();

          result.forEach(doc => {
            listNotesToDelete.map(note => {
              if (doc.id === note) {
                batch.delete(doc.ref);
              }
            });
          });

          Alert.alert('A(s) nota(s) foi(ram) excluída(s) com sucesso!', '', [
            {
              text: 'Ok',
            },
          ]);

          firebaseFirestore
            .collection('users')
            .doc(firebaseAuth?.uid)
            .collection('notes')
            .get()
            .then(result => {
              const resultList: any = [];
              result.forEach(doc => {
                resultList.push(doc.data());
              });
              setNoteList(resultList);
            });

          setSelectionDelete(false);

          return batch.commit();
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
  }, [firebaseAuth, firebaseFirestore, listNotesToDelete]);

  const handleEditNote = useCallback(
    (noteId: string, noteDescription: string, noteTitle: string) => {
      navigation.navigate('NoteView', { noteId, noteDescription, noteTitle })
    },
    [navigation],
  );

  return (
    <Container>

      <Header title="SUAS ANOTAÇÕES">
        <TouchableOpacity onPress={handleToggleSelectionDelete}>
          <AntDesign name="delete" size={25} color="#f54f51" />
        </TouchableOpacity>

        <TouchableOpacity>
          <AntDesign name="sharealt" size={25} color="#f54f51" />
        </TouchableOpacity>
      </Header>

      {selectionDelete ? (
        <DeleteContainer>
          <DeleteButton onPress={confirmNoteDelete}>
            <DeleteButtonText>Apagar</DeleteButtonText>
            <FontAwesome5 name="check" size={22} color="#f54f51" />
          </DeleteButton>

          <DeleteButton onPress={handleToggleSelectionDelete}>
            <DeleteButtonText>Cancelar</DeleteButtonText>
            <FontAwesome5 name="times" size={22} color="#f54f51" />
          </DeleteButton>
        </DeleteContainer>
      ) : null}

      <FlatList
        data={noteList}
        keyExtractor={note => note.id}
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: '10%' }}
        renderItem={({ item: note }) => (
          <Card style={{ margin: 20, borderWidth: 1, borderColor: '#F54F51', maxHeight: '100%' }}>
            <Card.Content>
              <Card.Title
                title={<TitleCard>{note.title}</TitleCard>}
                style={{ marginTop: '-7%', marginLeft: '-10%' }}
                right={() => (
                  <>
                    {selectionDelete ? (
                      listNotesToDelete.indexOf(note.id) < 0 ? (
                        <DeleteButtonSquare onPress={() => addNotesToDelete(note.id)}>
                          <FontAwesome5
                            name="square"
                            size={30}
                            color="#f54f51"
                          />
                        </DeleteButtonSquare>
                      ) : (
                        <DeleteButtonSquare
                          onPress={() => removeNotesToDelete(note.id)}
                        >
                          <FontAwesome5
                            name="check-square"
                            size={30}
                            color="#f54f51"
                          />
                        </DeleteButtonSquare>
                      )
                    ) : null}
                  </>
                )}
              />

              <View>
                <HTML source={{ html: note.description }} />
              </View>
            </Card.Content>
            <Card.Actions style={{ justifyContent: 'flex-end', marginRight: 10 }}>
              <TouchableOpacity onPress={() => handleEditNote(note.id, note.description, note.title)}>
                <FontAwesome5 name="pencil-alt" size={25} color="#f54f51" />
              </TouchableOpacity>
            </Card.Actions>

          </Card>
        )}
      />

      <Button2 onPress={handleToCreateNewNote} icon="plus" style={{ width: 45, height: 45, borderRadius: 23, position: 'absolute', bottom: 25, right: 15 }} />
    </Container>
  );
};

export default Notes;
