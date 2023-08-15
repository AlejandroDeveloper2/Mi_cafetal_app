import { Icon } from "@rneui/themed";
import PropTypes from "prop-types";

import { ButtonContainer } from "./ButtonDrawer.style";

const ButtonDrawer = (props) => {
  const { iconName, iconColor, actionDrawer, actionId, iconSize = 36 } = props;

  const handlePress = () => {
    if (actionId === "show") {
      actionDrawer.openDrawer();
    } else if (actionId === "hide") {
      actionDrawer.closeDrawer();
    } else {
      console.log(
        "actionId prop accepts two possible values such as hide or show!"
      );
    }
  };

  return (
    <ButtonContainer onPress={handlePress}>
      <Icon
        type="material"
        name={iconName === "" ? "" : iconName}
        color={iconColor}
        brand={true}
        iconStyle={{ fontSize: iconSize }}
      />
    </ButtonContainer>
  );
};

ButtonDrawer.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  actionDrawer: PropTypes.object.isRequired,
  actionId: PropTypes.oneOf(["show", "hide"]).isRequired,
  iconSize: PropTypes.number,
};

export default ButtonDrawer;
