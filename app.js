const express = require("express");
const http = require("http");
const app = express();
const port = 3001;
const server = http.createServer(app);
const cors = require("cors");
// Routes
const retailersRoute = require("./routes/retailers");
const deliveryRoute = require("./routes/delivery");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/retailers", retailersRoute);
app.use("/delivery", deliveryRoute);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
