import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { ProductsContext } from "../contexts/products";
import Order from "../pages/OrderPage";
import Products from "../pages/ProductsPage";
import { useNavigation } from "@react-navigation/native";
import { SelectedProductsContext } from "../contexts/selectedProducts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createMaterialTopTabNavigator();

export default function MainTabNavigator() {
  const { find } = useContext(ProductsContext);
  const { reset } = useContext(SelectedProductsContext);
  const navigation = useNavigation();

  useEffect(() => {
    find();
  }, []);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        const action = e.data.action;

        e.preventDefault();

        Alert.alert(
          "Deseja sair de sua conta?",
          "Você será redirecionado para a tela de login.",
          [
            {
              text: "Não",
              style: "cancel",
              onPress: () => {},
            },
            {
              text: "Sair",
              style: "destructive",
              onPress: () => {
                navigation.dispatch(action);
                reset();
                const promise = async () => {
                  await AsyncStorage.setItem("@isLoggedIn", "false");
                  await AsyncStorage.multiRemove(["@username", "@password"]);
                };
                promise();
              },
            },
          ]
        );
      }),
    [navigation]
  );

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
