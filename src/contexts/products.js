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
  const [modalUpdate, setModalUpdate] = useState(false);
  const [newId, setNewId] = useState(null);
  const [newDescription, setNewDescription] = useState(null);
  const [newPrice, setNewPrice] = useState(null);

  useEffect(() => {
    find();
  }, [controller]);

  async function create(body) {
    const response = await (await createProduct(body)).status;
    response == 201 ? setController(!controller) : null;
    setModal(false);
  }

  async function update(id, body) {
    const response = await (await updateProduct(id, body)).status;
    response === 200 ? setController(!controller) : null;
    setModalUpdate(false);
  }

  async function find() {
    const response = await (await findByOwner(user.id)).data;
    setProducts(response);
  }

  async function findById(product) {
    setNewId(product.id);
    setNewDescription(product.description);
    setNewPrice(product.price);
    setModalUpdate(true);
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
        update,
        findById,
        remove,
        modal,
        setModal,
        modalUpdate,
        setModalUpdate,
        newId,
        newPrice,
        setNewPrice,
        newDescription,
        setNewDescription,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsProvider;
