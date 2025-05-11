// models/deliveryModel.js
const pool = require("../db");

const getAllDeliveryServices = async () => {
  const query = await pool.query("SELECT * FROM delivery_services");
  return query.rows;
};

const updateDeliveryService = async (id, name, website_url) => {
  const query = await pool.query(
    "UPDATE delivery_services SET name = $1, website_url = $2 WHERE id = $3",
    [name, website_url, id]
  );
  return query;
};

const deleteDeliveryService = async (id) => {
  const query = await pool.query(
    "DELETE FROM delivery_services WHERE id = $1",
    [id]
  );
  return query;
};

const addDeliveryService = async (name) => {
  const result = await pool.query(
    "INSERT INTO delivery_services (name) VALUES ($1) RETURNING *",
    [name]
  );
  return result.rows[0];
};

module.exports = {
  getAllDeliveryServices,
  updateDeliveryService,
  deleteDeliveryService,
  addDeliveryService,
};
