import React, { useState } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { DataTable, TextInput } from "react-native-paper";

export default function Products() {
  const [modal, setModal] = useState(false);
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
                  style={{ fontSize: 20, fontWeight: "bold", marginLeft: 160 }}
                >
                  X
                </Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={{ borderRadius: 5, height: 50, marginVertical: 20 }}
              label="Descrição"
            />
            <TextInput style={{ borderRadius: 5, height: 50 }} label="Preço" />
            <TouchableOpacity
              style={styles.buttonForm}
              onPress={() => setModal(!modal)}
            >
              <Text style={{ color: "#FFF" }}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.menuContainer}></View>
      <View style={styles.contentContainer}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Descrição</DataTable.Title>
            <DataTable.Title numeric>Preço</DataTable.Title>
            <DataTable.Title numeric>Ações</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>Frozen yogurt</DataTable.Cell>
            <DataTable.Cell numeric>159</DataTable.Cell>
            <DataTable.Cell numeric>6.0</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
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
    flex: 12,
    backgroundColor: "#DEDEDE",
  },
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
