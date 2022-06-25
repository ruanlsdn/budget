import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import Icon from "react-native-vector-icons/Feather";
import { SelectedProductsContext } from "../../contexts/selectedProducts";

export default function headerRight() {
  const { reset, setResetFlag } = useContext(SelectedProductsContext);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        reset();
        setResetFlag(1);
        navigation.goBack();
      }}
    >
      <Icon color="white" name="refresh-cw" size={20} />
    </TouchableOpacity>
  );
}
