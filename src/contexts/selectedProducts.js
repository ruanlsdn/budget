import React, { createContext, useState, useEffect, useContext } from "react";

export const SelectedProductsContext = createContext({});

function SelectedProductsProvider({ children }) {
  const products = [];

  console.log(1);

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

  function update(amount, product) {
  }

  function remove(product) {
    products.splice(find(product), 1);
  }

  return (
    <SelectedProductsContext.Provider
      value={{ selectedProducts: products, insert, update, remove }}
    >
      {children}
    </SelectedProductsContext.Provider>
  );
}

export default SelectedProductsProvider;
