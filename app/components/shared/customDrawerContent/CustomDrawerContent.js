import { Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Avatar } from "@rneui/themed";

import useTheme from "../../../hooks/useTheme";
import useAuth from "../../../hooks/useAuth";
import useApplication from "../../../hooks/useApplication";
import useAccount from "../../../hooks/useAccount";
import useBatches from "../../../hooks/useBatches";
import useFarm from "../../../hooks/useFarm";
import useCropExpenses from "../../../hooks/useCropExpenses";
import { backActionExitApp } from "../../../helpers";

import ButtonApp from "../buttonApp/ButtonApp";
import ButtonDrawer from "../buttonDrawer/ButtonDrawer";
import ConnectionIndicator from "../connectionIndicator/ConnectionIndicator";

import {
  MenuContainer,
  MenuHeader,
  UserName,
  MenuFooter,
  Row,
  ButtonCloseDrawer,
  UserRole,
} from "./CustomDrawerContent.style";

const CustomDrawerContent = (props) => {
  const { white, strongBrown, strongRed, mediumGray, primaryColor } =
    useTheme();
  const { logOut } = useAuth();
  const { isConnected, cleanApplicationData } = useApplication();
  const { avatar, userData, userRole, setUserData, setUserRole } = useAccount();
  const { cleanBatchData } = useBatches();
  const { cleanFarmData } = useFarm();
  const { cleanCropExpensesData } = useCropExpenses();

  const closeSession = () => {
    cleanApplicationData();
    cleanFarmData();
    cleanBatchData();
    setUserData({});
    cleanCropExpensesData();
    setUserRole("Usuario");
    logOut();
  };

  return (
    <MenuContainer background={white}>
      <MenuHeader
        source={require("../../../../assets/images/menuBackground.png")}
      >
        <ButtonCloseDrawer background={primaryColor}>
          <ButtonDrawer
            iconName="close"
            iconColor={mediumGray}
            actionDrawer={props.navigation}
            actionId="hide"
            iconSize={24}
          />
        </ButtonCloseDrawer>
        <Avatar
          size={80}
          rounded
          source={
            !avatar
              ? require("../../../../assets/images/person.png")
              : { uri: avatar }
          }
          containerStyle={{
            backgroundColor: primaryColor,
            borderColor: white,
            borderWidth: 3,
          }}
        />
        <UserName
          fontColor={white}
        >{`${userData?.names} ${userData?.last_names}`}</UserName>
        <UserRole fontColor={white}>
          {userData?.userRole ? userData?.userRole : userRole}
        </UserRole>
      </MenuHeader>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <MenuFooter borderColor={mediumGray}>
          <Row>
            <Image
              source={require("../../../../assets/images/secondary-logo.png")}
            />
          </Row>
          <Row>
            <ButtonApp
              label={isConnected ? "Cerrar sesión" : "Salir del app"}
              width="180px"
              background={isConnected ? strongBrown : strongRed}
              iconName={isConnected ? "logout" : "exit-to-app"}
              iconGroup="material"
              fontColor={white}
              fontSize="14px"
              action={isConnected ? closeSession : backActionExitApp}
            />
          </Row>
          <Row>
            <ConnectionIndicator />
          </Row>
        </MenuFooter>
      </DrawerContentScrollView>
    </MenuContainer>
  );
};

export default CustomDrawerContent;
