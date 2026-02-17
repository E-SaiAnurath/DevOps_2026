Create *src/app.js*
--------------------------
const express = require("express");
const { Expense, Income } = require("./models");

const app = express();
app.use(express.json());

// Health check
app.get("/health", (req, res) => res.json({ ok: true }));

// Create Expense
app.post("/api/expenses", async (req, res) => {
  try {
    const exp = await Expense.create(req.body);
    res.status(201).json(exp);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Get Expenses
app.get("/api/expenses", async (req, res) => {
  const items = await Expense.find().sort({ date: -1 });
  res.json(items);
});

// Create Income
app.post("/api/income", async (req, res) => {
  try {
    const inc = await Income.create(req.body);
    res.status(201).json(inc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Get Income
app.get("/api/income", async (req, res) => {
  const items = await Income.find().sort({ date: -1 });
  res.json(items);
});

// Dashboard aggregation (sum)
app.get("/api/dashboard", async (req, res) => {
  const expensesAgg = await Expense.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);
  const incomeAgg = await Income.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  const totalExpenses = expensesAgg[0]?.total || 0;
  const totalIncome = incomeAgg[0]?.total || 0;

  res.json({
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses
  });
});

module.exports = app;