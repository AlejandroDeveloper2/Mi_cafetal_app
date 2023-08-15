import styled from "styled-components/native";

const Container = styled.ImageBackground`
  width: 100%;
  flex: 1;
`;

const Title = styled.Text`
  color: ${(props) => props.fontColor};
  font-size: 25px;
  text-align: center;
  font-weight: normal;
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
  marginVertical: "25%",
};

export { Container, Title, Logo, Header, scrollViewStyle };
