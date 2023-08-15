import styled from "styled-components/native";

const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-family: "Montserrat_400Regular";
  text-align: center;
  color: ${(props) => props.fontColor};
`;

const IndicatorText = styled(Title)`
  font-size: 20px;
  font-family: "Montserrat_300Light";
`;

const ProgressInfo = styled.View`
  margin-vertical: 30px;
  align-items: center;
  justify-content: center;
`;

const ProgressBarContainer = styled.View`
  width: 280px;
  height: 35px;
  background-color: ${(props) => props.background};
  border-radius: 20px;
  margin-vertical: 15px;
  align-items: center;
  flex-direction: row;
  overflow: hidden;
  padding-left: 5px;
  padding-right: 5px;
`;

const ProgressBarContent = styled.View`
  width: ${(props) => props.progress}%;
  height: 25px;
  background-color: ${(props) => props.background};
  border-radius: 20px;
`;

const Percentage = styled(Title)`
  font-family: "Montserrat_600SemiBold";
`;

export {
  Container,
  Title,
  IndicatorText,
  ProgressInfo,
  ProgressBarContainer,
  ProgressBarContent,
  Percentage,
};
