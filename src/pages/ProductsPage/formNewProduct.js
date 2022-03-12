import React, {useState} from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { DataTable, TextInput } from "react-native-paper";

export default function FormNewProduct({ open }) {
  const [modal, setModal] = useState(!open);
  return (
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
              Adicionar produto
            </Text>
            <TouchableOpacity
              onPress={() => setModal(!modal)}
              style={{ alignItems: "center" }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", marginLeft: 140 }}
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
            onPress={() => setModal(!modal)}
            style={styles.button}
          >
            <Text style={{ color: "#FFF" }}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#253743",
    borderRadius: 20,
    alignSelf: "center",
    width: "90%",
    height: 50,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
