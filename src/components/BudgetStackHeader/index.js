import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import Icon from "react-native-vector-icons/Feather";
import { SelectedProductsContext } from "../../contexts/selectedProducts";

export default function headerRight() {
  return (
    <TouchableOpacity onPress={() => console.log(1)}>
      <Icon color="white" name="refresh-cw" size={20}/>
    </TouchableOpacity>
  );
}
