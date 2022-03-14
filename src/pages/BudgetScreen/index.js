import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Budget({ route }) {
  const { products } = route.params;

  console.log(products);
  return (
    <View style={styles.container}>
      {products.map((product) => (
        <Text>{product.price}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
