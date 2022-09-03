import axios from "axios";

const request = axios.create({
  baseURL: "https://budget-api-prod.fly.dev/",
  // baseURL: "https://notes-generator-api.herokuapp.com/",
});

// REQUESTS TO USER RESOURCE
export function login(data) {
  return request.post("api/v1/login", data);
}

// REQUESTS TO PRODUCT RESOURCE
export function createProduct(data) {
  return request.post("api/v1/product/", data);
}

export function findByOwner(userId) {
  return request.get("api/v1/product/" + userId);
}

export function updateProduct(id, data) {
  return request.patch("api/v1/product/" + id, data);
}

export function deleteProduct(id) {
  return request.delete("api/v1/product/" + id);
}
