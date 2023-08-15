import * as Animatable from "react-native-animatable";
import { Icon } from "@rneui/themed";

import useTheme from "../../../hooks/useTheme";

import { IndicatorContainer } from "./Indicator.style";

const Indicator = () => {
  const { strongBrown, lightBrown } = useTheme();

  return (
    <Animatable.View animation="pulse" iterationCount="infinite">
      <IndicatorContainer background={lightBrown}>
        <Icon
          type="material"
          name="arrow-downward"
          color={strongBrown}
          brand={true}
        />
      </IndicatorContainer>
    </Animatable.View>
  );
};

export default Indicator;
