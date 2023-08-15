import styled from "styled-components/native";

const Header = styled.View`
  width: 100%;
  height: 130px;
  background-color: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin: 0;
  padding: 0;
`;
const Row = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 15px;
`;

const Col = styled.View`
  padding: 0;
`;

export { Header, Row, Col };
