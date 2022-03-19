import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BudgetRow({ item, prices, sum }) {
  let calc = 0;
  prices.push(item.product.price * item.amount);
  prices.forEach((price) => (calc = calc + price));
  sum.pop();
  sum.push(parseFloat(calc).toFixed(2));

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
        <Text>{item.product.description}</Text>
      </View>
      <View
        style={{
          width: "17%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>{"R$" + parseFloat(item.product.price).toFixed(2)}</Text>
      </View>
      <View
        style={{
          width: "17%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>{"R$" + parseFloat(item.product.price * 5).toFixed(2)}</Text>
      </View>
      <View
        style={{
          width: "17%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>
          {"R$" + parseFloat(item.amount * item.product.price).toFixed(2)}
        </Text>
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
