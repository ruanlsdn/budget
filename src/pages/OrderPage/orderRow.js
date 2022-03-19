import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Checkbox, TextInput } from "react-native-paper";
import { SelectedProductsContext } from "../../contexts/selectedProducts";

export default function OrderRow({ selectedProducts, product }) {
  const { insert, remove, update } = useContext(SelectedProductsContext);
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [amount, setAmount] = useState(0);

  // if (!checked) update(amount, product);

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
              !checked ? insert(amount, product) : remove(product);
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
          <Text style={{ fontSize: 18 }}>{product.description}</Text>
        </View>

        <View style={{ marginLeft: "9%" }}>
          <TextInput
            keyboardType="numeric"
            style={styles.textInput}
            mode="outlined"
            label=""
            activeOutlineColor="black"
            onChangeText={(text) => {
              setAmount(text);
              if (text != "" && text != "0") {
                setDisabled(false);
              } else {
                remove(product);
                setChecked(false);
                setDisabled(true);
              }
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
