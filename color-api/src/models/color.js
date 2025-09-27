// imports
import mongoose from "mongoose";

// models
const colorSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
});

const Color = mongoose.model("Color", colorSchema);

async function setColor(key, value) {
  if (!key) {
    throw new Error("`key` parameter is not set");
  }

  if (!value) {
    throw new Error("`value` parameter is not set");
  }

  let color = await Color.findOne({ key });
  if (color) {
    color.value = value;
  } else {
    color = new Color({
      key,
      value,
    });
  }

  await color.save();
  return color;
}

async function getColor(key) {
  key = key?.trim();
  if (key == "") {
    throw new Error("`key` parameters can't be an empty string");
  }

  return (
    (await Color.findOne({ key }))?.value || process.env.APP_COLOR || "blue"
  );
}

async function getAllColors() {
  return await Color.find();
}

async function deleteColor(key) {
  if (!key) {
    throw new Error("`key` parameter is not set");
  }

  return (await Color.deleteOne({ key })).deletedCount == 1;
}

export { setColor, getColor, getAllColors, deleteColor, Color };
