Create *src/server.js*
---------------------------
const app = require("./app");
const { connectDB } = require("./db");

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/pft";

(async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
})();