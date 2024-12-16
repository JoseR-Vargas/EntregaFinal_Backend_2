import  { createService, readService, updateService, destroyService } from "../services/carts.service.js"

async function createCart(req, res) {
  
  const message = "CART CREATED";
  const data = req.body;

  const response = await createService(data)
  return res.status(201).json({ response, message });
}
async function readCartsFromUser(req, res) {
  const { user_id } = req.params;
  const message = "CARTS FOUND";
  console.log(user_id);
  const response = await readService(user_id)
  console.log(response);
  
  return res.status(200).json({ response, message });
}
async function updateCart(req, res) {
  const { id } = req.params;
  const data = req.body;
  const message = "CART UPDATED";
  const response = await updateCart(id, data)
  return res.status(200).json({ response, message });
}
async function destroyCart(req, res) {
  const { id } = req.params;
  const message = "CART DELETED";
  const response = await destroyCart(id)
  return res.status(200).json({ response, message });
}

export { createCart, readCartsFromUser, updateCart, destroyCart };