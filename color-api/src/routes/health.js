// imports
import express from "express";

// constants
const IS_LIVE =
  process.env.IS_LIVE == "true" || !process.env.IS_LIVE ? true : false;
const IS_READY = process.env.IS_READY == "false" ? Math.random() < 0.5 : true;

// code
const router = express.Router();

// routes
router.get("/ready", (req, res, next) => {
  if (!IS_READY) {
    return res.sendStatus(500);
  }

  return res.sendStatus(200);
});

router.get("/health", (req, res, next) => {
  if (!IS_LIVE) {
    return res.sendStatus(500);
  }

  return res.sendStatus(200);
});

router.get("/start", (req, res, next) => {
  return res.sendStatus(200);
});

// exports
export { router };
