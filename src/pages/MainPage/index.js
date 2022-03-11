import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Main() {
  return (
    <View style={styles.container}>
      <Text>Main</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#253743",
  },
});
