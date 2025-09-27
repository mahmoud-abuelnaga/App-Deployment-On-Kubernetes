// imports
import express from "express";
import os from "os";
import { getColor } from "../models/color.js";

// constants
const HOSTNAME = os.hostname();
const COLOR = process.env.APP_COLOR || "blue";

// code
const router = express.Router();

// routes
router.get("/", async (req, res, next) => {
  const { colorKey } = req.params;
  return res.send(
    `<h1 style="color: ${await getColor(
      colorKey
    )}">Hello from color api</h1>\n<h2>Hostname: ${HOSTNAME}</h2>`
  );
});

// exports
export { router };
