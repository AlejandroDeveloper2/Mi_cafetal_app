import React, { useState, useEffect, createContext } from "react";
import AwesomeAlert from "react-native-awesome-alerts";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const Loading = () => (
    <AwesomeAlert
      show={isLoading}
      showProgress={true}
      message={loadingText}
      messageStyle={{ fontFamily: "Montserrat_500Medium" }}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
    />
  );

  useEffect(() => {
    return () => {
      setIsLoading(false);
      setLoadingText(null);
    };
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        Loading,
        setIsLoading,
        setLoadingText,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingProvider };
export default LoadingContext;
