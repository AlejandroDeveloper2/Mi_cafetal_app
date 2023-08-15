import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ButtonApp from "../../../components/shared/buttonApp/ButtonApp";
import RecoverForm from "../../../components/auth/recoverForm/RecoverForm";

import useTheme from "../../../hooks/useTheme";

import {
  Container,
  Title,
  Header,
  Logo,
  scrollViewStyle,
} from "./RecoverScreen.styles";

const RecoverScreen = () => {
  const { white, lightBrown, strongBrown } = useTheme();
  const navigation = useNavigation();

  return (
    <Container
      source={require("../../../../assets/images/background-login.png")}
    >
      <ScrollView contentContainerStyle={scrollViewStyle}>
        <Header>
          <Logo source={require("../../../../assets/images/logo.png")} />
          <Title fontColor={white}> Recuperar contraseña </Title>
        </Header>
        <RecoverForm />

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

export default RecoverScreen;
