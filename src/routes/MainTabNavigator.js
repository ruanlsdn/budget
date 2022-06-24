import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ProductsContext } from "../contexts/products";
import Order from "../pages/OrderPage";
import Products from "../pages/ProductsPage";

const Tab = createMaterialTopTabNavigator();

export default function MainTabNavigator() {
  const { find } = useContext(ProductsContext);

  useEffect(() => {
    find();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Budget</Text>
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
        <Tab.Screen name="Pedido" component={Order} />
        <Tab.Screen name="Produtos" component={Products} />
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
