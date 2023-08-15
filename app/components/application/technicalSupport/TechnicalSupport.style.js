import styled from "styled-components/native";

const PanelContainer = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;
const Content = styled.View`
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
`;

export { PanelContainer, Content, Item };
