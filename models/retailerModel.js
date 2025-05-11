// models/retailerModel.js
const pool = require("../db");

const getAllRetailers = async () => {
  try {
    const query = await pool.query("SELECT * FROM retailers");
    return query.rows;
  } catch (error) {
    throw new Error("Error fetching retailers");
  }
};

const updateRetailer = async (id, name, website_url) => {
  try {
    const query = await pool.query(
      "UPDATE retailers SET name = $1, website_url = $2 WHERE id = $3",
      [name, website_url, id]
    );
    return query.rowCount;
  } catch (error) {
    throw new Error("Error updating retailer");
  }
};

const deleteRetailer = async (id) => {
  try {
    const query = await pool.query("DELETE FROM retailers WHERE id = $1", [id]);
    return query.rowCount;
  } catch (error) {
    throw new Error("Error deleting retailer");
  }
};

const getRetailerById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM retailers WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error fetching retailer");
  }
};
const addRetailer = async (name, website_url) => {
  console.log("Running addRetailer function");
  try {
    const query = await pool.query(
      "INSERT INTO retailers (name, website_url) VALUES ($1, $2) RETURNING *",
      [name, website_url]
    );
    return query.rows[0];
  } catch (error) {
    throw new Error("Error adding retailer");
  }
};

const addDeliveryService = async (retailerId, deliveryServiceId) => {
  try {
    const query = await pool.query(
      "INSERT INTO retailer_delivery_services (retailer_id, delivery_service_id, approved_by_admin) VALUES ($1, $2, false) RETURNING *",
      [retailerId, deliveryServiceId]
    );

    return query.rowCount;
  } catch (error) {
    throw new Error("Error adding delivery service to retailer");
  }
};

module.exports = {
  getAllRetailers,
  updateRetailer,
  deleteRetailer,
  getRetailerById,
  addRetailer,
  addDeliveryService,
};
