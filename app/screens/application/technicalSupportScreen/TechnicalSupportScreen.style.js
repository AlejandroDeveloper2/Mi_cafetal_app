import styled from "styled-components/native";

const Container = styled.ImageBackground`
  width: 100%;
  flex: 1;
  align-items: center;
`;
const Title = styled.Text`
  color: ${(props) => props.fontColor};
  font-size: 22px;
  text-align: center;
  font-family: "Montserrat_500Medium";
  margin-top: 20px;
`;
const Message = styled.View`
  width: 320px;
  background-color: ${(props) => props.background};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding-vertical: 20px;
`;
const Text = styled.Text`
  width: 300px;
  font-size: 14px;
  color: ${(props) => props.fontColor};
  text-align: center;
  font-family: "Montserrat_400Regular";
  margin-top: 10px;
`;

const Content = styled.View`
  align-items: center;
  padding-vertical: 30px;
  width: 95%;
  height: 100%;
  background-color: ${(props) => props.background};
  border-radius: 20px;
`;

const ScreenTitle = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-vertical: 20px;
`;

const ScreenName = styled(Text)`
  font-family: "Montserrat_400Regular";
  margin-top: 0;
  margin-left: 10px;
  font-size: 24px;
  width: auto;
`;

export { Container, Title, Message, Text, Content, ScreenTitle, ScreenName };
