import React, { createContext, useState, useEffect, useContext } from "react";

export const SelectedProductsContext = createContext({});

function SelectedProductsProvider({ children }) {
  const products = [];
  const [resetFlag, setResetFlag] = useState(null);

  function insert(amount, product) {
    products.push({
      product: product,
      amount: amount,
    });
  }

  function find(product) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].product === product) {
        return i;
      }
    }
  }

  function update(amount, product) {}

  function remove(product) {
    products.splice(find(product), 1);
  }

  function reset() {
    products.splice(0, products.length);
    setResetFlag(1);
  }

  return (
    <SelectedProductsContext.Provider
      value={{
        selectedProducts: products,
        insert,
        update,
        remove,
        resetFlag: resetFlag,
        reset,
        setResetFlag
      }}
    >
      {children}
    </SelectedProductsContext.Provider>
  );
}

export default SelectedProductsProvider;
