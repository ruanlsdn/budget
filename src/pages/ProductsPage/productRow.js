import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function ProductRow(props) {
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
          <Text style={{ fontSize: 18 }}>{props.product}</Text>
        </View>
        <View
          style={{
            width: "25%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 18 }}>{props.price}</Text>
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
              onPress={() => console.log("update")}
            >
              <Icon name="form" size={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("delete")}>
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
