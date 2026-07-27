import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { pool } from "./db.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://alem7486.github.io",
  "http://localhost:5500",
  "http://127.0.0.1:5500"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions. Please try again later." }
});

app.get("/", (req, res) => {
  res.json({ ok: true, message: "1UP backend running" });
});

app.post("/contact", contactLimiter, async (req, res) => {
  const { name, email, message, lang } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email." });
  }

  if (name.length > 120 || email.length > 160 || message.length > 3000) {
    return res.status(400).json({ error: "Input is too long." });
  }

  try {
    await pool.query(
      `INSERT INTO contacts (name, email, message, lang)
       VALUES ($1, $2, $3, $4)`,
      [name.trim(), email.trim(), message.trim(), lang || "en"]
    );

    return res.status(201).json({
      success: true,
      message: "Message saved successfully."
    });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Server error." });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});