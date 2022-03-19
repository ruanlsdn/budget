import React, { createContext, useState, useEffect, useContext } from "react";

export const SelectedProductsContext = createContext({});

function SelectedProductsProvider({ children }) {
  const products = [];

  function insert(amount, product) {
    products.push({
      product: product,
      amount: amount,
    });
    console.log(products)
  }

  function find(product) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].product === product) {
        return i;
      }
    }
  }

  function update(amount, product) {
    products[find(product)].amount = amount;
    console.log(products)
  }

  function remove(product) {
    products.splice(find(product), 1);
    console.log(products)
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
