import styled from "styled-components/native";

const Container = styled.ImageBackground`
  flex: 1;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 14px;
  color: ${(props) => props.fontColor};
  text-align: center;
  font-family: "Montserrat_400Regular";
`;

const ScreenTitle = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-vertical: 20px;
`;

const TitleContainer = styled(ScreenTitle)`
  margin-top: 0;
  margin-bottom: 20px;
`;

const ScreenName = styled(Text)`
  font-family: "Montserrat_400Regular";
  margin-left: 10px;
  font-size: 24px;
`;

const Title = styled(Text)`
  font-size: 20px;
  font-family: "Montserrat_500Medium";
`;

const Content = styled.View`
  width: 95%;
  height: 70%;
  background-color: ${(props) => props.background};
  align-items: center;
  justify-content: flex-start;
  border-radius: 20px;
  padding-vertical: 20px;
  elevation: 10;
`;

const Expense = styled.View`
  width: 80%;
  height: 110px;
  background-color: ${(props) => props.background};
  border-radius: 20px;
  elevation: 10;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
`;

const ExpenseIcon = styled.Image`
  margin-bottom: 0;
`;

const ExpenseContent = styled.View`
  justify-content: center;
  align-items: center;
`;

const AddExpenseButton = styled.TouchableOpacity`
  width: 64px;
  height: 110px;
  background-color: ${(props) => props.background};
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
`;

export {
  Container,
  Text,
  ScreenTitle,
  TitleContainer,
  ScreenName,
  Title,
  Content,
  Expense,
  ExpenseIcon,
  ExpenseContent,
  AddExpenseButton,
};
