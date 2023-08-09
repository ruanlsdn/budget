import axios from "axios";

const request = axios.create({
  baseURL: "https://budget-api-prod.fly.dev/",
  // baseURL: "https://notes-generator-api.herokuapp.com/",
});

// REQUESTS TO USER RESOURCE
export async function login(data) {
  return await request.post("api/v1/login", data);
}

// REQUESTS TO PRODUCT RESOURCE
export async function createProduct(data) {
  return await request.post("api/v1/product/", data);
}

export async function findByOwner(userId) {
  return await request.get("api/v1/product/" + userId);
}

export async function updateProduct(id, data) {
  return await request.patch("api/v1/product/" + id, data);
}

export async function deleteProduct(id) {
  return await request.delete("api/v1/product/" + id);
}
