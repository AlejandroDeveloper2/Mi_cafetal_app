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

const dropdownStyle = {
  width: "100%",
  height: 50,
  borderBottomColor: "#835A3E",
  borderBottomWidth: 1,
  marginVertical: 10,
};

const dropdownStyleError = {
  width: "100%",
  height: 50,
  borderBottomColor: "#F61F0C",
  borderBottomWidth: 1,
  marginVertical: 10,
};

export { Form, Item, TitleForm, dropdownStyle, dropdownStyleError };
