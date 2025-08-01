require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");

const { HoldingsModel } = require('./model/HoldingsModel');
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const authenticate = require('./middleware/authMiddleware');
const authRoutes = require('./auth');

const PORT = process.env.PORT || 3002;
const URI = process.env.MONGO_URI;

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://stackvast-dashboard.onrender.com',
    'https://stackvast-frontend.onrender.com'
  ],
  credentials: true
}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

// ▶️ Add Holdings (initial dummy data)
app.get('/addHoldings', async (req, res) => {
  let tempHoldings = [
    { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
    { name: "HDFCBANK", qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
    { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%" },
    { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
    { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%" },
    { name: "KPITTECH", qty: 5, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
    { name: "M&M", qty: 2, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%", isLoss: true },
    { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%" },
    { name: "SBIN", qty: 4, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%", isLoss: true },
    { name: "SGBMAY29", qty: 2, avg: 4727.0, price: 4719.0, net: "-0.17%", day: "+0.15%" },
    { name: "TATAPOWER", qty: 5, avg: 104.2, price: 124.15, net: "+19.15%", day: "-0.24%", isLoss: true },
    { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%", isLoss: true },
    { name: "WIPRO", qty: 4, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%" },
  ];

  for (const item of tempHoldings) {
    const newHolding = new HoldingsModel(item);
    await newHolding.save();
  }
  res.send("Holdings data added!");
});

// ▶️ Add Positions (initial dummy data)
app.get('/addPositions', async (req, res) => {
  let tempPositions = [
    { product: "CNC", name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, net: "+0.58%", day: "-1.24%", isLoss: true },
    { product: "CNC", name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, net: "+10.04%", day: "-1.35%", isLoss: true },
  ];

  for (const item of tempPositions) {
    const newPosition = new PositionsModel(item);
    await newPosition.save();
  }
  res.send("Positions data added!");
});

// ▶️ GET all holdings (protected)
app.get('/allHoldings', authenticate, async (req, res) => {
  const allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

// ▶️ GET all positions (protected)
app.get('/allPositions', authenticate, async (req, res) => {
  const allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

// ▶️ POST new order (protected)
app.post('/newOrder', authenticate, async (req, res) => {
  const { name, qty, price, mode } = req.body;

  const newOrder = new OrdersModel({ name, qty, price, mode });
  await newOrder.save();

  res.send("Order saved!");
});

// ▶️ Start the server
app.listen(PORT, async () => {
  try {
    await mongoose.connect(URI);
    console.log("DB connected!");
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error("DB connection failed:", err);
  }
});
