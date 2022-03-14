import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BudgetRow({ item }) {
  return (
    <View style={styles.row}>
      <View
        style={{
          width: "13%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>{item.amount}</Text>
      </View>
      <View
        style={{
          width: "35%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>{item.product.product}</Text>
      </View>
      <View
        style={{
          width: "17%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>{"R$" + item.product.price}</Text>
      </View>
      <View
        style={{
          width: "17%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>{"R$" + item.product.price * 5}</Text>
      </View>
      <View
        style={{
          width: "17%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>{"R$" + item.amount * item.product.price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    height: 45,
  },
});
