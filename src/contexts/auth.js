import { useNavigation } from "@react-navigation/native";
import { createContext, useState } from "react";
import { login } from "../services/ApiRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [snackBar, setSnackBar] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const navigation = useNavigation();

  async function signIn(user, password) {
    try {
      const response = await login({ name: user, password });

      if (response.status === 201) {
        setUser(response.data);

        const keys = await AsyncStorage.getAllKeys();
        if (keys.length <= 1) {
          await AsyncStorage.setItem("@isLoggedIn", "true");
          await AsyncStorage.setItem("@username", user);
          await AsyncStorage.setItem("@password", password);
        }

        setAnimating(false);
        navigation.navigate("Main");
      }
    } catch (error) {
      setMensagem(error.message);
      setSnackBar(true);
      setAnimating(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: user,
        signIn,
        snackBar: snackBar,
        setSnackBar,
        animating: animating,
        setAnimating,
        mensagem: mensagem,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
