require("dotenv").config();

const express = require("express");
const connectDB = require("./config.js");
const loginRoute = require("./routes/login.js");
const verifyUser = require("./routes/verify-user.js");
const signupRoute = require("./routes/signup.js");
const cors = require("cors");
const app = express();

connectDB();

app.use(express.json());

app.use(
  cors({
    origin: ["https://fitmuse.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);
app.use("/api/auth", loginRoute);
app.use("/api/auth", verifyUser);
app.use("/api/auth", signupRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
