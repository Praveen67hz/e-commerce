const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5000"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, 
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

require("./passport/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());


const authRoutes = require("./Routes/auth");
app.use("/api/auth",authRoutes);

const productRoutes = require("./Routes/product");
app.use("/api/product",productRoutes);

const protectedRoutes = require("./Routes/protected");
app.use("/api",protectedRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Failed:", err));

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
