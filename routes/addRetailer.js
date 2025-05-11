const express = require("express");
const router = express.Router();
const pool = require("../db");
require("dotenv").config(); // Load environment variables from .env file

router.post("/", async (req, res) => {
  console.log("process.env.DB_NAME", process.env.DB_NAME);
  console.log("req.body", req.body);
  const { name, url } = req.body;
  if (!name || !url) {
    return res.status(400).json({ error: "Name and URL are required" });
  }

  try {
    const query = await pool.query(
      "INSERT INTO retailers (name, website_url) VALUES ($1, $2) RETURNING *",
      [name, url]
    );

    const newRetailer = query.rows[0];
    return res.status(201).json({
      message: "Retailer added successfully",
      retailer: newRetailer,
    });
  } catch (error) {
    console.error("Error adding retailer:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
