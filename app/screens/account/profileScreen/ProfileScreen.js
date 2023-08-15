import { useState } from "react";
import { Icon, Avatar } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

import useTheme from "../../../hooks/useTheme";
import useLoading from "../../../hooks/useLoading";
import useAccount from "../../../hooks/useAccount";
import useAlert from "../../../hooks/useAlert";
import useOverlay from "../../../hooks/useOverlay";
import { renderLowerMenuItems, renderProfileItems } from "./DomData";

import HeaderMenu from "../../../components/shared/headerMenu/HeaderMenu";
import ChangePasswordForm from "../../../components/account/changePasswordForm/ChangePasswordForm";
import UpdateProfileForm from "../../../components/account/updateProfileForm/UpdateProfileForm";
import LowerMenu from "../../../components/shared/lowerMenu/LowerMenu";

import {
  Container,
  ProfileListContainer,
  Item,
  IconContainer,
  ScreenTitle,
  ScreenName,
  Title,
  Value,
  Border,
  generateAvatarStyle,
} from "./ProfileScreen.style";

const ProfileScreen = () => {
  const [formName, setFormName] = useState(null);
  const { white, primaryColor, strongBrown, lightBrown, mediumGray } =
    useTheme();
  const { setIsLoading, setLoadingText } = useLoading();
  const { showAlert, hideAlert, setAlert } = useAlert();
  const { Modal, toggleModal } = useOverlay();
  const { userData, avatar, uploadProfileAvatarFromPhone } = useAccount();
  const navigation = useNavigation();

  const config = {
    setIsLoading,
    setLoadingText,
    showAlert,
    hideAlert,
    setAlert,
  };

  const lowerMenuItems = renderLowerMenuItems(
    navigation,
    toggleModal,
    setFormName
  );

  const ITEMS = renderProfileItems(userData, {
    lightBrown,
    strongBrown,
    white,
    mediumGray,
  });

  const avatarStyle = generateAvatarStyle(lightBrown);

  return (
    <>
      <Modal>
        {formName === "update_password" ? (
          <ChangePasswordForm toggleModal={toggleModal} />
        ) : (
          <UpdateProfileForm toggleModal={toggleModal} />
        )}
      </Modal>
      <Container
        source={require("../../../../assets/images/background-registration.png")}
      >
        <HeaderMenu title="Mi Perfil" />
        <ScreenTitle>
          <Icon
            type="material"
            name="person"
            color={white}
            brand={true}
            iconStyle={{ fontSize: 30 }}
          />
          <ScreenName fontColor={white}>Mi perfil</ScreenName>
        </ScreenTitle>
        <ProfileListContainer background={white}>
          <Title fontColor={strongBrown}>Información del usuario</Title>
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
              marginBottom: 25,
              borderWidth: 4,
              borderColor: primaryColor,
            }}
          >
            <Avatar.Accessory
              size={50}
              iconStyle={{ color: strongBrown }}
              iconProps={{ size: 24 }}
              style={avatarStyle}
              onPress={() => uploadProfileAvatarFromPhone(config)}
            />
          </Avatar>
          {ITEMS.map((item, index) => (
            <Item key={index} background={white}>
              <IconContainer background={item.background}>
                <Icon
                  type="material"
                  name={item.icon}
                  color={item.color}
                  brand={true}
                />
              </IconContainer>
              <Value fontColor={strongBrown}>{item.value}</Value>
              <Border background={item.background}></Border>
            </Item>
          ))}
        </ProfileListContainer>
        <LowerMenu lowerMenuItems={lowerMenuItems} />
      </Container>
    </>
  );
};

export default ProfileScreen;
