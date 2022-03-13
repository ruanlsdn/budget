import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput, Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";

export default function OrderRow({ selectedProducts, product }) {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [amount, setAmount] = useState(0);

  function removeWhenUnchecked() {
    for (let i = 0; i < selectedProducts.length; i++) {
      if (selectedProducts[i].product === product) {
        selectedProducts.splice(i, 1);
      }
    }
  }

  return (
    <>
      <View style={styles.row}>
        <View
          style={{
            width: "20%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Checkbox
            disabled={disabled}
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
              if (!checked) {
                selectedProducts.push({
                  product: product,
                  amount: amount,
                });
              } else {
                removeWhenUnchecked();
              }
              console.log(selectedProducts);
            }}
          />
        </View>

        <View
          style={{
            width: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 18 }}>{product.product}</Text>
        </View>

        <View style={{ marginLeft: "9%" }}>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            label=""
            activeOutlineColor="black"
            onChangeText={(text) => {
              setAmount(text);
              if (text != "") {
                setDisabled(false);
              } else {
                setChecked(false);
                setDisabled(true);
                removeWhenUnchecked();
              }
              console.log(selectedProducts)
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    height: 45,
  },
  textInput: {
    backgroundColor: "#DEDEDE",
    height: 30,
    fontSize: 20,
  },
});
