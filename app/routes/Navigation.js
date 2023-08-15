import { createStackNavigator } from "@react-navigation/stack";

import useAuth from "../hooks/useAuth";

import LoadingScreen from "../screens/application/loadingScreen/LoadingScreen";
import LoginScreen from "../screens/auth/loginScreen/LoginScreen";
import RegistrationScreen from "../screens/auth/registrationScreen/RegistrationScreen";
import RecoverScreen from "../screens/auth/recoverScreen/RecoverScreen";
import DrawerNavigation from "./DrawerNavigation";

const Stack = createStackNavigator();

const Navigation = () => {
  const { isAuth } = useAuth();
  return (
    <Stack.Navigator initialRouteName="Loading">
      {!isAuth ? (
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loading" children={() => <LoadingScreen />} />
          <Stack.Screen name="Login" children={() => <LoginScreen />} />
          <Stack.Screen
            name="Registration"
            children={() => <RegistrationScreen />}
          />
          <Stack.Screen name="Recover" children={() => <RecoverScreen />} />
        </Stack.Group>
      ) : (
        <Stack.Screen
          name="Dashboard"
          children={() => <DrawerNavigation />}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default Navigation;
