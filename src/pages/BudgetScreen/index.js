import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import BudgetRow from "./budgetRow";
import { Divider } from "react-native-paper";
import { SelectedProductsContext } from "../../contexts/selectedProducts";
import { AuthContext } from "../../contexts/auth";

export default function Budget() {
  let prices = [];
  let sum = [];
  const { selectedProducts } = useContext(SelectedProductsContext);
  const { user } = useContext(AuthContext)
  const isRc = user.name === "rc"

  return (
    <View style={styles.contentContainer}>
      {selectedProducts.length === 0 ? (
        <Text style={{ fontSize: 20 }}>
          Nenhum produto adicionado ao carrinho.
        </Text>
      ) : (
        <>
          <View style={styles.tableHeader}>
            <View
              style={{
                width: "14%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.tableHeaderText}>Quantia</Text>
            </View>
            <View
              style={{
                width: `${isRc ? "35%" : "43%"}`,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.tableHeaderText}>Produto</Text>
            </View>

            <View
              style={{
                width: `${isRc ? "17%" : "21%"}`,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.tableHeaderText}>Unidade</Text>
            </View>
            {isRc && (
              <View
                style={{
                  width: "17%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.tableHeaderText}>Pacote</Text>
              </View>
            )}
            <View
              style={{
                width: `${isRc ? "17%" : "21%"}`,
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
            {selectedProducts.map((item) => (
              <>
                <BudgetRow
                  prices={prices}
                  item={item}
                  sum={sum}
                  isRc={isRc}
                />
                <Divider style={{ height: 3 }} />
              </>
            ))}
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 15,
              }}
            >
              <Text style={styles.sumText}>Total do Pedido: R$</Text>
              <Text style={styles.sumText}>{sum}</Text>
            </View>
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
  sumText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
