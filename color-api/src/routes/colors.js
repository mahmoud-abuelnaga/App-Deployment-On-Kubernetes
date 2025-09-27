// imports
import express from "express";
import os from "os";
import {
  deleteColor,
  getAllColors,
  getColor,
  setColor,
} from "../models/color.js";

// constants
const HOSTNAME = os.hostname();

// code
const router = express.Router();

// routes
router.get("/", async (req, res) => {
  try {
    const { format, colorKey } = req.query;
    const color = await getColor(colorKey);

    if (format == "text") {
      return res.send(`Color: ${color} | Hostname: ${HOSTNAME}`);
    }

    return res.json({
      color: color,
      hostname: HOSTNAME,
    });
  } catch (err) {
    return res.status(500).json({ error: err?.message || "Unknown error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const colors = await getAllColors();
    return res.json(colors);
  } catch (err) {
    return res.status(500).json({ error: err?.message || "Unknown error" });
  }
});

router.put("/", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        error: "request body is missing",
      });
    }

    const { key, value } = req.body;
    if (!key) {
      return res.status(400).json({
        error: "`key` is missing in the body",
      });
    }

    if (!value) {
      return res.status(400).json({
        error: "`value` is missing in the body",
      });
    }

    const saved = await setColor(key, value);
    return res.json(saved);
  } catch (err) {
    return res.status(500).json({ error: err?.message || "Unknown error" });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { key } = req.body || {};
    if (!key) {
      return res.status(400).json({
        error: "`key` is missing in the body",
      });
    }

    const deleted = await deleteColor(key);
    return res.json({ deleted });
  } catch (err) {
    return res.status(500).json({ error: err?.message || "Unknown error" });
  }
});

// exports
export { router };
