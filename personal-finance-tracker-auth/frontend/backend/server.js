require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";

/**
 * Demo users (replace with DB later)
 */
const USERS = [
  { id: 1, email: "user1@gmail.com", password: "123456", name: "User One" },
  { id: 2, email: "user2@gmail.com", password: "123456", name: "User Two" },
];

/**
 * Middleware: Protect routes with Bearer token
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "Missing or invalid Authorization header" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { sub, email, name, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

/**
 * POST /api/login -> Returns authentication token
 * Body: { email, password }
 */
app.post("/api/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  const user = USERS.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { sub: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

/**
 * Protected routes
 */
app.get("/api/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Dashboard data",
    user: req.user,
    summary: {
      totalBalance: 25000,
      monthlyExpense: 12000,
      monthlyIncome: 18000,
    },
  });
});

app.get("/api/expenses", authMiddleware, (req, res) => {
  res.json([
    { id: 1, title: "Groceries", amount: 1500, date: "2026-02-01" },
    { id: 2, title: "Transport", amount: 600, date: "2026-02-03" },
  ]);
});

app.get("/api/income", authMiddleware, (req, res) => {
  res.json([
    { id: 1, title: "Salary", amount: 30000, date: "2026-02-01" },
    { id: 2, title: "Freelance", amount: 8000, date: "2026-02-05" },
  ]);
});

app.listen(PORT, () => 
  console.log(`Backend running on http://localhost:${PORT}`)
);
