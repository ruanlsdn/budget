import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Animatable.View animation="flipInY" style={styles.containerLogo}>
        <Image
          style={{ width: "100%", height: 150 }}
          source={require("../../assets/logo.png")}
          resizeMode="contain"
        />
        <Text style={styles.description}>
          A organização do seu negócio na palma das mãos!asads
        </Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.formTitle}>Login</Text>
        <TextInput
          style={{
            borderRadius: 20,
            marginLeft: 20,
            marginRight: 20,
          }}
          label="Usuário"
        />
        <TextInput
          style={{ borderRadius: 20, marginLeft: 20, marginRight: 20 }}
          label="Senha"
          secureTextEntry
          right={<TextInput.Icon name="eye" />}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Main")}style={styles.button}>
          <Text style={{ color: "#FFF" }}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#253743",
  },
  containerLogo: {
    flex: 1,
    backgroundColor: "#253743",
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    marginHorizontal: 15,
  },
  formTitle: {
    fontSize: 45,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 50,
  },
  containerForm: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#DEDEDE",
  },
  button: {
    position: "absolute",
    backgroundColor: "#253743",
    borderRadius: 20,
    alignSelf: "center",
    width: "90%",
    height: 50,
    bottom: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
  },
});
