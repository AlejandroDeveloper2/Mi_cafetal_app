import { createStackNavigator } from "@react-navigation/stack";

import MyFarmScreen from "../screens/application/myFarmScreen/MyFarmScreen";
import BatchScreen from "../screens/application/batchScreen/BatchScreen";
import CultivationStageScreen from "../screens/application/cultivationStageScreen/CultivationStageScreen";

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="MyFarmScreen">
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MyFarmScreen" component={MyFarmScreen} />
        <Stack.Screen name="Batch" component={BatchScreen} />
        <Stack.Screen
          name="CultivationStage"
          component={CultivationStageScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppNavigation;
