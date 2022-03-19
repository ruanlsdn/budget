import React, { useState, useContext } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { TextInput, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { createUser, findUser } from "../../services/ApiRequest";
import { AuthContext } from "../../contexts/auth";

export default function Login() {
  const { signIn, snackBar, setSnackBar } = useContext(AuthContext);
  const navigation = useNavigation();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const onDismissSnack = () => setSnackBar(false);

  return (
    <View style={styles.container}>
      <View animation="flipInY" style={styles.containerLogo}>
        <Image
          style={{ width: "100%", height: 150 }}
          source={require("../../assets/logo.png")}
          resizeMode="contain"
        />
        <Text style={styles.titleLogo}>Business Management</Text>
        <Text style={styles.descriptionLogo}>
          A organização do seu negócio em suas mãos!
        </Text>
      </View>

      <View delay={1000} animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.formTitle}>Login</Text>
        <TextInput
          onChangeText={(text) => setUsername(text)}
          mode="outlined"
          style={{
            borderRadius: 20,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 5,
            backgroundColor: "#DEDEDE",
          }}
          activeOutlineColor="black"
          label="Usuário"
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          mode="outlined"
          style={{
            borderRadius: 20,
            marginLeft: 20,
            marginRight: 20,
            backgroundColor: "#DEDEDE",
          }}
          label="Senha"
          secureTextEntry
          activeOutlineColor="black"
          right={<TextInput.Icon name="eye" />}
        />
        <TouchableOpacity onPress={async() => await signIn(username, password)} style={styles.button}>
          <Text style={{ color: "#FFF" }}>Acessar</Text>
        </TouchableOpacity>
      </View>

      <Snackbar
        duration={1000 * 3}
        onDismiss={onDismissSnack}
        visible={snackBar}
      >
        Usuário não cadastrado ou dados de autenticação incorretos.
      </Snackbar>
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
  titleLogo: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    marginHorizontal: 15,
  },
  descriptionLogo: {
    fontSize: 15,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 15,
  },
  formTitle: {
    fontSize: 45,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 25,
  },
  containerForm: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#DEDEDE",
  },
  button: {
    backgroundColor: "#253743",
    borderRadius: 20,
    alignSelf: "center",
    width: 350,
    height: 50,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
  },
});
