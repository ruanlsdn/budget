import { useNavigation } from "@react-navigation/native";
import { createContext, useState } from "react";
import { findUser } from "../services/ApiRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [snackBar, setSnackBar] = useState(false);
  const [animating, setAnimating] = useState(false);
  const navigation = useNavigation();

  async function signIn(user, password) {
    if (user !== "" && password !== "") {
      const response = await (await findUser(user, password)).data;

      if (response) {
        setAnimating(false);
        setUser(response);
        const promise = async () => {
          const response = await AsyncStorage.getAllKeys();

          if (response.length <= 1) {
            await AsyncStorage.setItem("@isLoggedIn", "true");
            await AsyncStorage.setItem("@username", user);
            await AsyncStorage.setItem("@password", password);
          }

          navigation.navigate("Main");
        };
        promise();
      } else {
        setAnimating(false);
        setSnackBar(true);
      }
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
