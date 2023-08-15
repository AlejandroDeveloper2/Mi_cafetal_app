import styled from "styled-components/native";

const Stage = styled.TouchableOpacity`
  width: 300px;
  height: 115px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.background};
  border-radius: 20px;
  elevation: 10;
  margin-bottom: 20px;
  overflow: hidden;
`;

const IconContainer = styled.View`
  width: 100px;
  height: 115px;
  background-color: ${(props) => props.background};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const StageIcon = styled.Image`
  width: 70px;
  height: 70px;
`;

const Text = styled.Text`
  font-size: 14px;
  font-family: "Montserrat_500Medium";
  color: ${(props) => props.fontColor};
  text-align: left;
  width: 115px;
`;

export { Stage, IconContainer, StageIcon, Text };
