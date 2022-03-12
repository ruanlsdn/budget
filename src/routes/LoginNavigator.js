import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../pages/LoginPage";
import MainNavigator from "./MainNavigator";

const Stack = createNativeStackNavigator();

export default function LoginNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Main"
        component={MainNavigator}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
