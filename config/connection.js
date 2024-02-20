const { connect, connection } = require("mongoose");
const mongoose = require("mongoose");

// connect("mongodb://127.0.0.1:27017/socialMedia2");
async function connectToDatabase() {
  try {
    await connect("mongodb://localhost:27017/socialMedia2", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    // Continue with your application logic here
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase();

// Event handlers for successful connection and error
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from MongoDB");
});

module.exports = connection;
