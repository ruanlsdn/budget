import React, { useState, useEffect } from "react";
import axios from "axios";

const request = axios.create({
  baseURL: "https://notes-generator-api.herokuapp.com/",
});

// REQUESTS TO USER RESOURCE
export function createUser(data) {
  return request.post("api/v1/resources/access-user/create/", data);
}

export function findUser(username, password) {
  return request.get(
    "api/v1/resources/access-user/find-user/" + username + "/" + password
  );
}

// REQUESTS TO PRODUCT RESOURCE
export function createProduct(data) {
  return request.post("api/v1/resources/products/create/", data);
}

export function findProductById(id) {
  return request.get("api/v1/resources/products/find-by-id/" + id);
}

export function findByOwner(id) {
  return request.get("api/v1/resources/products/find-by-owner/" + id);
}

export function updateProduct(id, data) {
  return request.put("api/v1/resources/products/update/" + id, data);
}

export function deleteProduct(id) {
  return request.delete("api/v1/resources/products/delete/" + id);
}
