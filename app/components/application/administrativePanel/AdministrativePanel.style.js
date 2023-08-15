import styled from "styled-components/native";

const PanelContainer = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Item = styled.View`
  width: 310px;
  height: 90px;
  padding-vertical: 20px;
  align-items: center;
  background-color: ${(props) => props.background};
  margin-top: 30px;
  justify-content: space-between;
  elevation: 5;
  border-radius: 10px;
  flex-direction: row;
  overflow: hidden;
`;

const IconContainer = styled.View`
  width: 60px;
  height: 90px;
  background-color: ${(props) => props.background};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const Value = styled.Text`
  color: ${(props) => props.fontColor};
  font-size: ${(props) => props.fontSize};
  text-align: center;
  font-family: "Montserrat_500Medium";
  margin-top: 5px;
`;
const Label = styled.Text`
  color: ${(props) => props.fontColor};
  font-size: 14px;
  text-align: center;
  font-family: "Montserrat_400Regular";
`;
const Content = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export { PanelContainer, Item, IconContainer, Value, Label, Content };
