import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { ProductsContext } from "../../contexts/products";

export default function ProductRow({ product }) {
  const { remove } = useContext(ProductsContext);
  return (
    <>
      <View style={styles.row}>
        <View
          style={{
            width: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 18 }}>{product.description}</Text>
        </View>
        <View
          style={{
            width: "25%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 18 }}>
            {parseFloat(product.price).toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            width: "25%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => console.log(product.id)}
            >
              <Icon name="form" size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                remove(product.id);
              }}
            >
              <Icon name="delete" size={25} />
            </TouchableOpacity>
          </View>
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
});
