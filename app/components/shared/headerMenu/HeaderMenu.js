import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import { Avatar } from "@rneui/themed";

import useTheme from "../../../hooks/useTheme";
import useAccount from "../../../hooks/useAccount";

import ButtonDrawer from "../buttonDrawer/ButtonDrawer";

import { Row, Header, Col } from "./Header.styles";

const HeaderMenu = ({ title }) => {
  const { white, primaryColor, strongBrown } = useTheme();
  const navigation = useNavigation();
  const { avatar } = useAccount();

  return (
    <Header background={white}>
      <Row>
        <Col>
          <ButtonDrawer
            iconName="menu"
            iconColor={strongBrown}
            actionDrawer={navigation}
            actionId="show"
          />
        </Col>
        <Col>
          <Image
            source={require("../../../../assets/images/secondary-logo.png")}
            style={{ width: 70, height: 70 }}
          />
        </Col>
        <Col>
          <Avatar
            size={36}
            rounded
            source={
              !avatar
                ? require("../../../../assets/images/person.png")
                : { uri: avatar }
            }
            containerStyle={{
              backgroundColor: primaryColor,
            }}
          ></Avatar>
        </Col>
      </Row>
    </Header>
  );
};

HeaderMenu.propTypes = {
  title: PropTypes.string,
};

export default HeaderMenu;
