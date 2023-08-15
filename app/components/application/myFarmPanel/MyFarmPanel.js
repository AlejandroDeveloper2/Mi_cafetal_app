import { Icon } from "@rneui/themed";
import { View } from "react-native";

import useTheme from "../../../hooks/useTheme";
import useApplication from "../../../hooks/useApplication";
import useFarm from "../../../hooks/useFarm";
import useFarmOffline from "../../../hooks/useFarmOffline";
import deparments from "../../../data/deparments.json";
import cities from "../../../data/cities.json";
import { renderFarmPanelItems } from "./DomData";

import {
  FarmTitle,
  ItemList,
  Item,
  IconContainer,
  Label,
  Value,
  Content,
} from "./MyFarmPanel.style";

const MyFarmPanel = () => {
  const { white, lightBrown, strongBrown, mediumGray, yellow } = useTheme();
  const { isConnected } = useApplication();
  const { farm } = useFarm();
  const { farmOffline } = useFarmOffline();

  const ITEMSPANEL = renderFarmPanelItems(isConnected, farm, farmOffline, {
    lightBrown,
    strongBrown,
    white,
    mediumGray,
    yellow,
  });

  const getStateName = (id) => {
    const state = deparments.data.filter((deparment) => deparment.id === id);
    return state[0]?.name;
  };

  const getTownName = (id) => {
    const town = cities.data.filter((city) => city.id === id);
    return town[0]?.name;
  };

  return (
    <>
      <FarmTitle fontColor={strongBrown}>
        {isConnected ? farm.farmName : farmOffline.farmName}
      </FarmTitle>
      <ItemList>
        {ITEMSPANEL.map((item, index) => (
          <Item key={index} background={white}>
            <IconContainer background={item.background}>
              <Icon
                type="material"
                name={item.icon}
                color={item.color}
                brand={true}
                iconStyle={{ fontSize: 24 }}
              />
            </IconContainer>
            <Content>
              <Label fontColor={strongBrown}>{item.label}</Label>
              <Value fontColor={strongBrown}>
                {item.label === "Departamento"
                  ? getStateName(item.value)
                  : item.label === "Municipio"
                  ? getTownName(item.value)
                  : item.value}
              </Value>
            </Content>
            <View style={{ width: 60 }}></View>
          </Item>
        ))}
      </ItemList>
    </>
  );
};

export default MyFarmPanel;
