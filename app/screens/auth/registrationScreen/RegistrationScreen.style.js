import styled from "styled-components/native";
const Container = styled.ImageBackground`
  width: 100%;
  flex: 1;
`;
const Title = styled.Text`
  color: ${(props) => props.fontColor};
  width:300px
  font-size: 25px;
  text-align: center;
  font-family: "Montserrat_400Regular";

`;
const Header = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Logo = styled.Image`
  width: 150px;
  height: 150px;
`;

const scrollViewStyle = {
  alignItems: "center",
  paddingVertical: 30,
};

export { Container, Title, Header, Logo, scrollViewStyle };
