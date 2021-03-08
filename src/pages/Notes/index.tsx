/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Alert, Modal, TouchableOpacity } from 'react-native';
import { Button, Card, Menu, Divider } from 'react-native-paper';
import { FontAwesome5, Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from 'firebase';
import 'firebase/firestore';

import {
  Container,
  TitleCard,
  Title,
  BackButton,
  OptionButton,
  Paragraph,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ErrorText,
  DeleteButtonSquare,
  DeleteButton,
  DeleteButtonText,
  DeleteContainer,
} from './styles';

import Input from '../../components/Input';
import Button2 from '../../components/Button';
import Header from '../../components/Header';

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

const Notes: React.FC = () => {
  const navigation = useNavigation();
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectionDelete, setSelectionDelete] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | undefined>();
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

  const handleNavBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleToggleMenu = useCallback(() => {
    setVisibleMenu(!visibleMenu);
  }, [visibleMenu]);

  const handleCreateNewNote = useCallback(() => {
    setModalVisible(true);
    setVisibleMenu(!visibleMenu);
  }, [visibleMenu]);

  const handleToggleSelectionDelete = useCallback(() => {
    setSelectionDelete(!selectionDelete);
    setVisibleMenu(false);
    setListNotesToDelete([]);
  }, [selectionDelete]);

  const createNewNote = useCallback(
    async (note: Omit<Note, 'id'>) => {
      const time = new Date().getTime();
      await firebaseFirestore
        .collection('users')
        .doc(firebaseAuth?.uid)
        .collection('notes')
        .doc(time.toString())
        .set({
          id: time.toString(),
          title: note.title,
          description: note.description,
        })
        .then(() => {
          Alert.alert('A nota foi criada com sucesso!', '', [
            {
              text: 'Ok',
            },
          ]);
          setModalVisible(!modalVisible);
          const newNote = {
            id: time.toString(),
            title: note.title,
            description: note.description,
          };
          setNoteList([newNote, ...noteList]);
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
    [firebaseAuth, firebaseFirestore, modalVisible, noteList],
  );

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
    (noteId: string, noteDescription: string) => {
      /* const note = noteList?.find(note => {
        if (note.id === noteId) {
          return note;
        }
      });
      setNoteToEdit(note);
      setEditModalVisible(true); */
      navigation.navigate('NoteView', { noteId, noteDescription })
    },
    [navigation],
  );

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

  return (
    <Container>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Para cancelar, pressione o botão fechar janela.');
        }}
      >
        <ModalContainer>
          <ModalContent>
            <ModalTitle>Nova nota</ModalTitle>
            <Formik
              initialValues={{
                title: '',
                description: '',
              }}
              validationSchema={Yup.object().shape({
                title: Yup.string()
                  .required('Título é obrigatório')
                  .min(3, 'Precisa ter 3 caracteres'),
                description: Yup.string()
                  .required('Texto da nota é obrigatório')
                  .min(5, 'Precisa ter 5 caracteres'),
              })}
              onSubmit={values => createNewNote(values)}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                errors,
                handleBlur,
                touched,
              }) => (
                <>
                  <Input
                    onBlur={handleBlur('title')}
                    name="title"
                    value={values.title}
                    onChangeText={handleChange('title')}
                    placeholder="Título da nota"
                  />
                  {touched.title && errors.title && (
                    <ErrorText>{errors.title}</ErrorText>
                  )}

                  <Input
                    onBlur={handleBlur('description')}
                    name="description"
                    value={values.description}
                    onChangeText={handleChange('description')}
                    multiline
                    style={{ marginTop: '5%', height: 60 }}
                    numberOfLines={6}
                    placeholder="Digite o texto..."
                  />
                  {touched.description && errors.description && (
                    <ErrorText>{errors.description}</ErrorText>
                  )}

                  <Button2
                    style={{ marginTop: '15%' }}
                    onPress={() => handleSubmit()}
                  >
                    Salvar nota
                  </Button2>
                </>
              )}
            </Formik>

            <Button2
              style={{ marginTop: '5%', marginBottom: '2%' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              Fechar janela
            </Button2>
          </ModalContent>
        </ModalContainer>
      </Modal>

      <Modal
        animationType="fade"
        transparent
        visible={editModalVisible}
        onRequestClose={() => {
          Alert.alert('Para cancelar, pressione o botão fechar janela.');
        }}
      >
        <ModalContainer>
          <ModalContent>
            <ModalTitle>Editar nota</ModalTitle>
            <Formik
              initialValues={{
                id: noteToEdit?.id ? noteToEdit.id : '',
                title: noteToEdit?.title ? noteToEdit.title : '',
                description: noteToEdit?.description
                  ? noteToEdit.description
                  : '',
              }}
              validationSchema={Yup.object().shape({
                title: Yup.string()
                  .required('Título é obrigatório')
                  .min(3, 'Precisa ter 3 caracteres'),
                description: Yup.string()
                  .required('Texto da nota é obrigatório')
                  .min(5, 'Precisa ter 5 caracteres'),
              })}
              onSubmit={values => updateNote(values)}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                errors,
                handleBlur,
                touched,
              }) => (
                <>
                  <Input
                    onBlur={handleBlur('title')}
                    name="title"
                    value={values.title}
                    onChangeText={handleChange('title')}
                    placeholder="Título da nota"
                  />
                  {touched.title && errors.title && (
                    <ErrorText>{errors.title}</ErrorText>
                  )}

                  <Input
                    onBlur={handleBlur('description')}
                    name="description"
                    value={values.description}
                    onChangeText={handleChange('description')}
                    multiline
                    style={{ marginTop: '5%', height: 60 }}
                    numberOfLines={6}
                    placeholder="Digite o texto..."
                  />
                  {touched.description && errors.description && (
                    <ErrorText>{errors.description}</ErrorText>
                  )}

                  <Button2
                    style={{ marginTop: '15%' }}
                    onPress={() => handleSubmit()}
                  >
                    Salvar alteração
                  </Button2>
                </>
              )}
            </Formik>

            <Button2
              style={{ marginTop: '5%', marginBottom: '2%' }}
              onPress={() => {
                setEditModalVisible(!editModalVisible);
              }}
            >
              Fechar janela
            </Button2>
          </ModalContent>
        </ModalContainer>
      </Modal>

      <Header title="SUAS ANOTAÇÕES">
        <TouchableOpacity onPress={handleToggleSelectionDelete}>
          <AntDesign name="delete" size={25} color="#f54f51" />
        </TouchableOpacity>

        <TouchableOpacity>
          <AntDesign name="sharealt" size={25} color="#f54f51" />
        </TouchableOpacity>
        {/* <BackButton onPress={handleNavBack}>
          <FontAwesome5 name="chevron-left" size={25} color="#503d77" />
        </BackButton>

        <Title>Anotações</Title>

        <Menu
          visible={visibleMenu}
          onDismiss={handleToggleMenu}
          anchor={
            <OptionButton onPress={handleToggleMenu}>
              <FontAwesome5 name="ellipsis-v" size={30} color="#503d77" />
            </OptionButton>
          }
        >
          <Menu.Item title="Adicionar nota" onPress={handleCreateNewNote} />

          <Divider />

          <Menu.Item
            title="Apagar nota(s)"
            onPress={handleToggleSelectionDelete}
          />
        </Menu> */}
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

              <Paragraph numberOfLines={5}>{note.description}</Paragraph>
            </Card.Content>
            <Card.Actions style={{ justifyContent: 'flex-end', marginRight: 10 }}>
              <TouchableOpacity onPress={() => handleEditNote(note.id, note.description)}>
                <FontAwesome5 name="pencil-alt" size={25} color="#f54f51" />
              </TouchableOpacity>
            </Card.Actions>

          </Card>
        )}
      />
      <Button2 onPress={handleCreateNewNote} icon="plus" style={{ width: 45, height: 45, borderRadius: 23, position: 'absolute', bottom: 25, right: 15 }} />
    </Container>
  );
};

export default Notes;
