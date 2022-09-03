import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import { ProductsContext } from "../../contexts/products";
import OrderRow from "./orderRow";

export default function Order() {
  const navigation = useNavigation();
  const { products } = useContext(ProductsContext);

  return (
    <>
      {products.length === 0 ? (
        <View style={styles.container}>
          <Text style={{ fontSize: 20 }}>Nenhum produto cadastrado.</Text>
        </View>
      ) : (
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
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.tableRows}>
              <Divider style={{ height: 3 }} />
              {products?.map((product, i) => (
                <>
                  <OrderRow product={product} />
                  <Divider style={{ height: 3 }} />
                </>
              ))}
            </View>
            {/* <View style={{ height: 50 }}>
              <Text></Text>
            </View> */}
          </ScrollView>
        </View>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate("Budget")}
        style={styles.button}
      >
        <Icon color="white" name="shopping-cart" size={25} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#DEDEDE",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#DEDEDE",
  },
  tableHeader: {
    flexDirection: "row",
    marginTop: 5,
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
