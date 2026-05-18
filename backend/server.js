const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

/* ROUTES */
app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/employees",
  require("./routes/employeeRoutes")
);

app.use(
  "/api/ai",
  require("./routes/aiRoutes")
);

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("API Running Successfully");
});

/* 404 ROUTE */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});

/* SERVER */
const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server Running on Port ${PORT}`
  );

});