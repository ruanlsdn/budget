import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import {
  ActivityIndicator,
  Colors,
  Snackbar,
  TextInput,
} from "react-native-paper";
import { AuthContext } from "../../contexts/auth";
import * as LocalAuthentication from "expo-local-authentication";

export default function Login() {
  const { signIn, snackBar, setSnackBar, animating, setAnimating } =
    useContext(AuthContext);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [security, setSecurity] = useState(true);
  const onDismissSnack = () => setSnackBar(false);

  useEffect(() => {
    const promise = async () => {
      const response = await AsyncStorage.getItem("@isLoggedIn");
      if (response.length == 4) {
        const biometricsResponse = await LocalAuthentication.authenticateAsync({
          promptMessage: "Budget",
          disableDeviceFallback: false,
        });
        if(biometricsResponse.success){
          signIn(await AsyncStorage.getItem("@username"), await AsyncStorage.getItem("@password"))
          setAnimating(true)
        }
      }
    };
    promise();
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInDown" style={styles.containerLogo}>
        <Image
          style={{ width: "100%", height: 150, tintColor: "white" }}
          source={require("../../assets/logo.png")}
          resizeMode="contain"
        />
        <Text style={styles.titleLogo}>Orçamentos</Text>
        <Text style={styles.descriptionLogo}>
          A organização do seu negócio em suas mãos!
        </Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <KeyboardAvoidingView behavior="height">
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
            secureTextEntry={security}
            activeOutlineColor="black"
            right={
              <TextInput.Icon
                name="eye"
                onPress={() => setSecurity(!security)}
              />
            }
          />
          <TouchableOpacity
            onPress={() => {
              setAnimating(true);
              signIn(username, password);
            }}
            style={styles.button}
          >
            <Text style={{ color: "#FFF" }}>Acessar</Text>
          </TouchableOpacity>
          <ActivityIndicator
            style={{ marginTop: 50 }}
            size="large"
            animating={animating}
            color={Colors.black}
          />
        </KeyboardAvoidingView>
      </Animatable.View>

      <Snackbar
        duration={1000 * 2}
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
    flex: 2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#DEDEDE",
  },
  button: {
    backgroundColor: "#253743",
    borderRadius: 20,
    alignSelf: "center",
    width: 380,
    height: 50,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
  },
});
