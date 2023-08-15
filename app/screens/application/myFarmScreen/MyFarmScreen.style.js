import styled from "styled-components/native";

const Container = styled.ImageBackground`
  flex: 1;
  align-items: center;
`;

const Content = styled.View`
  width: 95%;
  height: auto;
  background-color: ${(props) => props.background};
  align-items: center;
  justify-content: flex-start;
  border-radius: 20px;
  padding-vertical: 40px;
  elevation: 10;
`;

const Message = styled.View`
  width: 320px;
  height: 100px;
  background-color: ${(props) => props.background};
  border-radius: 10px;
  margin-bottom: 40px;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  width: 300px;
  font-size: 14px;
  color: ${(props) => props.fontColor};
  text-align: center;
  font-family: "Montserrat_300Light";
  margin-top: 10px;
`;

const Illustrations = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 30px;
  align-items: center;
`;

const Illustration = styled.Image`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-top: ${(props) => props.marginTop};
`;

const ContentVariant = styled(Content)`
  height: 630px;
  padding-vertical: 80px;
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

export {
  Container,
  Content,
  Message,
  Text,
  Illustration,
  Illustrations,
  ContentVariant,
  ScreenTitle,
  ScreenName,
};
