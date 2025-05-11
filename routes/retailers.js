const express = require("express");
const router = express.Router();
const {
  fetchRetailers,
  modifyRetailer,
  removeRetailer,
  fetchRetailerById,
  createRetailer,
  addDeliveryServiceToRetailer,
} = require("../controllers/retailerController");

router.get("/", fetchRetailers);

router.get("/:id", fetchRetailerById);

router.put("/:id", modifyRetailer);

router.delete("/:id", removeRetailer);

router.post("/", createRetailer);

router.post("/delivery-service", addDeliveryServiceToRetailer);

module.exports = router;
