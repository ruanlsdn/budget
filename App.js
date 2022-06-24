import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes/MainStackNavigator";
import AuthProvider from "./src/contexts/auth";
import ProductsProvider from "./src/contexts/products";
import SelectedProductsProvider from "./src/contexts/selectedProducts";
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#253743" barStyle="light-content" />
      <AuthProvider>
        <ProductsProvider>
          <SelectedProductsProvider>
            <Routes />
          </SelectedProductsProvider>
        </ProductsProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
