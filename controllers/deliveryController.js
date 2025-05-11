// controllers/deliveryController.js
const {
  getAllDeliveryServices,
  updateDeliveryService,
  deleteDeliveryService,
  addDeliveryService,
} = require("../models/deliveryModel");

const fetchDeliveryServices = async (req, res) => {
  try {
    const delivery_services = await getAllDeliveryServices();
    return res.status(200).json({
      message: "Delivery services fetched successfully",
      delivery_services,
    });
  } catch (error) {
    console.error("Error fetching delivery services:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const modifyDeliveryService = async (req, res) => {
  try {
    const deliveryId = req.params.id;
    const { name, website_url } = req.body;

    if (!name || !website_url) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const query = await updateDeliveryService(deliveryId, name, website_url);

    if (query.rowCount === 0) {
      return res.status(404).json({ message: "Delivery Service not found" });
    }

    return res.status(200).json({ message: "Delivery updated successfully" });
  } catch (error) {
    console.error("Error updating delivery:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeDeliveryService = async (req, res) => {
  try {
    const deliveryId = req.params.id;

    if (!deliveryId) {
      return res.status(400).json({ error: "Delivery Service ID is required" });
    }

    const query = await deleteDeliveryService(deliveryId);

    if (query.rowCount === 0) {
      return res.status(404).json({ message: "Delivery Service not found" });
    }

    return res.status(200).json({ message: "Delivery deleted successfully" });
  } catch (error) {
    console.error("Error deleting delivery:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const createDeliveryService = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const newDelivery = await addDeliveryService(name);

    return res.status(200).json({
      message: "Delivery submitted successfully",
      delivery: newDelivery,
    });
  } catch (error) {
    console.error("Error creating delivery service:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  fetchDeliveryServices,
  modifyDeliveryService,
  removeDeliveryService,
  createDeliveryService,
};
