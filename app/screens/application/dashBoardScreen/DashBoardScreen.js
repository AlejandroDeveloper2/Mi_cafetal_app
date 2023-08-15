import { useEffect } from "react";
import { Icon } from "@rneui/base";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";

import useTheme from "../../../hooks/useTheme";
import useAccount from "../../../hooks/useAccount";
import useLoading from "../../../hooks/useLoading";
import useAlert from "../../../hooks/useAlert";
import { backActionExitApp } from "../../../helpers";

import HeaderMenu from "../../../components/shared/headerMenu/HeaderMenu";
import AdministrativePanel from "../../../components/application/administrativePanel/AdministrativePanel";

import {
  Container,
  Content,
  Title,
  TitleContainer,
  ScreenTitle,
  ScreenName,
} from "./DashBoardScreen.style";

const DashBoardScreen = () => {
  const { strongBrown, white } = useTheme();
  const { Loading, setIsLoading, setLoadingText } = useLoading();
  const { Alert, showAlert, hideAlert, setAlert } = useAlert();
  const { userData, getProfileData } = useAccount();
  const navigation = useNavigation();

  useEffect(() => {
    getProfileData(setIsLoading, setLoadingText);
  }, []);

  useEffect(() => {
    if (navigation.getState().index === 0) {
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
        source={require("../../../../assets/images/background-registration.png")}
      >
        <HeaderMenu title={userData?.names} />
        <ScreenTitle>
          <Icon
            type="material"
            name="home"
            color={white}
            brand={true}
            iconStyle={{ fontSize: 24 }}
          />
          <ScreenName fontColor={white} fontSize="24px">
            Inicio
          </ScreenName>
        </ScreenTitle>
        <Content background={white}>
          <TitleContainer>
            <Icon
              type="material"
              name="widgets"
              color={strongBrown}
              brand={true}
            />
            <Title fontColor={strongBrown} fontSize="20px">
              Panel de control
            </Title>
          </TitleContainer>
          <AdministrativePanel />
        </Content>
      </Container>
    </>
  );
};

export default DashBoardScreen;
