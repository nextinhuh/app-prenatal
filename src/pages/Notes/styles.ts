import styled from 'styled-components/native';

export const ModalContainer = styled.KeyboardAvoidingView`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.75);
`;

export const ModalContent = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 15px;
  align-items: center;
  height: 390px;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 16px;
  font-weight: bold;
  align-self: flex-end;
`;

export const ModalTitle = styled.Text`
  font-size: 25px;
  font-family: Underdog_400Regular;
  color: #503d77;
  margin-bottom: 5%;
`;

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  margin-top: 10px;
  width: 100%;
  padding: 0px 40px;
  height: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-family: Underdog_400Regular;
  color: #503d77;
`;

export const TitleCard = styled.Text`
  font-size: 23px;
  font-family: Sofia_400Regular;
  color: #503d77;
  margin-bottom: 20px;
`;

export const Paragraph = styled.Text`
  margin-left: 15px;
  font-family: Underdog_400Regular;
  font-size: 16px;
`;

export const OptionButton = styled.TouchableOpacity`
  align-items: center;
  height: 40px;
  justify-content: center;
`;
export const BackButton = styled.TouchableOpacity`
  align-items: center;
  height: 30px;
  width: 30px;
`;

export const DeleteButton = styled.TouchableOpacity``;

export const DeleteContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: -20px;
  margin-bottom: 15px;
`;

export const CancelDeleteButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const ConfirmDeleteButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CancelDeleteButtonText = styled.Text`
  font-size: 20px;
  font-family: Underdog_400Regular;
  color: #503d77;
  margin-right: 10px;
`;

export const ConfirmDeleteButtonText = styled.Text`
  font-size: 20px;
  font-family: Underdog_400Regular;
  color: #503d77;
  margin-right: 10px;
`;
