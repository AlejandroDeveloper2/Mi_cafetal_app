import styled from "styled-components/native";

const Form = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Item = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

const TitleForm = styled.Text`
  color: ${(props) => props.fontColor};
  font-size: 24px;
  text-align: center;
  font-family: "Montserrat_400Regular";
  margin-bottom: 30px;
`;

export { Form, Item, TitleForm };
