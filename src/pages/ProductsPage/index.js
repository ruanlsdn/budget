import React, { useEffect, useState, useContext } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DataTable, Divider, TextInput } from "react-native-paper";
import ProductRow from "./productRow";
import {
  createProduct,
  findUser,
  findByOwner,
} from "../../services/ApiRequest";
import { useIsFocused } from "@react-navigation/native";
import { ProductsContext } from "../../contexts/products";
import { AuthContext } from "../../contexts/auth";

export default function Products() {
  const [product, setProduct] = useState(null);
  const [price, setPrice] = useState(null);
  const { create, products, modal, setModal } = useContext(ProductsContext);
  const { user } = useContext(AuthContext);
  
  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Adicionar Produto
              </Text>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => setModal(!modal)}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginLeft: "55%",
                  }}
                >
                  X
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              onChangeText={(text) => setProduct(text)}
              mode="outlined"
              activeOutlineColor="black"
              style={{
                borderRadius: 5,
                height: 50,
                backgroundColor: "white",
              }}
              label="Descrição"
            />
            <TextInput
              onChangeText={(text) => setPrice(text)}
              mode="outlined"
              keyboardType="numeric"
              activeOutlineColor="black"
              style={{ borderRadius: 5, height: 50, backgroundColor: "white" }}
              label="Preço"
            />
            <TouchableOpacity
              style={styles.buttonForm}
              onPress={() =>
                create({
                  product: product,
                  price: price,
                  ownerId: user.id,
                })
              }
            >
              <Text style={{ color: "#FFF" }}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.contentContainer}>
        {products.length === 0 ? (
          <Text style={{ fontSize: 20 }}>Nenhum produto cadastrado.</Text>
        ) : (
          <>
            <View style={styles.tableHeader}>
              <View style={{ width: "50%", alignItems: "center" }}>
                <Text style={styles.tableHeaderText}>Descrição</Text>
              </View>
              <View style={{ width: "25%", alignItems: "center" }}>
                <Text style={styles.tableHeaderText}>Preço</Text>
              </View>
              <View style={{ width: "25%", alignItems: "center" }}>
                <Text style={styles.tableHeaderText}>Ações</Text>
              </View>
            </View>
            <ScrollView style={{ flex: 1 }}>
              <View style={styles.tableRows}>
                <Divider style={{ height: 3 }} />
                {products.map((product) => (
                  <>
                    <ProductRow product={product} />
                    <Divider style={{ height: 3 }} />
                  </>
                ))}
              </View>
            </ScrollView>
          </>
        )}

        <TouchableOpacity
          onPress={() => setModal(!modal)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#253743",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#DEDEDE",
    alignItems: "center",
    justifyContent: "center",
  },
  tableHeader: { flexDirection: "row", marginTop: 20, height: "5%" },
  tableHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
  },
  tableRows: { flex: 1, flexDirection: "column", width: "100%" },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    padding: 15,
    height: 280,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flex: 1,
    flexDirection: "row",
  },
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
  buttonForm: {
    backgroundColor: "#253743",
    borderRadius: 20,
    alignSelf: "center",
    width: "100%",
    height: 50,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
