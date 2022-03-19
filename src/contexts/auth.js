import React, { createContext, useState, useContext } from "react";
import { findUser } from "../services/ApiRequest";
import { useNavigation } from "@react-navigation/native";
import { ProductsContext } from "../contexts/products";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [snackBar, setSnackBar] = useState(false);
  const navigation = useNavigation();

  async function signIn(user, password) {
    if (user !== "" && password !== "") {
      const response = await (await findUser(user, password)).data;
      if (response) {
        setUser(response);
        navigation.navigate("Main");
      }
      setSnackBar(true);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user: user, signIn, snackBar: snackBar, setSnackBar }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
