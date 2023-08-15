import styled from "styled-components/native";

const Container = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Text = styled.Text`
  color: ${(props) => props.colorFont};
  font-size: 14px;
  font-family: "Montserrat_700Bold";
  text-align: center;
  margin-top: 10px;
`;

const Illustration = styled.Image`
  width: 138px;
  height: 138px;
`;

export { Container, Text, Illustration };
