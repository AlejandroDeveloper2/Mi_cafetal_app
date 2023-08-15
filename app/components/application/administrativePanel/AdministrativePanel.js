import { Icon } from "@rneui/themed";
import { useEffect } from "react";
import {
  PanelContainer,
  Item,
  IconContainer,
  Value,
  Content,
  Label,
} from "./AdministrativePanel.style";

import useTheme from "../../../hooks/useTheme";
import { renderIndicatorPanel } from "./DomData";

import ButtonApp from "../../shared/buttonApp/ButtonApp";
import { formatMoney } from "../../../helpers";
import useFarm from "../../../hooks/useFarm";
const AdministrativePanel = () => {
  const {
    white,
    yellow,
    strongBrown,
    lightBrown,
    primaryColor,
    mediumGray,
    strongRed,
  } = useTheme();
  const { reportsPanel, investments, sales } = useFarm();

  const INDICATORSDATA = renderIndicatorPanel({
    strongBrown,
    yellow,
    lightBrown,
    mediumGray,
    white,
    strongRed,
    investments,
    sales,
  });
  useEffect(() => {
    reportsPanel();
  }, []);
  return (
    <PanelContainer>
      {INDICATORSDATA.map((indicator, index) => (
        <Item key={index} background={indicator.background}>
          <IconContainer background={primaryColor}>
            <Icon
              type="material"
              name={indicator.iconName}
              color={indicator.iconColor}
              brand={true}
            />
          </IconContainer>
          <Content>
            <Label fontColor={indicator.color}>{indicator.label}</Label>
            <Value fontColor={indicator.color} fontSize="20px">
              {formatMoney(indicator.value)}
            </Value>
          </Content>
          <ButtonApp
            width="40px"
            height="40px"
            background={primaryColor}
            iconName="visibility"
            iconGroup="material"
            fontColor={indicator.iconColor}
            action={() => console.log("mas detalles")}
          />
        </Item>
      ))}
    </PanelContainer>
  );
};

export default AdministrativePanel;
