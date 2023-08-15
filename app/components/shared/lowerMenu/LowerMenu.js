import { Icon } from "@rneui/themed";

import useTheme from "../../../hooks/useTheme";

import {
  LowerMenuContainer,
  Item,
  Label,
  ItemContainer,
} from "./LowerMenu.style";

const LowerMenu = ({ lowerMenuItems }) => {
  const { white, strongBrown, primaryColor } = useTheme();

  return (
    <LowerMenuContainer background={white}>
      {lowerMenuItems.map((item, index) => (
        <ItemContainer key={index}>
          {Object.keys(item).length === 0 ? null : (
            <Item onPress={item.action} background={primaryColor}>
              <Icon
                type="material"
                name={item.iconName}
                color={strongBrown}
                brand={true}
                iconStyle={{ fontSize: 25 }}
              />
            </Item>
          )}
          <Label fontColor={strongBrown}>{item.label}</Label>
        </ItemContainer>
      ))}
    </LowerMenuContainer>
  );
};

export default LowerMenu;
