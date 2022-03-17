import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Order from ".";
import Budget from "../BudgetScreen";

const OrderStack = createNativeStackNavigator();

export default function OrderStackScreen({ route }) {
  const { user } = route.params;

  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        initialParams={{ user: user }}
        name="Order"
        options={{ headerShown: false }}
        component={Order}
      />
      <OrderStack.Screen
        name="Budget"
        options={{ headerShown: false }}
        component={Budget}
      />
    </OrderStack.Navigator>
  );
}
