// imports
import express from "express";
import os from "os";
import bodyParser from "body-parser";
import sleep from "./utilities/sleep.js";
import { router as healthRouter } from "./routes/health.js";
import { router as colorsRouter } from "./routes/colors.js";
import { router as rootRouter } from "./routes/root.js";
import { dbConnect } from "./utilities/db.js";

// constants
const PORT = Number(process.env.PORT || "3000");
const HOSTNAME = os.hostname();
const STARTUP_DELAY = Number(process.env.STARTUP_DELAY || "0");

// code
const app = express();

// middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use("/", rootRouter);
app.use("/", healthRouter);
app.use("/colors", colorsRouter);

// startup code
async function main() {
  if (STARTUP_DELAY > 0) {
    await sleep(STARTUP_DELAY);
  }

  await dbConnect();

  app.listen(PORT, () => {
    console.log(
      `### Server started ###\n => Port: ${PORT}\n => Hostname: ${HOSTNAME}`
    );
  });
}

main();
