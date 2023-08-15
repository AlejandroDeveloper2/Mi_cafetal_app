import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox, Text, View } from "react-native";
import {
  useFonts,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

import { firebaseApp } from "./app/utils/firebase";
import Navigation from "./app/routes/Navigation";
// import { db } from "./app/utils/sqlite";

//Online contexts
import { AuthProvider } from "./app/context/AuthProvider";
import { ApplicationProvider } from "./app/context/ApplicationProvider";
import { SupportProvider } from "./app/context/SupportProvider";
import { AccountProvider } from "./app/context/AccountProvider";
import { BatchesProvider } from "./app/context/BatchesProvider";
import { FarmProvider } from "./app/context/FarmProvider";
import { CropExpensesProvider } from "./app/context/CropExpensesProvider";
import { ReportsProvider } from "./app/context/ReportsProvider";
import { AlertProvider } from "./app/context/AlertProvider";
import { LoadingProvider } from "./app/context/LoadingProvider";

//Offline contexts
import { FarmProviderOffline } from "./app/context/offlineContexts/FarmProviderOffline";
import { BatchesProviderOffline } from "./app/context/offlineContexts/BatchesProviderOffline";

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage",
  "Can't perform a React state update on an unmounted component",
  "Animated: `useNativeDriver`",
]);
export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded)
    return (
      <View>
        <Text>Cargando..</Text>
      </View>
    );
  return (
    <ApplicationProvider>
      <LoadingProvider>
        <AlertProvider>
          <AccountProvider>
            <AuthProvider>
              <FarmProvider>
                <BatchesProvider>
                  <CropExpensesProvider>
                    <FarmProviderOffline>
                      <BatchesProviderOffline>
                        <SupportProvider>
                          <ReportsProvider>
                            <NavigationContainer>
                              <StatusBar style="auto" />
                              <Navigation />
                            </NavigationContainer>
                          </ReportsProvider>
                        </SupportProvider>
                      </BatchesProviderOffline>
                    </FarmProviderOffline>
                  </CropExpensesProvider>
                </BatchesProvider>
              </FarmProvider>
            </AuthProvider>
          </AccountProvider>
        </AlertProvider>
      </LoadingProvider>
    </ApplicationProvider>
  );
}
