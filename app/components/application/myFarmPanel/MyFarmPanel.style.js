import styled from "styled-components/native";

const FarmTitle = styled.Text`
  color: ${(props) => props.fontColor};
  font-family: "Montserrat_500Medium";
  font-size: 20px;
  text-align: center;
`;

const ItemList = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Item = styled.View`
  width: 310px;
  height: 90px;
  padding-vertical: 20px;
  align-items: center;
  background-color: ${(props) => props.background};
  margin-top: 20px;
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

const Label = styled.Text`
  color: ${(props) => props.fontColor};
  font-family: "Montserrat_400Regular";
  font-size: 14px;
  text-align: center;
`;

const Value = styled(Label)`
  font-family: "Montserrat_500Medium";
  font-size: 20px;
`;

const Content = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export { FarmTitle, ItemList, Item, IconContainer, Label, Value, Content };
