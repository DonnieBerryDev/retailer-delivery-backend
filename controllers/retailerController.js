const {
  getAllRetailers,
  updateRetailer,
  deleteRetailer,
  getRetailerById,
  addRetailer,
  addDeliveryService,
} = require("../models/retailerModel");

const fetchRetailers = async (req, res) => {
  try {
    const retailers = await getAllRetailers();
    return res.status(200).json({
      message: "Retailers fetched successfully",
      retailers,
    });
  } catch (error) {
    console.error("Error fetching retailers:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const modifyRetailer = async (req, res) => {
  try {
    const retailerId = req.params.id;
    const { name, website_url } = req.body;

    if (!name || !website_url) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updated = await updateRetailer(retailerId, name, website_url);

    if (updated === 0) {
      return res.status(404).json({ message: "Retailer not found" });
    }

    return res.status(200).json({
      message: "Retailer updated successfully",
    });
  } catch (error) {
    console.error("Error updating retailer:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeRetailer = async (req, res) => {
  try {
    const retailerId = req.params.id;

    if (!retailerId) {
      return res.status(400).json({ error: "Retailer ID is required" });
    }

    const deleted = await deleteRetailer(retailerId);

    if (deleted === 0) {
      return res.status(404).json({ message: "Retailer not found" });
    }

    return res.status(200).json({
      message: "Retailer deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting retailer:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to add a retailer
const createRetailer = async (req, res) => {
  console.log("running createRetailer controller", req.body); // Debugging line
  try {
    const { name, website_url } = req.body;

    if (!name || !website_url) {
      return res.status(400).json({ error: "All fields are required" });
    }
    console.log("Got name and website_url:", name, website_url); // Debugging line

    const newRetailer = await addRetailer(name, website_url);

    return res.status(201).json({
      message: "Retailer added successfully",
      retailer: newRetailer, // Return the newly added retailer
    });
  } catch (error) {
    console.error("Error adding retailer:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchRetailerById = async (req, res) => {
  try {
    const retailerId = req.params.id;
    const retailer = await getRetailerById(retailerId);

    if (!retailer) {
      return res.status(404).json({ message: "Retailer not found" });
    }

    return res.status(200).json({
      message: "Retailer fetched successfully",
      retailer,
    });
  } catch (error) {
    console.error("Error fetching retailer:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const addDeliveryServiceToRetailer = async (req, res) => {
  try {
    const { retailerId, deliveryServiceId } = req.body;

    if (!retailerId || !deliveryServiceId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newDeliveryService = await addDeliveryService(
      retailerId,
      deliveryServiceId
    );

    return res.status(201).json({
      message: "Delivery service added to retailer successfully",
      deliveryService: newDeliveryService,
    });
  } catch (error) {
    console.error("Error adding delivery service to retailer:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  fetchRetailers,
  modifyRetailer,
  removeRetailer,
  fetchRetailerById,
  addDeliveryServiceToRetailer,
  createRetailer, // Add the new controller function
};
