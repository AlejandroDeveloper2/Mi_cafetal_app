import styled from "styled-components/native";

const Container = styled.View`
  width: 120px;
  height: 56px;
  background-color: ${(props) => props.background};
  border-radius: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: ${(props) => props.fontColor};
  font-size: 14px;
  font-family: "Montserrat_400Regular";
  text-align: center;
`;

export { Container, Text };
