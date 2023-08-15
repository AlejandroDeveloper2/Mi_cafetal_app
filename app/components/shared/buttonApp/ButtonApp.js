import { Icon } from "@rneui/themed";
import PropTypes from "prop-types";

import useTheme from "../../../hooks/useTheme";

import { ButtonContainer, Text } from "./ButtonApp.style";

const ButtonApp = (props) => {
  const { disabledColor } = useTheme();
  const {
    label,
    width,
    height = "60px",
    background = disabledColor,
    iconName,
    iconGroup = "font-awesome",
    fontColor,
    fontSize = "16px",
    action,
  } = props;

  return (
    <ButtonContainer
      width={width}
      height={height}
      background={background}
      onPress={action}
    >
      <Icon
        type={iconGroup}
        name={iconName === "" ? "" : iconName}
        color={fontColor}
        brand={true}
      />
      {!label ? null : (
        <Text fontColor={fontColor} fontSize={fontSize}>
          {label}
        </Text>
      )}
    </ButtonContainer>
  );
};

ButtonApp.propTypes = {
  label: PropTypes.string,
  width: PropTypes.string.isRequired,
  height: PropTypes.string,
  background: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  iconGroup: PropTypes.string,
  fontColor: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  action: PropTypes.func,
};

export default ButtonApp;
