import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Budget from "../pages/BudgetScreen";

import Login from "../pages/LoginPage";
import Order from "../pages/OrderPage";
import MainTabNavigator from "./MainTabNavigator";

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      ></Stack.Screen>
       <Stack.Screen
        name="Budget"
        component={Budget}
        options={{ headerShown: true }}
      ></Stack.Screen>
       <Stack.Screen
        name="Order"
        component={Order}
        options={{ headerShown: true }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
