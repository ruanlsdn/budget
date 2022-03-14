import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BudgetRow from "./budgetRow";
import { Divider } from "react-native-paper";

export default function Budget({ route }) {
  const { products } = route.params;

  return (
    <View style={styles.contentContainer}>
      {products.length === 0 ? (
        <Text style={{ fontSize: 20 }}>
          Nenhum produto adicionado ao carrinho.
        </Text>
      ) : (
        <>
          <View style={styles.tableHeader}>
            <View
              style={{
                width: "13%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.tableHeaderText}>Quantia</Text>
            </View>
            <View
              style={{
                width: "35%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.tableHeaderText}>Produto</Text>
            </View>

            <View
              style={{
                width: "17%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.tableHeaderText}>Unidade</Text>
            </View>
            <View
              style={{
                width: "17%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.tableHeaderText}>Pacote</Text>
            </View>
            <View
              style={{
                width: "17%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.tableHeaderText}>Total</Text>
            </View>
          </View>
          <Divider style={{ height: 3 }} />
          <View style={styles.tableRows}>
          <Divider style={{ height: 3 }} />
            {products.map((item) => (
              <>
                <BudgetRow item={item} />
                <Divider style={{ height: 3 }} />
              </>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "#DEDEDE",
    alignItems: "center",
    justifyContent: "center",
  },
  tableHeader: {
    flexDirection: "row",
    marginTop: 20,
    height: "5%",
  },
  tableHeaderText: {
    fontSize: 15,
    fontWeight: "bold",
    alignItems: "center",
  },
  tableRows: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
});
