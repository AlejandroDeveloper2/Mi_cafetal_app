import styled from "styled-components/native";

const Container = styled.ImageBackground`
  flex: 1;
  align-items: center;
`;

const Content = styled.View`
  width: 95%;
  height: 70%;
  background-color: ${(props) => props.background};
  align-items: center;
  justify-content: flex-start;
  border-radius: 20px;
  padding-vertical: 40px;
  elevation: 10;
`;

const Text = styled.Text`
  font-size: 14px;
  color: ${(props) => props.fontColor};
  text-align: center;
  font-family: "Montserrat_400Regular";
`;

const ScreenTitle = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-vertical: 20px;
`;

const ScreenName = styled(Text)`
  font-family: "Montserrat_400Regular";
  margin-left: 10px;
  font-size: 24px;
`;

const CropStatus = styled.View`
  width: 80%;
  background-color: ${(props) => props.background};
  height: 40px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
`;

const Status = styled(Text)`
  font-family: "Montserrat_600SemiBold";
  margin-left: 5px;
`;

const Title = styled(Text)`
  font-size: 20px;
  font-family: "Montserrat_500Medium";
  margin-vertical: 20px;
`;

export {
  Container,
  Content,
  Text,
  ScreenTitle,
  ScreenName,
  CropStatus,
  Status,
  Title,
};
