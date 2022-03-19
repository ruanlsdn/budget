import React, { createContext, useState, useEffect, useContext } from "react";
import {
  createProduct,
  findByOwner,
  findProductById,
  updateProduct,
  deleteProduct,
} from "../services/ApiRequest";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "./auth";

export const ProductsContext = createContext({});

function ProductsProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [controller, setController] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    find();
  }, [controller]);

  async function create(body) {
    const response = await (await createProduct(body)).status;
    response == 201 ? setController(!controller) : null;
    setModal(false);
  }

  function updateProduct(description, price) {
    console.log("uppdate");
  }

  async function find() {
    const response = await (await findByOwner(user.id)).data;
    setProducts(response);
  }

  async function findById(id) {
    const response = await (await findProductById(id)).data;
  }

  async function remove(id) {
    const response = await (await deleteProduct(id)).status;
    if (response == 200) {
      setController(!controller);
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        products: products,
        create,
        find,
        remove,
        modal,
        setModal,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsProvider;
