const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const query = await pool.query("SELECT * FROM retailers");
    const retailers = query.rows;
    return res.status(200).json({
      message: "Retailers fetched successfully",
      retailers: retailers,
    });
  } catch (error) {
    console.error("Error fetching retailers:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const retailerId = req.params.id;
    const { name, website_url } = req.body;

    if (!name || !website_url) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const query = await pool.query(
      "UPDATE retailers SET name = $1, website_url = $2 WHERE id = $3",
      [name, website_url, retailerId]
    );

    if (query.rowCount === 0) {
      return res.status(404).json({ message: "Retailer not found" });
    }

    return res.status(200).json({
      message: "Retailer updated successfully",
    });
  } catch (error) {
    console.error("Error updating retailer:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const retailer = req.params.id;

    if (!retailer) {
      return res.status(400).json({ error: "Retailer ID is required" });
    }

    const query = await pool.query("DELETE FROM retailers WHERE id = $1", [
      retailer,
    ]);

    if (query.rowCount === 0) {
      return res.status(404).json({ message: "Retailer not found" });
    }

    return res.status(200).json({
      message: "Retailer deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting retailer:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { retailer } = req.body;

    console.log("Retailer ID received from frontend:", retailer);

    const result = await pool.query("SELECT * FROM retailers WHERE id = $1", [
      retailer,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Retailer not found" });
    }

    return res.status(200).json({
      message: "Retailer submitted successfully",
      retailer: result.rows[0], // Send back full retailer object
    });
  } catch (error) {
    console.error("Error handling POST /retailers:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
