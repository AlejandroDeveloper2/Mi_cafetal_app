import useTheme from "../../../hooks/useTheme";

import { Container, Text, Illustration } from "./Footer.style";

const Footer = () => {
  const { white } = useTheme();

  return (
    <Container>
      <Illustration
        source={require("../../../../assets/images/illustration.png")}
      />
      <Text colorFont={white}>Versión 1.0.0</Text>
    </Container>
  );
};

export default Footer;
