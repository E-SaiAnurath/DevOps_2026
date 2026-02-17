Create: *tests/integration.test.js*
-----------------------------------
const request = require("supertest");
const app = require("../src/app");
const { connectDB, disconnectDB } = require("../src/db");
const { Expense, Income } = require("../src/models");

const MONGO_URI = process.env.MONGO_URI;

beforeAll(async () => {
  if (!MONGO_URI) throw new Error("MONGO_URI not set for tests");
  await connectDB(MONGO_URI);
});

afterAll(async () => {
  await disconnectDB();
});

beforeEach(async () => {
  // Proper cleanup of test data
  await Expense.deleteMany({});
  await Income.deleteMany({});
});

test("Insert and retrieve expense records (persistence across API calls)", async () => {
  const exp = { title: "Groceries", amount: 250, date: "2026-02-01" };

  const createRes = await request(app).post("/api/expenses").send(exp);
  expect(createRes.status).toBe(201);
  expect(createRes.body.title).toBe("Groceries");

  const listRes = await request(app).get("/api/expenses");
  expect(listRes.status).toBe(200);
  expect(listRes.body.length).toBe(1);
  expect(listRes.body[0].amount).toBe(250);
});

test("Insert and retrieve income records (stored data accuracy)", async () => {
  const inc = { title: "Salary", amount: 1000, date: "2026-02-02" };

  const createRes = await request(app).post("/api/income").send(inc);
  expect(createRes.status).toBe(201);

  const listRes = await request(app).get("/api/income");
  expect(listRes.status).toBe(200);
  expect(listRes.body.length).toBe(1);
  expect(listRes.body[0].title).toBe("Salary");
});

test("Dashboard shows correct aggregation after multiple API calls", async () => {
  await request(app).post("/api/income").send({ title: "Salary", amount: 2000, date: "2026-02-03" });
  await request(app).post("/api/income").send({ title: "Freelance", amount: 500, date: "2026-02-04" });

  await request(app).post("/api/expenses").send({ title: "Rent", amount: 1200, date: "2026-02-03" });
  await request(app).post("/api/expenses").send({ title: "Food", amount: 300, date: "2026-02-04" });

  const dashRes = await request(app).get("/api/dashboard");
  expect(dashRes.status).toBe(200);
  expect(dashRes.body.totalIncome).toBe(2500);
  expect(dashRes.body.totalExpenses).toBe(1500);
  expect(dashRes.body.balance).toBe(1000);
});