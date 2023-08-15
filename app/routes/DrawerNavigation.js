import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "@rneui/themed";

import useTheme from "../hooks/useTheme";
import useAuth from "../hooks/useAuth";

import CustomDrawerContent from "../components/shared/customDrawerContent/CustomDrawerContent";
import DashBoardScreen from "../screens/application/dashBoardScreen/DashBoardScreen";
import TechnicalSupportScreen from "../screens/application/technicalSupportScreen/TechnicalSupportScreen";
import ProfileScreen from "../screens/account/profileScreen/ProfileScreen";
import useApplication from "../hooks/useApplication";
import AppNavigation from "./AppNavigation";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const { white, strongBrown } = useTheme();
  const { isAuth } = useAuth();
  const { isConnected } = useApplication();
  const labelStyle = {
    fontFamily: "Montserrat_400Regular",
    marginLeft: -25,
    fontSize: 14,
  };

  const itemStyle = {
    marginTop: 0,
    borderRadius: 10,
    width: 210,
    height: 60,
    justifyContent: "space-around",
    paddingLeft: 20,
  };

  const drawerStyle = {
    width: 260,
  };

  if (!isAuth) return null;
  return (
    <Drawer.Navigator
      initialRouteName="Inicio"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: strongBrown,
        drawerInactiveBackgroundColor: white,
        drawerActiveTintColor: white,
        drawerInactiveTintColor: strongBrown,
        drawerLabelStyle: labelStyle,
        drawerItemStyle: itemStyle,
        drawerStyle: drawerStyle,
      }}
    >
      <Drawer.Screen
        name="Inicio"
        children={() => <DashBoardScreen />}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Icon color={color} type="material" name="home" brand={true} />
          ),
        }}
      />
      <Drawer.Screen
        name="Mi Finca"
        children={() => <AppNavigation />}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Icon
              color={color}
              type="material"
              name="local-florist"
              brand={true}
            />
          ),
        }}
      />
      {isConnected ? (
        <Drawer.Screen
          name="Perfil"
          children={() => <ProfileScreen />}
          options={{
            headerShown: false,
            drawerIcon: ({ color }) => (
              <Icon color={color} type="material" name="person" brand={true} />
            ),
          }}
        />
      ) : null}
      {isConnected ? (
        <Drawer.Screen
          name="Soporte"
          children={() => <TechnicalSupportScreen />}
          options={{
            headerShown: false,
            drawerIcon: ({ color }) => (
              <Icon
                color={color}
                type="material"
                name="live-help"
                brand={true}
              />
            ),
          }}
        />
      ) : null}
    </Drawer.Navigator>
  );
};
export default DrawerNavigation;
