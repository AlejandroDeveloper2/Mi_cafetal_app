import { Icon } from "@rneui/themed";
import { useLayoutEffect } from "react";
import * as Network from "expo-network";

import useTheme from "../../../hooks/useTheme";
import useApplication from "../../../hooks/useApplication";

import { Container, Text } from "./ConnectionIndicator.style";

const ConnectionIndicator = () => {
  const { yellow, white } = useTheme();
  const { isConnected, setIsConnected } = useApplication();

  useLayoutEffect(() => {
    const getNetworkConnectionStatus = async () => {
      await Network.getNetworkStateAsync().then((res) => {
        setIsConnected(res.isConnected);
      });
    };
    getNetworkConnectionStatus();
  });

  return (
    <Container background={yellow}>
      <Icon
        type="material"
        name={isConnected ? "signal-wifi-0-bar" : "signal-wifi-off"}
        color={white}
        brand={true}
      />
      <Text fontColor={white}>
        {isConnected ? "En linea" : "Fuera de linea"}
      </Text>
    </Container>
  );
};

export default ConnectionIndicator;
