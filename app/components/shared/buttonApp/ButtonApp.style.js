import styled from "styled-components/native";

const ButtonContainer = styled.TouchableOpacity`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.background};
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: ${(props) => props.fontColor};
  font-size: ${(props) => props.fontSize};
  text-align: center;
  font-family: "Montserrat_600SemiBold";
  margin-left: 10px;
`;

export { ButtonContainer, Text };
