import styled from "styled-components/native";

const LowerMenuContainer = styled.View`
  width: 100%;
  height: 90px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${(props) => props.background};
  elevation: 20;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
`;

const Item = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${(props) => props.background};
  border-radius: 10px;
`;

const Label = styled.Text`
  font-size: 12px;
  font-family: "Montserrat_400Regular";
  text-align: center;
  color: ${(props) => props.fontColor};
  margin-top: 2px;
`;

const ItemContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;

export { LowerMenuContainer, Item, Label, ItemContainer };
