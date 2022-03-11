import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Products from "../pages/ProductsPage";

const Tab = createMaterialTopTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Produtos" component={Products}/>
      <Tab.Screen name="Orçamentos" component={Products}/>
    </Tab.Navigator>
  )}