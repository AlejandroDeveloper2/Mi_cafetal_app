import { Image } from "react-native";
import { Icon } from "@rneui/themed";

import TechnicalSupport from "../../../components/application/technicalSupport/TechnicalSupport";
import HeaderMenu from "../../../components/shared/headerMenu/HeaderMenu";

import useTheme from "../../../hooks/useTheme";

import {
  Container,
  Message,
  Text,
  Content,
  ScreenTitle,
  ScreenName,
} from "./TechnicalSupportScreen.style";

const TechnicalSupportScreen = () => {
  const { white, primaryColor, normalGray } = useTheme();

  return (
    <Container
      source={require("../../../../assets/images/background-registration.png")}
    >
      <HeaderMenu title={"Soporte Tecnico"} />
      <ScreenTitle>
        <Icon
          type="material"
          name="live-help"
          color={white}
          brand={true}
          iconStyle={{ fontSize: 30 }}
        />
        <ScreenName fontColor={white}>Soporte tecnico</ScreenName>
      </ScreenTitle>
      <Content background={white}>
        <Message background={primaryColor}>
          <Icon type="material" name="info" color={normalGray} brand={true} />
          <Text fontColor={normalGray}>
            Aqui podras enviarnos sugerencias o reportes de algun error en el
            app para seguir mejorando el aplicativo para brindarte una mejor
            experiencia.
          </Text>
        </Message>
        <TechnicalSupport />
        <Image
          source={require("../../../../assets/images/illustration-3.png")}
        />
      </Content>
    </Container>
  );
};

export default TechnicalSupportScreen;
