import React, { createContext, useState } from "react";

export const SelectedProductsContext = createContext({});

function SelectedProductsProvider({ children }) {
  const products = [];
  const [resetFlag, setResetFlag] = useState(null);

  upsert = (amount, product) => {
    const index = products.findIndex((item) => item.product === product);

    if (index === -1) {
      products.push({
        product: product,
        amount: amount,
      });
    } else {
      products[index].amount = amount;
    }
  };

  function find(product) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].product === product) {
        return i;
      }
    }
  }

  function remove(product) {
    products.splice(find(product), 1);
  }

  function reset() {
    products.splice(0, products.length);
  }

  return (
    <SelectedProductsContext.Provider
      value={{
        selectedProducts: products,
        upsert,
        remove,
        resetFlag: resetFlag,
        reset,
        setResetFlag,
      }}
    >
      {children}
    </SelectedProductsContext.Provider>
  );
}

export default SelectedProductsProvider;
