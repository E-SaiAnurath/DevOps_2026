Create *src/migrate.js*
------------------------
const { connectDB, disconnectDB } = require("./db");

(async () => {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/pft";
  try {
    await connectDB(uri);
    // For MongoDB, "migration" here means ensuring DB connection + indexes exist
    console.log("Migration step completed (MongoDB: connection + indexes ready).");
  } catch (e) {
    console.error("Migration failed:", e);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
})();