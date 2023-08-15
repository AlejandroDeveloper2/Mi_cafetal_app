import styled from "styled-components/native";

const FormRecovery = styled.View`
  width: 340px;
  height: 220px;
  border-radius: 20px;
  elevation: 10;
  padding: 20px;
  background-color: ${(props) => props.background};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-vertical: 50px;
`;

const Item = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;
export { FormRecovery, Item };
