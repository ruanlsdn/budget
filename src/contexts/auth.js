import React, { createContext, useState, useContext } from "react";
import { findUser } from "../services/ApiRequest";
import { useNavigation } from "@react-navigation/native";
import { ProductsContext } from "../contexts/products";

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
        setAnimating(false)
        setUser(response);
        navigation.navigate("Main");
      }else{
        setAnimating(false)
        setSnackBar(true);
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{ user: user, signIn, snackBar: snackBar, setSnackBar, animating:animating, setAnimating }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
