import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BudgetRow({ item, prices, sum, isRc }) {
  let calc = 0;
  let pct = "";
  prices.push(item.product.price * item.amount);
  prices.forEach((price) => (calc = calc + price));
  sum.pop();
  sum.push(parseFloat(calc).toFixed(2));

  if (item.product.description.includes("Queijo Coalho"))
    pct = parseFloat(item.product.price * 6).toFixed(2);
  else pct = parseFloat(item.product.price * 5).toFixed(2);

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
          width: `${isRc ? "35%" : "43%"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{textAlign: "center"}}>{item.product.description}</Text>
      </View>
      <View
        style={{
          width: `${isRc ? "17%" : "21%"}`,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>{"R$" + parseFloat(item.product.price).toFixed(2)}</Text>
      </View>
      {isRc && (
        <View
          style={{
            width: "17%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>{"R$" + pct}</Text>
        </View>
      )}
      <View
        style={{
          width: `${isRc ? "17%" : "21%"}`,
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
