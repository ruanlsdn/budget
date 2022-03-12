import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Order from "../pages/OrderPage";
import Products from "../pages/ProductsPage";

const Tab = createMaterialTopTabNavigator();

export default function MainNavigator() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Business Management</Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarStyle: { backgroundColor: "#253743" },
        }}
      >
        <Tab.Screen name="Orçamentos" component={Order} />
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
