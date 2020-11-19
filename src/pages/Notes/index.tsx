import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { Button, Card, Menu, Divider } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  TitleCard,
  Title,
  BackButton,
  OptionButton,
  Header,
  Paragraph,
} from './styles';

type Notes = Array<{
  id: string;
  title: string;
  text: string;
}>;

const Notes: React.FC = () => {
  const navigation = useNavigation();
  const [visibleMenu, setVisibleMenu] = useState(false);

  const notesList: Notes = [
    {
      id: '1',
      title: 'Primeiros Chutes',
      text: 'Senti os primeiros chutes do bebê no dia 23/10/2020',
    },
    {
      id: '2',
      title: 'Primeiros Chutes 2',
      text: 'Senti os primeiros chutes do bebê no dia 23/10/2020',
    },
    {
      id: '3',
      title: 'Primeiros Chutes 3',
      text: 'Senti os primeiros chutes do bebê no dia 23/10/2020',
    },
    {
      id: '4',
      title: 'Primeiros Chutes 4',
      text: 'Senti os primeiros chutes do bebê no dia 23/10/2020',
    },
  ];

  const handleNavBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleToggleMenu = useCallback(() => {
    setVisibleMenu(!visibleMenu);
  }, [visibleMenu]);

  const handleToggleSelectionDelete = useCallback(() => {}, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleNavBack}>
          <FontAwesome5 name="chevron-left" size={25} color="#503d77" />
        </BackButton>

        <Title>Anotações</Title>

        <Menu
          visible={visibleMenu}
          onDismiss={handleToggleMenu}
          anchor={
            <OptionButton onPress={handleToggleMenu}>
              <FontAwesome5 name="ellipsis-v" size={25} color="#503d77" />
            </OptionButton>
          }
        >
          <Menu.Item title="Adicionar nota" />

          <Divider />

          <Menu.Item title="Apagar nota(s)" />
        </Menu>
      </Header>

      <FlatList
        data={notesList}
        keyExtractor={note => note.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: note }) => (
          <Card style={{ margin: 20, backgroundColor: '#B2DCEA' }}>
            <Card.Content>
              <TitleCard>{note.title}</TitleCard>
              <Paragraph>{note.text}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button labelStyle={{ color: '#503d77' }}>Editar</Button>
            </Card.Actions>
          </Card>
        )}
      />
    </Container>
  );
};

export default Notes;
