// routes/deliveryRoutes.js
const express = require("express");
const router = express.Router();

const {
  fetchDeliveryServices,
  modifyDeliveryService,
  removeDeliveryService,
  createDeliveryService,
} = require("../controllers/deliveryController");

router.get("/", fetchDeliveryServices);
router.put("/:id", modifyDeliveryService);
router.delete("/:id", removeDeliveryService);
router.post("/", createDeliveryService);

module.exports = router;
