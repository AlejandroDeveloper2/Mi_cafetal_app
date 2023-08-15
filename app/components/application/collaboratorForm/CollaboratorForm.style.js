import styled from "styled-components/native";

const Form = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleForm = styled.Text`
  color: ${(props) => props.fontColor};
  font-size: 24px;
  text-align: center;
  font-family: "Montserrat_400Regular";
  margin-bottom: 30px;
`;

export { Form, TitleForm };
