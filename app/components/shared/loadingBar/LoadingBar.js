import { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

import useTheme from "../../../hooks/useTheme";
import { activeLoadingBar } from "../../../helpers";

import {
  Container,
  BarContainer,
  BarContent,
  Text,
  Label,
} from "./LoadingBar.style";

const LoadingBar = () => {
  const [load, setLoad] = useState(0);
  const { white, yellow, strongBrown } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    activeLoadingBar(setLoad, navigation);
  }, []);

  return (
    <Container background={white}>
      <BarContainer background={strongBrown}>
        <BarContent background={yellow} load={load}></BarContent>
      </BarContainer>
      <Label>
        <Animatable.View animation="rotate" iterationCount="infinite">
          <Icon
            type="font-awesome"
            name="hourglass-end"
            color={strongBrown}
            brand={true}
          />
        </Animatable.View>
        <Text fontColor={strongBrown}>Cargando...</Text>
      </Label>
    </Container>
  );
};

export default LoadingBar;
