import styled from "styled-components/native";

const Container = styled.View`
  width: 320px;
  height: 120px;
  border-radius: 20px;
  background-color: ${(props) => props.background};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  elevation: 10;
`;

const BarContainer = styled.View`
  width: 290px;
  height: 30px;
  border-radius: 10px;
  background-color: ${(props) => props.background};
  align-items: center;
  flex-direction: row;
  overflow: hidden;
  padding-left: 5px;
  padding-right: 5px;
  elevation: 10;
`;
const BarContent = styled.View`
  width: ${(props) => props.load}%;
  height: 20px;
  border-radius: 5px;
  background-color: ${(props) => props.background};
`;
const Text = styled.Text`
  font-size: 14px;
  font-family: "Montserrat_400Regular";
  color: ${(props) => props.fontColor};
  text-align: center;
  margin-left: 10px;
`;

const Label = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 10px;
`;

export { Container, BarContainer, BarContent, Text, Label };
