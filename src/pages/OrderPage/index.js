import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import OrderRow from "./orderRow";
import { Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";

export default function Order({ navigation }) {
  const products = [
    {
      id: 1,
      product: "Asinha de Frango",
      price: 4.7,
    },
    {
      id: 2,
      product: "Contrafilé (120g)",
      price: 4.2,
    },
    {
      id: 3,
      product: "Contrafilé (80g)",
      price: 3.3,
    },
    {
      id: 4,
      product: "Coração",
      price: 3.3,
    },
  ];

  let selectedProducts = [];

  return (
    <View style={styles.contentContainer}>
      <View style={styles.tableHeader}>
        <View
          style={{
            width: "20%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.tableHeaderText}>Incluir</Text>
        </View>
        <View
          style={{
            width: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.tableHeaderText}>Produto</Text>
        </View>
        <View
          style={{
            width: "30%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.tableHeaderText}>Quantidade</Text>
        </View>
      </View>
      <View style={styles.tableRows}>
        <Divider style={{ height: 3 }} />
        {products.map((product) => (
          <>
            <OrderRow selectedProducts={selectedProducts} product={product} />
            <Divider style={{ height: 3 }} />
          </>
        ))}
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Budget", {
            products: selectedProducts,
          })
        }
        style={styles.button}
      >
        <Icon color="white" name="shopping-cart" size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "#DEDEDE",
  },
  tableHeader: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
  },
  tableHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  tableRows: { flex: 1, flexDirection: "column", width: "100%" },
  button: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 60,
    backgroundColor: "#253743",
    borderRadius: 100,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
