import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import OrderStackScreen from "../pages/OrderPage/orderStackScreen";
import Products from "../pages/ProductsPage";

const Tab = createMaterialTopTabNavigator();

export default function MainNavigator({ route }) {
  const { user } = route.params;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Business Management</Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarStyle: { backgroundColor: "#253743" },
          tabBarIndicatorStyle: {
            height: 3,
            backgroundColor: "white",
          },
        }}
      >
        <Tab.Screen
          name="Orçamento"
          initialParams={{ user: user }}
          component={OrderStackScreen}
        />
        <Tab.Screen
          name="Produtos"
          initialParams={{ user: user }}
          component={Products}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#253743",
    height: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  textHeader: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 15,
    fontSize: 15,
  },
});
