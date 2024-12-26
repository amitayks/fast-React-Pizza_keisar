/* eslint-disable no-undef */
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const dbFilePath = path.join(__dirname, "db.json");

const {
  getId,
  getOrderPrice,
  getEstimatedDelivery,
  updateOrderStatus,
} = require("./helper");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Request received at /");
  res.send({ message: "Hello, world!" });
});

// Function to read data from db.json
const readDb = () => {
  const rawData = fs.readFileSync(dbFilePath);
  return JSON.parse(rawData);
};

const writeDb = (data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(dbFilePath, jsonData, "utf-8");

    console.log("Database written successfully!");
  } catch (err) {
    console.error("Error writing to database:", err);
  }
};

// --- GET Endpoints ---
app.get("/menu", (req, res) => {
  const db = readDb();
  res.json(db.menu);
});

app.get("/orders/privete", (req, res) => {
  const db = readDb();
  res.json(db.orders);
});

app.get("/order/:id", (req, res) => {
  const orderId = req.params.id;
  const db = readDb();
  const oldOrder = db.orders.find((order) => order.id === orderId);

  const order = {
    ...oldOrder,
    status: updateOrderStatus(oldOrder),
    ...getOrderPrice(oldOrder),
  };

  if (!order) {
    return res.status(404).send(`Order with ID ${orderId} not found`);
  }

  res.json(order);
});

// --- POST / PATCH Endpoints ---
app.post("/order", (req, res) => {
  try {
    const newOrder = req.body;
    const db = readDb();

    const order = {
      ...newOrder,
      status: "backing",
      ...getId(),
      ...getOrderPrice(newOrder),
      ...getEstimatedDelivery(newOrder),
    };

    db.orders.push(order);
    writeDb(db);

    res.status(201).json(order);
  } catch {
    res.status(500).json({ error: "Failed creating the order" });
  }
});

app.patch("/order/:id", (req, res) => {
  const orderId = req.params.id;
  const updateObj = req.body;

  const db = readDb();

  // Find the order by ID

  const orderIndex = db.orders.findIndex((order) => order.id === orderId);
  if (orderIndex === -1) {
    return res.status(404).send(`Order with ID ${orderId} not found`);
  }
  // PATCH route to update a specific order
  const order = db.orders[orderIndex];

  // Update only the provided fields in the order
  const updatedOrder = {
    ...order,
    ...updateObj,
    status: updateOrderStatus(order),
  };

  db.orders[orderIndex] = updatedOrder;
  writeDb(db);

  res.json(updatedOrder);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
