Create *src/models.js*
----------------------------
const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true }
  },
  { timestamps: true }
);

const IncomeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true }
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", ExpenseSchema);
const Income = mongoose.model("Income", IncomeSchema);

module.exports = { Expense, Income };