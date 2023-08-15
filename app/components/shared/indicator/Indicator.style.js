import styled from "styled-components/native";

const IndicatorContainer = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: ${(props) => props.background};
  justify-content: center;
  align-items: center;
  elevation: 10;
  margin-top: -60px;
`;

export { IndicatorContainer };
