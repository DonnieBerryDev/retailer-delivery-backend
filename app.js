const express = require("express");
const http = require("http");
const app = express();
const port = 3001;
const server = http.createServer(app);
const cors = require("cors");
// Routes
const addRetailerRoute = require("./routes/addRetailer");
const retailersRoute = require("./routes/retailers");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/add-retailer", addRetailerRoute);
app.use("/retailers", retailersRoute);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
