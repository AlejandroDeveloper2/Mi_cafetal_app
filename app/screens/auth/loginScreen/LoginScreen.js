import { useEffect } from "react";
import { ScrollView, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";

import useTheme from "../../../hooks/useTheme";
import useAuth from "../../../hooks/useAuth";
import useAlert from "../../../hooks/useAlert";
import useLoading from "../../../hooks/useLoading";
import { backActionExitApp } from "../../../helpers";

import LoginForm from "../../../components/auth/loginForm/LoginForm";
import ButtonApp from "../../../components/shared/buttonApp/ButtonApp";

import {
  Container,
  Title,
  Logo,
  Header,
  scrollViewStyle,
} from "./LoginScreen.style";

const LoginScreen = () => {
  const { white, lightBrown, strongBrown } = useTheme();
  const { isAuth, checkIfUserIsLoggedIn } = useAuth();
  const { Loading } = useLoading();
  const { Alert } = useAlert();
  const navigation = useNavigation();

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  useEffect(() => {
    if (isAuth) {
      navigation.navigate("Dashboard");
    } else {
      navigation.navigate("Login");
    }
  }, [isAuth]);

  useEffect(() => {
    if (navigation.getState().index === 1) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backActionExitApp
      );
      return () => backHandler.remove();
    }
  }, [navigation.getState().index]);

  return (
    <>
      <Loading />
      <Alert />
      <Container
        source={require("../../../../assets/images/background-login.png")}
      >
        <ScrollView contentContainerStyle={scrollViewStyle}>
          <Header>
            <Logo source={require("../../../../assets/images/logo.png")} />
            <Title fontColor={white}> Inicio de sesión </Title>
          </Header>
          <LoginForm />
          <ButtonApp
            label="Crear cuenta"
            width="200px"
            background={lightBrown}
            iconName="control-point"
            iconGroup="material"
            fontColor={strongBrown}
            action={() => navigation.navigate("Registration")}
          />
        </ScrollView>
      </Container>
    </>
  );
};

export default LoginScreen;
