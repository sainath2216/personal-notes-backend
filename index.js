require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());

app.use(express.json());
const connectDB = require("./config/database");

const noteRoutes = require('./routes/noteRoutes');

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from Note server" });
});

app.use('/',noteRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server start http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err.message);
    process.exit(1);
  });
