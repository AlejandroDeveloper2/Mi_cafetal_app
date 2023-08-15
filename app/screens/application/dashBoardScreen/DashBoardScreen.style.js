import styled from "styled-components/native";

const Container = styled.ImageBackground`
  width: 100%;
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

const Title = styled.Text`
  color: ${(props) => props.fontColor};
  font-size: ${(props) => props.fontSize};
  text-align: center;
  font-family: "Montserrat_600SemiBold";
  margin-left: 10px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ScreenTitle = styled(TitleContainer)`
  margin-vertical: 30px;
`;
const ScreenName = styled(Title)`
  font-family: "Montserrat_400Regular";
`;

export { Container, Content, Title, TitleContainer, ScreenTitle, ScreenName };
