import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import useTheme from "../../../hooks/useTheme";

import RegistrationForm from "../../../components/auth/registrationForm/RegistrationForm";
import ButtonApp from "../../../components/shared/buttonApp/ButtonApp";

import {
  Container,
  Title,
  Header,
  Logo,
  scrollViewStyle,
} from "./RegistrationScreen.style";

const RegistrationScreen = () => {
  const { white, lightBrown, strongBrown } = useTheme();
  const navigation = useNavigation();

  return (
    <Container
      source={require("../../../../assets/images/background-registration.png")}
    >
      <ScrollView contentContainerStyle={scrollViewStyle}>
        <Header>
          <Logo source={require("../../../../assets/images/logo.png")} />
          <Title fontColor={white}> Crear cuenta </Title>
        </Header>
        <RegistrationForm />
        <ButtonApp
          label="Volver"
          width="200px"
          background={lightBrown}
          iconName="keyboard-backspace"
          iconGroup="material"
          fontColor={strongBrown}
          fontSize="14px"
          action={() => navigation.navigate("Login")}
        />
      </ScrollView>
    </Container>
  );
};

export default RegistrationScreen;
