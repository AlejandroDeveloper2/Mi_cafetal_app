import React, { useState, useEffect, createContext, useMemo } from "react";
import { View, Text } from "react-native";
import { Icon, Dialog } from "@rneui/themed";

import useTheme from "../hooks/useTheme";

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);

  const { red, yellow, successColor, white } = useTheme();

  const container = {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const text = {
    color: white,
    fontFamily: "Montserrat_500Medium",
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
  };

  const showAlert = () => {
    setIsAlertVisible(true);
  };

  const hideAlert = (delay = 2000) => {
    setTimeout(() => {
      setIsAlertVisible(false);
    }, delay);
  };

  const setAlert = (type, message) => {
    setType(type);
    setMessage(message);
  };

  useEffect(() => {
    return () => {
      setIsAlertVisible(false);
      setType(null);
      setMessage(null);
    };
  }, []);

  const CustomView = () => (
    <View style={container}>
      <Icon
        type="font-awesome"
        name={
          type === "success"
            ? "check"
            : type === "warning"
            ? "exclamation-circle"
            : "close"
        }
        color={white}
        brand={true}
      />
      <Text style={text}>{message}</Text>
    </View>
  );

  const Alert = () => (
    <Dialog
      isVisible={isAlertVisible}
      onBackdropPress={hideAlert}
      animationType="fade"
      overlayStyle={
        type === "success"
          ? {
              borderColor: white,
              borderWidth: 2,
              backgroundColor: successColor,
            }
          : type === "warning"
          ? { borderColor: white, borderWidth: 2, backgroundColor: yellow }
          : { borderColor: white, borderWidth: 2, backgroundColor: red }
      }
    >
      <CustomView />
    </Dialog>
  );

  const value = useMemo(
    () => ({
      Alert,
      showAlert,
      hideAlert,
      setAlert,
    }),
    [Alert, showAlert, hideAlert, setAlert]
  );

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};

export { AlertProvider };
export default AlertContext;
